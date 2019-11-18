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
    ]
};

export default function dataTableReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        // return the state accordingly
        case CREATE:
            return { ...state };
        case UPDATE:
            return { ...state };
        case DELETE:
            return { ...state };
        case SORT:
            return { ...state };
        case SEARCH:
            return { ...state };
        default:
            return state;
    }
}
