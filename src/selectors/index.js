import lodash from 'lodash';

export const getUserById = (users, id) => (
    lodash.find(users, user => {
        return user.id === id;
    })
);

export const operationToModify = state => {
    return state.operation.operationToModify;
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

function getDayOfDate(date) {
    let dateParsed = new Date(date);
    return dateParsed.getDate() + 1;
}
