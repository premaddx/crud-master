import {
    CREATE,
    UPDATE,
    DELETE,
    SORT,
    SEARCH,
    PAGINATION,
    DEFAULT,
} from '../action-constants';

function defaultAction(data) {
    return {
        type: DEFAULT,
        data
    }
}

function sortAction (data) {
    return {
        type: SORT,
        data
    }
}

function createAction (data) {
    return {
        type: CREATE,
        data
    }
}

function updateAction (data) {
    return {
        type: UPDATE,
        data
    }
}

function deleteAction (data) {
    return {
        type: DELETE,
        data
    }
}

function searchAction (data) {
    return {
        type: SEARCH,
        data
    }
}

function paginationAction (data) {
    return {
        type: PAGINATION,
        data
    }
}

export function fetchTableData () {
    return async dispatch => {
        fetch('https://my-json-server.typicode.com/darshanp40/employeedb/employees')
        .then(results => results.json())
        .then(data => dispatch(defaultAction(data[0])));
    }
}

export function search (key, text) {
    return dispatch => {
        dispatch(searchAction({ key, text }));
    }
}

export function pagination (pageNo) {
    return dispatch => {
        dispatch(paginationAction({ pageNo }));
    }
}

export function sortTable (data, key, order = 'ASC') {
    return dispatch => {
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
    return dispatch => {
        dispatch(createAction(data));
    }
}



export function updateEmployee (data = {}) {
    return dispatch => {
        dispatch(updateAction({ updatedObj: data, id: data.id }));
    }
}



export function deleteEmployee (id) {
    return dispatch => {
        dispatch(deleteAction({ id }));
    }
}
