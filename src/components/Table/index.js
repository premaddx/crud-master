import React from "react";
import "./style.css";
export default class Table extends React.Component {
  callAction = (cb, obj) => () => {
    cb(obj);
  };

  render() {
    const { actions, sortCb, data, cols, fixedHeader } = this.props;
    return (
      <div className={`table-container ${fixedHeader ? "fixed-header" : ""}`}>
        <table className="container">
          <thead>
            <tr>
              {Object.keys(cols).map(col => {
                return (
                  <th scope="col" key={col}>
                    {cols[col].sortable ? (
                      <a onClick={sortCb(col)} className="sort-by">
                        {cols[col].label}
                      </a>
                    ) : (
                      <span>{cols[col].label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(obj => {
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
                  {actions ? (
                    <td>
                      <div className="actions">
                        {actions.map(k => (
                          <button
                            type="button"
                            onClick={this.callAction(k.cb, obj)}
                          >
                            {k.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
