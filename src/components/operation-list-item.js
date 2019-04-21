import React from 'react';

const OperationListItem = (props) => {
    const {id, label, dateOperation, price} = props.operation;

    return (
        <tr className={price > 0 ? "table-sm table-success" : "table-sm table-danger"}>
            <td>
                <span className="btn-group-sm">
                  <button type="button" className="btn bmd-btn-icon btn-danger active btn-space">
                    <i className="material-icons">clear</i>
                  </button>
                </span>
                <span className="btn-group-sm">
                  <button type="button" className="btn bmd-btn-icon btn-warning">
                    <i className="material-icons">edit</i>
                  </button>
                </span>
            </td>
            <td>{dateOperation}</td>
            <td>{label}</td>
            <td>{price}</td>
        </tr>
    );
};

export default OperationListItem;