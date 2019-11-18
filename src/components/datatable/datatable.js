import React from 'react';
import { connect } from 'react-redux';
import { sortTable, createEmployee, updateEmployee, deleteEmployee, search, pagination } from '../../redux/actions/datatable-action';

import './datatable.css';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: {
                'ID': 'id',
                'Full Name': 'preferredFullName',
                'Employee Code': 'employeeCode',
                'Job Title': 'jobTitleName',
                'Phone Number': 'phoneNumber',
                'Email ID': 'emailAddress',
                'Region': 'region',
                'DOB': 'dob',
                'Action': null,
            },
            searchKey: 'id',
            searchText: '',
        };
    }

    handleSortTable = (keyName) => () => {
        this.props.sortTable(this.props.tableData, this.state.columns[keyName], 'ASC');
    }

    createEmployee = () => () => this.props.createEmployee();

    updateEmployee = () => () => this.props.updateEmployee(this.props.maxId);

    deleteEmployee = () => () => this.props.deleteEmployee(this.props.maxId);

    searchTable = () => () => {
        if (this.state.searchText) {
            this.props.search(this.state.searchKey, this.state.searchText);
        }
    };

    handleTextFieldChange = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    }

    handleSelectChange = (e) => {
        this.setState({
            searchKey: e.target.value,
        });
    }

    handlePaginationChange = (e) => {
        this.props.pagination(e.target.value);
    };

    renderPaginationDropdown = () => {
        const arr = [];
        for (let i = 1; i <= this.props.totalPages; i++) arr.push(i);
        return <select onChange={this.handlePaginationChange}>
            {arr.map(val => <option key={val} value={val}>{val}</option>)}
        </select>
    }

    render () {
        return (
            <div>
                <div>
                    <h3>Employees</h3>
                </div>
                <div>
                    <select onChange={this.handleSelectChange}>
                        {Object.keys(this.state.columns).map(keyName => {
                            return <option value={this.state.columns[keyName]} key={this.state.columns[keyName]}>{keyName}</option>
                        })}
                    </select>
                    {/**
                     * make curry functions for each event handlers
                     * pick values from document.getElementById for searching
                     */}
                    <input type='text' name='search' placeholder='Search' onChange={this.handleTextFieldChange}></input>
                    <button type="button" onClick={this.searchTable()}>Click Me!</button>
                </div>
                <div>
                    <table className='container'>
                        <thead>
                            <tr>
                                {Object.keys(this.state.columns).map(keyName => {
                                    return <th scope='col' key={this.state.columns[keyName]}>
                                        <a onClick={this.handleSortTable(keyName)} className="sort-by">{keyName}</a>
                                    </th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tableData.map(obj => {
                                return <tr key={obj.id}>
                                    <td>{`EM${obj.id}`}</td>
                                    <td>{obj.preferredFullName}</td>
                                    <td>{obj.employeeCode}</td>
                                    <td>{obj.jobTitleName}</td>
                                    <td>{obj.phoneNumber}</td>
                                    <td>{obj.emailAddress}</td>
                                    <td>{obj.region}</td>
                                    <td>{obj.dob}</td>
                                    <td><input type='button' value='...' /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={this.createEmployee()}>Add Employee</button>
                        <button onClick={this.updateEmployee(this.props.maxId)}>Edit Employee</button>
                        <button onClick={this.deleteEmployee(this.props.maxId)}>Delete Employee</button>
                    </div>
                    <div>{this.renderPaginationDropdown()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { dataTableReducer: {
        maxId,
        tableData,
        totalPages,
    } } = state;
    return {
        maxId,
        tableData,
        totalPages,
    };
}


export default connect(
    mapStateToProps,
    {
        sortTable,
        search,
        pagination,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    })(DataTable);
