/*
Simple validators for the backend forms
*/
const isEmpty = string => {
    if(string.trim() === "") return true;
    else return false;
};

exports.validateRegister = data => {
    let errors = {};

    if (isEmpty(data.firstName) || isEmpty(data.lastName) 
    || isEmpty(data.email) || isEmpty(data.password)) {
        errors.generic = "Fields cannot be empty";
    }
    return { 
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}

exports.validateLogin = data => {
    let errors = {};

    if (isEmpty(data.email)){
        errors.email = "Fields must not be empty";
    }
    if (isEmpty(data.password)){
        errors.password = "Fields must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateActForm = data => {
    let errors = {};
    if (isEmpty(data.activity)){
        errors.activity = "Activity field must not be empty";
    }
    if (data.activity.length > 20){
        errors.activity = "Activity name cannot be more than 20 characters"
    }
    if (data.notes.length > 1000){
        errors.notes = "Notes cannot be more than 1,000 characters"
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};