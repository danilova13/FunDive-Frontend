import { useState } from 'react';

export function useForm<T>(callback: any, initialState: T) {

    // values is an obj that holds the current state of form inputs
    const [values, setValues] = useState(initialState);

    // updates the values state whenever an input field changes
    const onChange = (event: any) => {
        // uses the input's name attribute to identify which part of the state to update
        // and sets it to the current value of that input 
        setValues({ ...values, [event.target.name]: event.target.value });

    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        // contains the logic you want to execute when the form is submitted
        callback();
    }

    return {
        onChange,
        onSubmit,
        values, 
        setValues
    }
}