import {  combineReducers } from "redux";
import dataTableReducer from './reducers/datatable-reducer';

export default combineReducers({ //combining reducer is not necessary
    dataTableReducer,
});
