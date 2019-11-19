import {
  CREATE,
  UPDATE,
  DELETE,
  SORT,
  SEARCH,
  PAGINATION,
} from "../action-constants";


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
    return tableData;
  };


const INITIAL_STATE = {
    data: [],
    tableData: [],
    currentPage: 1, // index of current page
    totalPages: 1, // count of total number of pages
    numberOfButtons: 5, // maximum number of pagination buttons to be shown
    pageSize: 10, // number of rows in the table at a time
    searchKey: 'id',
    searchText: '',
    maxId: 0, // max id in the entire record - used for assiging the id to new user
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
      if (action.data) {
        state.data = action.data;
        state.maxId = action.data.length;
      }
      const lastIndex = state.currentPage * state.pageSize;
      const startIndex = lastIndex - state.pageSize;
      const tableData = state.data.slice(startIndex, lastIndex);
      state.totalPages = Math.ceil(state.data.length / state.pageSize);
      state.tableData = tableData;
      return {...state};
  }
}
