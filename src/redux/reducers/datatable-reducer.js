import {
    CREATE,
    UPDATE,
    DELETE,
    SORT,
    SEARCH,
} from '../action-constants';

const INITIAL_STATE = {
    data: [
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
    maxId: 3,
};

export default function dataTableReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        // return the state accordingly
        case CREATE: {
            const resultantState = { ...state };
            resultantState.maxId++;
            action.data.id = resultantState.maxId;
            resultantState.data.push(action.data);
            return resultantState;
        }
        case UPDATE: {
            const newData = state.data;
            const index = state.data.findIndex(obj => obj.id === action.data.id);
            action.data.updatedObj.id = action.data.id;
            newData[index] = action.data.updatedObj;
            return { ...state };
        }
        case DELETE: {
            const index = state.data.findIndex(obj => obj.id === action.data.id);
            state.data.splice(index, 1);
            state.maxId--;
            return { ...state };
        }
        case SORT: {
            return { ...action.data };
        }
        case SEARCH: {
            return { ...state };
        }
        default:
            return state;
    }
}
