import {
  CREATE,
  UPDATE,
  DELETE,
  SORT,
  SEARCH,
  PAGINATION
} from "../action-constants";

const INITIAL_STATE = {
  data: [
    // move this to constants/mock
    {
      id: 1,
      jobTitleName: "Developer",
      firstName: "Romin",
      lastName: "Irani",
      preferredFullName: "Romin Irani",
      employeeCode: "E1",
      region: "CA",
      dob: "01/10/1993",
      phoneNumber: "408-1234567",
      emailAddress: "romin.k.irani@gmail.com"
    },
    {
      id: 2,
      jobTitleName: "Developer",
      firstName: "Neil",
      lastName: "Irani",
      preferredFullName: "Neil Irani",
      employeeCode: "E2",
      region: "CA",
      dob: "01/10/1992",
      phoneNumber: "408-1111111",
      emailAddress: "neilrirani@gmail.com"
    },
    {
      id: 3,
      jobTitleName: "Program Directory",
      firstName: "Tom",
      lastName: "Hanks",
      dob: "05/12/1995",
      preferredFullName: "Tom Hanks",
      employeeCode: "E3",
      region: "CA",
      phoneNumber: "408-2222222",
      emailAddress: "tomhanks@gmail.com"
    }
  ],
  tableData: [],
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  searchKey: "id",
  searchText: "",
  maxId: 3
};

// after each operation set the totalPages

export default function dataTableReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // return the state accordingly
    case CREATE: {
      state.maxId++;
      action.data.id = state.maxId;
      state.data.push(action.data);
      // return as per page number and search if any
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      let tableData = state.data.slice(startIndex, lastIndex);
      if (state.searchKey && state.searchText) {
        tableData = filterRecordsUtil(
          state.searchKey,
          state.searchText,
          state.data,
          startIndex,
          lastIndex
        );
      }
      state.tableData = tableData;
      state.totalPages = Math.ceil(state.data.length / state.pageSize);
      return { ...state };
    }
    case UPDATE: {
      const index = state.data.findIndex(obj => obj.id === action.data.id);
      action.data.updatedObj.id = action.data.id;
      state.data[index] = action.data.updatedObj;
      // return as per page number and search if any
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      let tableData = state.data.slice(startIndex, lastIndex);
      if (state.searchKey && state.searchText) {
        tableData = filterRecordsUtil(
          state.searchKey,
          state.searchText,
          state.data,
          startIndex,
          lastIndex
        );
      }
      state.tableData = tableData;
      return { ...state };
    }
    case DELETE: {
      const index = state.data.findIndex(obj => obj.id === action.data.id);
      state.data.splice(index, 1);
      state.maxId--;
      // return as per page number and search if any
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      let tableData = state.data.slice(startIndex, lastIndex);
      if (state.searchKey && state.searchText) {
        tableData = filterRecordsUtil(
          state.searchKey,
          state.searchText,
          state.data,
          startIndex,
          lastIndex
        );
      }
      state.totalPages = Math.ceil(state.data.length / state.pageSize);
      state.tableData = tableData;
      return { ...state };
    }
    case SEARCH: {
      const { key, text } = action.data;
      state.searchKey = key;
      state.searchText = text;
      state.currentPage = 1;
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      // apply filter
      let tableData = filterRecordsUtil(
        key,
        text,
        state.data,
        startIndex,
        lastIndex
      );
      return { ...state, tableData };
    }
    case SORT: {
      // return as per page number and search if any
      const tableData = [...action.data];
      return { ...state, tableData };
    }
    case PAGINATION: {
      // set the
      state.currentPage = action.data.pageNo;
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      let tableData = state.data.slice(startIndex, lastIndex);
      if (state.searchKey && state.searchText) {
        tableData = filterRecordsUtil(
          state.searchKey,
          state.searchText,
          state.data,
          startIndex,
          lastIndex
        );
      }
      state.totalPages = Math.ceil(state.data.length / state.pageSize);
      state.tableData = tableData;
      return { ...state };
    }
    default:
      // return the first 10 values from data
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      const tableData = state.data.slice(startIndex, lastIndex);
      state.totalPages = Math.ceil(state.data.length / state.pageSize);
      state.tableData = tableData;
      return state;
  }
}

const filterRecordsUtil = (
  searchKey,
  searchText,
  data,
  startIndex,
  lastIndex
) => {
  let tableData = data.filter(obj => {
    if (typeof obj[searchKey] === "string") {
      return obj[searchKey]
        .trim()
        .toUpperCase()
        .includes(searchText.trim().toUpperCase());
    } else {
      return obj[searchKey] === parseInt(searchText.trim(), 10);
    }
  });
  tableData = tableData.slice(startIndex, lastIndex);
};
