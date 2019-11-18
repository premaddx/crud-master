import React from 'react';
import { connect } from 'react-redux';
import { sortTable, createEmployee, updateEmployee, deleteEmployee } from '../../redux/actions/datatable-action';

import './datatable.css';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataTableReducer.data,
            headers: {
                'ID': 'id',
                'Full Name': 'preferredFullName',
                'Employee Code': 'employeeCode',
                'Job Title': 'jobTitleName',
                'Phone Number': 'phoneNumber',
                'Email ID': 'emailAddress',
                'Region': 'region',
                'DOB': 'dob',
                'Action': null,
            }
        };
    }

    render () {
        return (
            <div>
                <table className='container'>
                    <thead>
                        <tr>
                            {Object.keys(this.state.headers).map(keyName => {
                                return <th scope='col' key={this.state.headers[keyName]}>
                                    <a onClick={() => this.props.sortTable(this.state.data, this.state.headers[keyName], 'ASC')} className="sort-by">{keyName}</a>
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(obj => {
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
                    <button onClick={() => this.props.createEmployee()}>Add Employee</button>
                    <button onClick={() => this.props.updateEmployee(this.props.dataTableReducer.maxId)}>Edit Employee</button>
                    <button onClick={() => this.props.deleteEmployee(this.props.dataTableReducer.maxId)}>Delete Employee</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { dataTableReducer } = state;
    return {
        dataTableReducer,
    };
}


export default connect(
    mapStateToProps,
    {
        sortTable,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    })(DataTable);
