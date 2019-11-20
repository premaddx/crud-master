import React from "react";
import { connect } from "react-redux";
import {
  sortTable,
  fetchTableData,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  search,
  pagination
} from "../../redux/actions/datatable-action";
import Modal from "../Modal";
import Input from "../Input";
import Table from "../Table";
import { MODAL, COLUMNS, Create, Update, View } from "./constants";
import "./style.css";

class HomePage extends React.Component {
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

  componentDidMount() {
    this.props.fetchTableData();
  }

  handleSortTable = keyName => () => {
    let sortType;
    if (keyName === this.state.sortColumn) {
      sortType = this.toggleSortType();
      this.props.sortTable(this.props.tableData, keyName, sortType);
    } else {
      sortType = "ASC";
      this.props.sortTable(this.props.tableData, keyName, sortType);
    }
    this.setState({ sortType, sortColumn: keyName });
  };

  toggleSortType = () => {
    if (this.state.sortType === "ASC") return "DSC";
    return "ASC";
  };

  createEmployee = () => this.props.createEmployee();

  deleteEmployee = (obj) => this.props.deleteEmployee(obj.id);

  searchTable = () => () => {
      this.props.search(this.state.searchKey, this.state.searchText);
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
    const numberOfButtons =
        this.props.numberOfButtons && parseInt(this.props.numberOfButtons, 10);
    const limit = currentPage + numberOfButtons <= totalPages ? currentPage + numberOfButtons : totalPages;
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

  openModal = modalView => active => {
    this.setState({ isOpen: true, modalView, active: active || {} });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  getActions = () => {
    return [
      {
        label: "View",
        cb: this.openModal(MODAL.VIEW)
      },
      {
        label: "Edit",
        cb: this.openModal(MODAL.UPDATE)
      },
      {
        label: "Delete",
        cb: this.deleteEmployee
      }
    ];
  };

  render() {
    const { tableData } = this.props;
    return (
      <div className="body-container">
        <div className="flex">
          <h3>Employees</h3>
          <button onClick={this.openModal(MODAL.CREATE)} className="primary">
            Add Employee
          </button>
        </div>
        <div>
          <select onChange={this.handleSelectChange}>
            {Object.keys(COLUMNS).map(col => {
              return (
                <option value={col} key={col}>
                  {COLUMNS[col]['label']}
                </option>
              );
            })}
          </select>
          <Input
            type="text"
            name="search"
            placeholder="Search"
            classProp="search"
            onChange={this.handleTextFieldChange}
          />
          <button type="button" onClick={this.searchTable()}>
            Search
          </button>
        </div>
        <Table
          actions={this.getActions()}
          data={tableData}
          sortCb={this.handleSortTable}
          cols={COLUMNS}
          fixedHeader={true}
        />
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
    dataTableReducer: { tableData, totalPages, currentPage, pageSize, numberOfButtons }
  } = state;
  return {
    tableData,
    totalPages,
    currentPage,
    pageSize,
    numberOfButtons,
  };
};

export default connect(
  mapStateToProps,
  {
    sortTable,
    search,
    pagination,
    fetchTableData,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
)(HomePage);
