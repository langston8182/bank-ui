import React from 'react';

const PermanentOperationListItem = props => {
    const {permanentOperation: {id, labelPermanentOperation, dayPermanentOperation, price}} = props;

    function deletePermanentOperation(permanentOperation) {
        props.deletePermanentOperationCallBack(permanentOperation);
    }

    return (
        <tr className="table-sm">
            <td>
                <span className="btn-group-sm">
                  <button type="button"
                          className="btn bmd-btn-icon btn-danger active btn-space"
                          onClick={() => deletePermanentOperation(props.permanentOperation)}>
                    <i className="material-icons">clear</i>
                  </button>
                </span>
            </td>
            <td>{dayPermanentOperation}</td>
            <td>{labelPermanentOperation}</td>
            <td>{price}</td>
        </tr>
    );
};

export default PermanentOperationListItem;