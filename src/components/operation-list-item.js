import React from 'react';

const OperationListItem = (props) => {
    const {operation: {id, intitule, dateOperation, prix}, operationToModify} = props;

    function deleteOperation(operation) {
         props.deleteOperationCallBack(operation);
    }

    function setOperationToModify(id) {
        if (operationToModify !== undefined && operationToModify.id === id) {
            props.setOperationToModifyCallBack(undefined);
        } else {
            props.setOperationToModifyCallBack(id);
        }
    }

    function getClassOfRow() {
        let classRow = prix > 0 ? "table-sm table-success" : "table-sm table-danger";
        if (operationToModify && operationToModify.id === id) {
            classRow = "table-sm table-active";
        }

        return classRow;
    }

    return (
        <tr className={getClassOfRow()}>
            <td>
                <span className="btn-group-sm">
                  <button type="button"
                          className="btn bmd-btn-icon btn-danger active btn-space"
                          onClick={() => deleteOperation(props.operation)}>
                    <i className="material-icons">clear</i>
                  </button>
                </span>
                <span className="btn-group-sm">
                  <button type="button" className="btn bmd-btn-icon btn-warning"
                          onClick={() => setOperationToModify(id)}>
                    <i className="material-icons">edit</i>
                  </button>
                </span>
            </td>
            <td>{dateOperation}</td>
            <td>{intitule}</td>
            <td>{prix}</td>
        </tr>
    );
};

export default OperationListItem;