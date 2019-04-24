import React from 'react';

const PermanentOperationListItem = props => {
    const {permanentOperation: {id, labelPermanentOperation, dayPermanentOperation, price}} = props;

    return (
        <tr className="table-sm">
            <td>&nbsp;</td>
            <td>{dayPermanentOperation}</td>
            <td>{labelPermanentOperation}</td>
            <td>{price}</td>
        </tr>
    );
};

export default PermanentOperationListItem;