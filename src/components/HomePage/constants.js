import React, { Fragment } from "react";
import Input from "../Input";

export const COLUMNS = {
  id:{
    label: "ID",
    sortable: true
  },
  preferredFullName:{
    label: "Full Name",
    sortable: true
  },
  employeeCode:{
    label: "Employee Code",
    sortable: true
  },
  jobTitleName:{
    label: "Job Title",
    sortable: true
  },
  phoneNumber:{
    label: "Phone Number",
    sortable: true
  },
  emailAddress:{
    label: "Email ID",
    sortable: true
  },
  region:{
    label: "Region",
    sortable: true
  },
  dob:{
    label: "DOB",
    sortable: true
  },
  actions:{
    label: "",
    sortable: false,
    isAction: true
  }
};

export const MODAL = {
  VIEW: "View",
  UPDATE: "Update",
  CREATE: "Create"
};

export const View = ({ a }) => {
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
};

export const Update = ({ a, onActiveChange, updateRecord, closeModal }) => {
  return (
    <Fragment>
      <div className="header-section">
        <div className="modal-header">Update Employee</div>
      </div>
      <form onSubmit={updateRecord} className="view-list">
        <div className="flex">
          <Input
            label="ID"
            value={a.employeeCode}
            name="employeeCode"
            onChange={onActiveChange}
            pre={<div className="input-pre">EM</div>}
          />
        </div>
        <div className="flex">
          <Input
            label="FirstName"
            value={a.firstName}
            name="firstName"
            onChange={onActiveChange}
          />
          <Input
            label="LastName"
            value={a.lastName}
            name="lastName"
            onChange={onActiveChange}
          />
        </div>
        <Input
          label="Job Title"
          value={a.jobTitleName}
          name="jobTitleName"
          onChange={onActiveChange}
        />
        <Input
          label="Email"
          value={a.emailAddress}
          name="emailAddress"
          onChange={onActiveChange}
        />
        <Input
          label="Phone Number"
          value={a.phoneNumber}
          name="phoneNumber"
          onChange={onActiveChange}
        />
        <div className="flex">
          <Input
            label="Region"
            value={a.region}
            name="region"
            onChange={onActiveChange}
          />
          <Input
            label="DOB"
            value={a.dob}
            name="dob"
            onChange={onActiveChange}
          />
        </div>
        <button type="submit" className="primary">
          Update
        </button>
        <button type="text" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Fragment>
  );
};

export const Create = ({ a, closeModal, createRecord, onActiveChange }) => {
  return (
    <Fragment>
      <div className="header-section">
        <div className="modal-header">Create Employee</div>
      </div>
      <form onSubmit={createRecord} className="view-list">
        <div className="flex">
          <Input
            label="ID"
            value={a.employeeCode}
            name="employeeCode"
            onChange={onActiveChange}
            pre={<div className="input-pre">EM</div>}
          />
        </div>
        <div className="flex">
          <Input
            label="FirstName"
            value={a.firstName}
            name="firstName"
            onChange={onActiveChange}
          />
          <Input
            label="LastName"
            value={a.lastName}
            name="lastName"
            onChange={onActiveChange}
          />
        </div>
        <Input
          label="Job Title"
          value={a.jobTitleName}
          name="jobTitleName"
          onChange={onActiveChange}
        />
        <Input
          label="Email"
          value={a.emailAddress}
          name="emailAddress"
          onChange={onActiveChange}
        />
        <Input
          label="Phone Number"
          value={a.phoneNumber}
          name="phoneNumber"
          onChange={onActiveChange}
        />
        <div className="flex">
          <Input
            label="Region"
            value={a.region}
            name="region"
            onChange={onActiveChange}
          />
          <Input
            label="DOB"
            value={a.dob}
            name="dob"
            onChange={onActiveChange}
          />
        </div>
        <button type="submit" className="primary">
          Create
        </button>
        <button type="text" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Fragment>
  );
};
