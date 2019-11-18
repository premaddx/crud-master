import {
    CREATE,
    UPDATE,
    DELETE,
    SORT,
    SEARCH
} from '../action-constants';

export function sortAction (data) {
    return {
        type: SORT,
        data
    }
}

export function createAction (data) {
    return {
        type: CREATE,
        data
    }
}

export function updateAction (data) {
    return {
        type: UPDATE,
        data
    }
}

export function deleteAction (data) {
    return {
        type: DELETE,
        data
    }
}

export function searchAction (data) {
    return {
        type: SEARCH,
        data
    }
}


export function sortTable (data, key, order = 'ASC') {
    return async dispatch => {
        // sort the data as per key and dispatch action
        const sortedArray = data.sort((a, b) => {
            const val = typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key];
            if (order === 'ASC') return val;
            else return -val;
        });
        dispatch(sortAction(sortedArray));
    }
}


export function createEmployee (data = {}) {
    return async dispatch => {
        // create a new id for user
        const obj = {
            'jobTitleName': 'Developer',
            'firstName': 'Ab',
            'lastName': 'Cd',
            'preferredFullName': 'Ab Cd',
            'employeeCode': 'E5',
            'region': 'CA',
            'dob': '01/10/1998',
            'phoneNumber': '408-1111111',
            'emailAddress': 'abcd@gmail.com'
        };
        dispatch(createAction(obj)); // pass incoming data
    }
}



export function updateEmployee (id, data = {}) {
    return async dispatch => {
        // create a new id for user
        const updatedObj = {
            'jobTitleName': 'Developer',
            'firstName': 'Updated',
            'lastName': 'Employee',
            'preferredFullName': 'Updated Employee',
            'employeeCode': 'E5',
            'region': 'CA',
            'dob': '01/10/1998',
            'phoneNumber': '408-1111111',
            'emailAddress': 'abcd@gmail.com'
        };
        dispatch(updateAction({ updatedObj, id })); // pass incoming data
    }
}



export function deleteEmployee (id) {
    return async dispatch => {
        dispatch(deleteAction({ id }));
    }
}
