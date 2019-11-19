import React, { Fragment } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import {
  sortTable,
  createEmployee,
  updateEmployee,
  deleteEmployee
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
      isOpen: false,
      modalView: MODAL.VIEW,
      active: null,
      data: this.props.dataTableReducer.data,
      headers: {
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
        [];
    }
  };

  updateRecord = e => {
    e.preventDefault();
    //update api
  };

  onActiveChange = (name, value) => {
    if (!this.state.active) return;
    let a = { ...this.state.active };
    a[name] = value;
    a.preferredFullName = a.firstName + ' ' +a.lastName;
    this.setState({ active: a });
  };

  openModal = (modalView, active) => () => {
    this.setState({ isOpen: true, modalView, active });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <table className="container">
          <thead>
            <tr>
              {Object.keys(this.state.headers).map(keyName => {
                return (
                  <th scope="col" key={this.state.headers[keyName]}>
                    <a
                      onClick={() =>
                        this.props.sortTable(
                          this.state.data,
                          this.state.headers[keyName],
                          "ASC"
                        )
                      }
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
            {this.state.data.map(obj => {
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
                      <button type="button">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={this.openModal(MODAL.CREATE,{})}>
            Add Employee
          </button>
          <button
            onClick={() =>
              this.props.updateEmployee(this.props.dataTableReducer.maxId)
            }
          >
            Edit Employee
          </button>
          <button
            onClick={() =>
              this.props.deleteEmployee(this.props.dataTableReducer.maxId)
            }
          >
            Delete Employee
          </button>
        </div>
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
  const { dataTableReducer } = state;
  return {
    dataTableReducer
  };
};

export default connect(
  mapStateToProps,
  {
    sortTable,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
)(DataTable);
