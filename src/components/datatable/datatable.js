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
import { MODAL, COLUMNS, Create, Update, View } from "./constants";
import "./datatable.css";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "id",
      searchText: "",
      isOpen: false,
      modalView: MODAL.VIEW,
      active: null,
      sortType: "ASC",
      sortColumn: "id"
    };
  }

  handleSortTable = keyName => () => {
    let sortType;
    if (keyName === this.state.sortColumn) {
      sortType = this.toggleSortType();
      this.props.sortTable(this.props.tableData, COLUMNS[keyName], sortType);
    } else {
      sortType = "ASC";
      this.props.sortTable(this.props.tableData, COLUMNS[keyName], sortType);
    }
    this.setState({ sortType, sortColumn: keyName });
  };

  toggleSortType = () => {
    if (this.state.sortType === "ASC") return "DSC";
    return "ASC";
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
    const currentPage =
      this.props.currentPage && parseInt(this.props.currentPage, 10);
    const totalPages =
      this.props.totalPages && parseInt(this.props.totalPages, 10);
    const limit = currentPage + 5 <= totalPages ? currentPage + 5 : totalPages;
    for (let i = currentPage; i <= limit; i++) arr.push(i);
    return (
      <div>
        <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage - 1 > 0 ? currentPage - 1 : currentPage}
        >
          Previous
        </button>
        {arr.map(val => (
          <button
            type="button"
            onClick={this.handlePaginationChange}
            key={val}
            value={val}
          >
            {val}
          </button>
        ))}
        <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage + 1 <= limit ? currentPage + 1 : currentPage}
        >
          Next
        </button>
      </div>
    );
  };

  getModalView = () => {
    const { active: a, modalView } = this.state;
    if (!a) return [];
    switch (modalView) {
      case MODAL.VIEW: {
        return <View a={a} />;
      }
      case MODAL.UPDATE: {
        return (
          <Update
            a={a}
            updateRecord={this.updateRecord}
            closeModal={this.closeModal}
            onActiveChange={this.onActiveChange}
          />
        );
      }
      case MODAL.CREATE: {
        return (
          <Create
            a={a}
            createRecord={this.createRecord}
            closeModal={this.closeModal}
            onActiveChange={this.onActiveChange}
          />
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

  render() {
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
            {Object.keys(COLUMNS).map(keyName => {
              return (
                <option value={COLUMNS[keyName]} key={COLUMNS[keyName]}>
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
              {Object.keys(COLUMNS).map(keyName => {
                return (
                  <th scope="col" key={COLUMNS[keyName]}>
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
    pageSize
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
