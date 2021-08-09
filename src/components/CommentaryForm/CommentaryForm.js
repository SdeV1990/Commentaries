import React, { useState } from 'react';

const postHTTPRequest = (url, callBackFucntion, data ) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send( JSON.stringify(data) );
    xhr.onload = callBackFucntion;
};

const CommentaryForm = ( {titleText, initialURL, lastPageUrl, getComments } ) => {

    const [ formState, setFormState ] = useState({
        name: !!localStorage.getItem('name') ? localStorage.getItem('name') : '', 
        text: !!localStorage.getItem('text') ? localStorage.getItem('text') : '', 
        isSubmitButtonActive: !!localStorage.getItem('name') && !!localStorage.getItem('text'),
        captureText: ''
    });

    const  submitHandler = async (event) => {
        event.preventDefault();
        try {
            await postHTTPRequest(
                initialURL, 
                () => {
                    localStorage.setItem('text', '');
                    setFormState({
                        ...formState, 
                        text: '',
                        isSubmitButtonActive: false,
                        captureText: ''
                    });
                    getComments(lastPageUrl);
                }, 
                formState);
        }
        catch(error) {
            // console.log(error);
            setFormState({
                ...formState, 
                captureText: 'Error! Message wasn not been sended!'
            });
        }
    };

    const handleFieldChange = ( event, fieldName ) => {
        // console.log(fieldName)
        localStorage.setItem(fieldName, event.target.value);
        setFormState({ 
            ...formState, 
            [fieldName]: event.target.value, 
            isSubmitButtonActive: event.target.value !== '' && formState[fieldName] !== ''
        });
    };

    const handleNameChange = (event) => handleFieldChange( event, 'name');
    const handleTextChange = (event) => handleFieldChange( event, 'text');

    // console.log(formState)

    return (
        <form name='commentary_form'className='commentary_form_wrapper' onSubmit={submitHandler} >
            <h2 className='commentary_form_title'>{titleText}</h2>
            <input className='commentary_form_name_input' type='text' name="name" placeholder='Enter your name' required onChange={handleNameChange} value={formState.name}></input>
            <textarea className='commentary_form_text_input' name="text" placeholder='Enter text of commentary' required onChange={handleTextChange} value={formState.text}></textarea>
            <button className='commentary_form_button_send_active'  disabled={!formState.isSubmitButtonActive} >Send</button>
            <p className='commentary_form_capture'>{formState.captureText}</p>
        </form>
    );
};

export default CommentaryForm;