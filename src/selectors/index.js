import lodash from 'lodash';

export const getUserById = (users, id) => (
    lodash.find(users, user => {
        return user.id === id;
    })
);

export const operationToModify = state => {
    return state.operation.operationToModify;
};

export const permanentOperationToModify = state => {
    return state.permanentOperation.permanentOperationToModify;
};

export const retrieveOperationToModifyInForm = (state) => {
    let operation = lodash.find(state.operation.operations, operation => {
        return operation.id === state.operation.operationToModify;
    });
    if (operation === undefined) {
        return undefined;
    }
    return {
        ...operation,
        dayOfMonth: getDayOfDate(operation.dateOperation)
    };
};

export const retrievePermanentOperationToModifyInForm = (state) => {
    let permanentOperation = lodash.find(state.permanentOperation.permanentOperations, permanentOperation => {
        return permanentOperation.id === state.permanentOperation.permanentOperationToModify;
    });
    if (permanentOperation === undefined) {
        return undefined;
    }
    return permanentOperation;
};

export const retrieveAllOperationsByMonth = (state) => {
    let month = state.operation.currentMonth;
    return state.operation.operations.filter(operation => (
        month === getMonthOfDate(operation.dateOperation)
    ));
};

export const filteredPermanentOperation = (state) => {
    const {permanentOperations} = state.permanentOperation;
    const operations = retrieveAllOperationsByMonth(state);

    return permanentOperations.filter(po => {
        let operation = lodash.find(operations, operation => {
            return operation.labelOperation === po.label
        });
        return operation === undefined || operation.labelOperation !== po.label;
    });
};

function getDayOfDate(date) {
    let dateParsed = new Date(date);
    return dateParsed.getDate();
}

function getMonthOfDate(date) {
    let dateParsed = new Date(date);
    return dateParsed.getMonth();
}
