export const validateEmail = value =>
    !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Addresse email invalide' : undefined;

export const validateNotEmpty = value => value ? undefined : "Champs requis";

export const validateEqual = (value1, value2) => (
    (value1 && value2 && (value1 === value2) ? undefined : "les valeurs ne sont pas identiques")
);