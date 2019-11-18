import {
    CREATE,
    UPDATE,
    DELETE,
    SORT,
    SEARCH,
    PAGINATION,
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

export function paginationAction (data) {
    return {
        type: PAGINATION,
        data
    }
}

export function search (key, text) {
    return async dispatch => {
        dispatch(searchAction({ key, text }));
    }
}

export function pagination (pageNo) {
    return async dispatch => {
        dispatch(paginationAction({ pageNo }));
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
        dispatch(createAction(data));
    }
}



export function updateEmployee (data = {}) {
    return async dispatch => {
        dispatch(updateAction({ updatedObj: data, id: data.id }));
    }
}



export function deleteEmployee (id) {
    return async dispatch => {
        dispatch(deleteAction({ id }));
    }
}
