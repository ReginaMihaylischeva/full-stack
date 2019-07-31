import React from 'react';
const FormErrors = ({
    formErrors
}) => {
    const errors = Object.keys(formErrors).filter(fieldName => formErrors[fieldName].length > 0);
    return (
        errors.map((dpElem, index) => (
           <div className = 'formErrors' >
            <p key = {index } > {dpElem} {
                formErrors[dpElem]
            } < /p>
            </div>
        ))
    )
}

module.exports = {
    FormErrors
};
