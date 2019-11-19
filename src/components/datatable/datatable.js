import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
    sortTable,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    search,
    pagination
} from "../../redux/actions/datatable-action";
import Modal from "../Modal";
import Input from "../Input";

import "./datatable.css";

const MODAL = {
    VIEW: "View",
    UPDATE: "Update",
    CREATE: "Create"
};
class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "id",
            searchText: "",
            isOpen: false,
            modalView: MODAL.VIEW,
            active: null,
            columns: {
                //shift this to constants
                ID: "id",
                "Full Name": "preferredFullName",
                "Employee Code": "employeeCode",
                "Job Title": "jobTitleName",
                "Phone Number": "phoneNumber",
                "Email ID": "emailAddress",
                Region: "region",
                DOB: "dob",
                Action: null
            }
        };
    }

    handleSortTable = keyName => () => {
        this.props.sortTable(
            this.props.tableData,
            this.state.columns[keyName],
            "ASC"
        );
    };

    createEmployee = () => this.props.createEmployee();

    updateEmployee = () => this.props.updateEmployee(this.props.maxId);

    deleteEmployee = id => () => this.props.deleteEmployee(id);

    searchTable = () => () => {
        if (this.state.searchText) {
            this.props.search(this.state.searchKey, this.state.searchText);
        }
    };

    handleTextFieldChange = (_, value) => {
        this.setState({
            searchText: value
        });
    };

    handleSelectChange = e => {
        this.setState({
            searchKey: e.target.value
        });
    };

    handlePaginationChange = e => {
        this.props.pagination(e.target.value);
    };

    renderPaginationDropdown = () => {
        const arr = [];
        const currentPage = this.props.currentPage && parseInt(this.props.currentPage, 10);
        const totalPages = this.props.totalPages && parseInt(this.props.totalPages, 10);
        const limit = ((currentPage + 5) <= totalPages) ? currentPage + 5 : totalPages;
        for (let i = currentPage; i <= limit; i++) arr.push(i);
        return (
            <div>
                <button type="button" onClick={this.handlePaginationChange} value={(currentPage - 1) > 0 ? currentPage - 1: currentPage}>Previous</button>
                {arr.map(val => (
                    <button type="button" onClick={this.handlePaginationChange} key={val} value={val}>{val}</button>
                ))}
                <button type="button" onClick={this.handlePaginationChange} value={(currentPage + 1) <= limit ? currentPage + 1 : currentPage}>Next</button>
            </div>
        );
    };

    getModalView = () => {
        const { active: a, modalView } = this.state;
        if (!a) return [];
        switch (modalView) {
            case MODAL.VIEW: {
                return (
                    <Fragment>
                        <div className="header-section">
                            <div className="small-text">EM-{a.employeeCode}</div>
                            <div className="modal-header">{a.preferredFullName}</div>
                        </div>
                        <ul className="view-list">
                            <li>
                                <div className="label">Name</div>
                                <div className="value">{a.preferredFullName}</div>
                            </li>
                            <li>
                                <div className="label">Employee Code</div>
                                <div className="value">{a.employeeCode}</div>
                            </li>
                            <li>
                                <div className="label">Job Title</div>
                                <div className="value">{a.jobTitleName}</div>
                            </li>
                            <li>
                                <div className="label">Phone Number</div>
                                <div className="value">{a.phoneNumber}</div>
                            </li>
                            <li>
                                <div className="label">Email ID</div>
                                <div className="value">{a.emailAddress}</div>
                            </li>
                            <li>
                                <div className="label">Region</div>
                                <div className="value">{a.region}</div>
                            </li>
                            <li>
                                <div className="label">DOB</div>
                                <div className="value">{a.dob}</div>
                            </li>
                        </ul>
                    </Fragment>
                );
            }
            case MODAL.UPDATE: {
                return (
                    <Fragment>
                        <div className="header-section">
                            <div className="modal-header">Update Employee</div>
                        </div>
                        <form onSubmit={this.updateRecord} className="view-list">
                            <div className="flex">
                                <Input
                                    label="ID"
                                    value={a.employeeCode}
                                    name="employeeCode"
                                    onChange={this.onActiveChange}
                                    pre={<div className="input-pre">EM</div>}
                                />
                            </div>
                            <div className="flex">
                                <Input
                                    label="FirstName"
                                    value={a.firstName}
                                    name="firstName"
                                    onChange={this.onActiveChange}
                                />
                                <Input
                                    label="LastName"
                                    value={a.lastName}
                                    name="lastName"
                                    onChange={this.onActiveChange}
                                />
                            </div>
                            <Input
                                label="Job Title"
                                value={a.jobTitleName}
                                name="jobTitleName"
                                onChange={this.onActiveChange}
                            />
                            <Input
                                label="Email"
                                value={a.emailAddress}
                                name="emailAddress"
                                onChange={this.onActiveChange}
                            />
                            <Input
                                label="Phone Number"
                                value={a.phoneNumber}
                                name="phoneNumber"
                                onChange={this.onActiveChange}
                            />
                            <div className="flex">
                                <Input
                                    label="Region"
                                    value={a.region}
                                    name="region"
                                    onChange={this.onActiveChange}
                                />
                                <Input
                                    label="DOB"
                                    value={a.dob}
                                    name="dob"
                                    onChange={this.onActiveChange}
                                />
                            </div>
                            <button type="submit" className="primary">
                                Update
              </button>
                            <button type="text" onClick={this.closeModal}>
                                Cancel
              </button>
                        </form>
                    </Fragment>
                );
            }
            case MODAL.CREATE: {
                return (
                    <Fragment>
                        <div className="header-section">
                            <div className="modal-header">Create Employee</div>
                        </div>
                        <form onSubmit={this.createRecord} className="view-list">
                            <div className="flex">
                                <Input
                                    label="ID"
                                    value={a.employeeCode}
                                    name="employeeCode"
                                    onChange={this.onActiveChange}
                                    pre={<div className="input-pre">EM</div>}
                                />
                            </div>
                            <div className="flex">
                                <Input
                                    label="FirstName"
                                    value={a.firstName}
                                    name="firstName"
                                    onChange={this.onActiveChange}
                                />
                                <Input
                                    label="LastName"
                                    value={a.lastName}
                                    name="lastName"
                                    onChange={this.onActiveChange}
                                />
                            </div>
                            <Input
                                label="Job Title"
                                value={a.jobTitleName}
                                name="jobTitleName"
                                onChange={this.onActiveChange}
                            />
                            <Input
                                label="Email"
                                value={a.emailAddress}
                                name="emailAddress"
                                onChange={this.onActiveChange}
                            />
                            <Input
                                label="Phone Number"
                                value={a.phoneNumber}
                                name="phoneNumber"
                                onChange={this.onActiveChange}
                            />
                            <div className="flex">
                                <Input
                                    label="Region"
                                    value={a.region}
                                    name="region"
                                    onChange={this.onActiveChange}
                                />
                                <Input
                                    label="DOB"
                                    value={a.dob}
                                    name="dob"
                                    onChange={this.onActiveChange}
                                />
                            </div>
                            <button type="submit" className="primary">
                                Create
              </button>
                            <button type="text" onClick={this.closeModal}>
                                Cancel
              </button>
                        </form>
                    </Fragment>
                );
            }
            default:
                return [];
        }
    };

    updateRecord = e => {
        e.preventDefault();
        console.log(this.state.active);
        // update api
        this.props.updateEmployee(this.state.active);
        this.closeModal();
    };

    createRecord = e => {
        e.preventDefault();
        // create api
        console.log(this.state.active);
        this.props.createEmployee(this.state.active);
        this.closeModal();
    };

    onActiveChange = (name, value) => {
        if (!this.state.active) return;
        let a = { ...this.state.active };
        a[name] = value;
        a.preferredFullName = a.firstName + " " + a.lastName;
        this.setState({ active: a });
    };

    openModal = (modalView, active) => () => {
        this.setState({ isOpen: true, modalView, active });
    };

    closeModal = () => {
        this.setState({ isOpen: false });
    };

    render () {
        return (
            <div className="body-container">
                <div className="flex">
                    <h3>Employees</h3>
                    <button
                        onClick={this.openModal(MODAL.CREATE, {})}
                        className="primary"
                    >
                        Add Employee
          </button>
                </div>
                <div>
                    <select onChange={this.handleSelectChange}>
                        {Object.keys(this.state.columns).map(keyName => {
                            return (
                                <option
                                    value={this.state.columns[keyName]}
                                    key={this.state.columns[keyName]}
                                >
                                    {keyName}
                                </option>
                            );
                        })}
                    </select>
                    {/**
           * make curry functions for each event handlers
           * pick values from document.getElementById for searching
           */}
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search"
                        classProp="search"
                        onChange={this.handleTextFieldChange}
                    />
                    <button type="button" onClick={this.searchTable()}>
                        Click Me!
          </button>
                </div>
                <table className="container">
                    <thead>
                        <tr>
                            {Object.keys(this.state.columns).map(keyName => {
                                return (
                                    <th scope="col" key={this.state.columns[keyName]}>
                                        <a
                                            onClick={this.handleSortTable(keyName)}
                                            className="sort-by"
                                        >
                                            {keyName}
                                        </a>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tableData.map(obj => {
                            return (
                                <tr key={obj.id}>
                                    <td>{`EM${obj.id}`}</td>
                                    <td>{obj.preferredFullName}</td>
                                    <td>{obj.employeeCode}</td>
                                    <td>{obj.jobTitleName}</td>
                                    <td>{obj.phoneNumber}</td>
                                    <td>{obj.emailAddress}</td>
                                    <td>{obj.region}</td>
                                    <td>{obj.dob}</td>
                                    <td>
                                        <div className="actions">
                                            <button
                                                type="button"
                                                onClick={this.openModal(MODAL.VIEW, obj)}
                                            >
                                                View
                      </button>
                                            <button
                                                type="button"
                                                onClick={this.openModal(MODAL.UPDATE, obj)}
                                            >
                                                Edit
                      </button>
                                            <button
                                                type="button"
                                                onClick={this.deleteEmployee(obj.id)}
                                            >
                                                Delete
                      </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div></div>
                <div>{this.renderPaginationDropdown()}</div>
                {this.state.isOpen ? (
                    <Modal close={this.closeModal}>{this.getModalView()}</Modal>
                ) : (
                        ""
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        dataTableReducer: { maxId, tableData, totalPages, currentPage, pageSize }
    } = state;
    return {
        maxId,
        tableData,
        totalPages,
        currentPage,
        pageSize,
    };
};

export default connect(
    mapStateToProps,
    {
        sortTable,
        search,
        pagination,
        createEmployee,
        updateEmployee,
        deleteEmployee
    }
)(DataTable);
