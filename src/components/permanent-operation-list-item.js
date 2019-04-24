import React from 'react';

const PermanentOperationListItem = props => {
    const {permanentOperation: {id, label, day, price},
        permanentOperationToModify} = props;

    function deletePermanentOperation(permanentOperation) {
        props.deletePermanentOperationCallBack(permanentOperation);
    }

    function setPermanentOperationToModify(id) {
        if (permanentOperationToModify !== undefined && permanentOperationToModify.id === id) {
            props.setPermanentOperationToModifyCallBack(undefined);
        } else {
            props.setPermanentOperationToModifyCallBack(id);
        }
    }

    function getClassOfRow() {
        let classRow = "table-sm";
        if (permanentOperationToModify && permanentOperationToModify.id === id) {
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
                          onClick={() => deletePermanentOperation(props.permanentOperation)}>
                    <i className="material-icons">clear</i>
                  </button>
                </span>
                <span className="btn-group-sm">
                  <button type="button" className="btn bmd-btn-icon btn-warning"
                          onClick={() => setPermanentOperationToModify(id)}>
                    <i className="material-icons">edit</i>
                  </button>
                </span>
            </td>
            <td>{day}</td>
            <td>{label}</td>
            <td>{price}</td>
        </tr>
    );
};

export default PermanentOperationListItem;