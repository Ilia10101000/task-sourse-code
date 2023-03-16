/*
Custom hook that get optional props object of validation params and hundle it. It return state and hunder change value by default.
*/
import React from 'react'

export default function useFormElement(validation = null){
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');

    function hundlerInputChange(e){
        setValue(e.target.value)
    }
    if(validation){

        if(validation.type === 'RegExp'){

            function isValid(reg){
                return reg.test(value)
            }
            function hundlerOnBlur(){
                if(!value.length){
                    setError(null)
                } else if(!isValid(validation.options)){
                    setError(validation.errorMessage)
                } else {
                    setError(null)
                }
            }

            return {value,hundlerInputChange, error, hundlerOnBlur}

        } else if(validation.type === 'NameValidation'){

            function hundlerOnBlur(e){
                if(!value){
                    setError(null)
                } else if(value.length < validation.options.min || value.length > validation.options.max){
                    setError(validation.errorMessage)
                } else {
                    setError(null)
                }
            }

            return {value,hundlerInputChange, error, hundlerOnBlur}
        }
    }


    return {value,hundlerInputChange}
}