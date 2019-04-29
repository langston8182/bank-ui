import React from "react";

const PermanentOperationButtons = (props) => {

    const {permanentOperations} = props;

    function renderButtons() {
        return permanentOperations.map(po => (
            <button key={po.id} type="button" className="btn btn-primary"
                    onClick={() => props.addPermanentOperationCallback(po)}>{po.label}</button>
        ));
    }

    return (
        <div className="body_content">
            <div className="row justify-content-md-left">
                <h4>Ajouter opération permanente aux opérations</h4>
            </div>
            <div className="btn-group">
                {renderButtons()}
            </div>
        </div>
    );
};

export default PermanentOperationButtons;