import React from "react";
import Button from "../Header/Button";
import useFormElement from './useFormElement';
import registration from '../img/success-image.svg';
import InputRadio from "../Components/InputRadio";
/* 
This block is responsible for send post request. 
The state of diffenents forms value which needs validation contain inside custom hook. It get optional props likes validation object.
There are two additional state of registration success and hundler of post request response. 
Also you can see constant 'errorStyle'. I ussually dont use this way for toogle error style of element. It used here only for demonstration. Always i use toogle class`s name in element for change style
*/



const phoneReg = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);
const emailReg = new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);

const errorStyle = {
    border: '2px solid #CB3D40',
    color: '#CB3D40'
}

export default function FormBlock({token, updateData, positions, scrollToComponent}){

    const {value : name, hundlerInputChange : hundlerNameChange, error: errorInputName, hundlerOnBlur : hundlerOnBlurName} = useFormElement(validationForm('NameValidation', {min:2, max:60}, 'Check if your name is correct'));
    const {value : email, hundlerInputChange : hundlerEmailChange, error: errorInputEmail,hundlerOnBlur : hundlerOnBlurEmail} = useFormElement(validationForm('RegExp', emailReg, 'Check if the email is correct'));
    const {value : phone, hundlerInputChange : hundlerPhoneChange, error: errorInputPhone, hundlerOnBlur : hundlerOnBlurPhone} = useFormElement(validationForm('RegExp', phoneReg, 'Check if the phone number is correct'));
    const {value : position, hundlerInputChange : hundlerPositionChange} = useFormElement();

    const [errorRequestMessage, setErrorRequestMessage] = React.useState('')
    const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false)
    
    React.useEffect(() => {
        if(errorRequestMessage.length){
            setTimeout(() => {
                setErrorRequestMessage('')
            },3000)
        }
    },[errorRequestMessage])

    const [selectedPhoto, setSelectedPhoto] = React.useState();
    React.useEffect(() => {
    },[selectedPhoto])
    React.useEffect(() => {
        scrollToComponent('.image-success-registration-container')
    },[isSuccessRegistration])

    function validationForm(type,options,errorMessage){
        return {type,options,errorMessage}
    }

    function handlerInputChange(e){
        console.log(e.target.files[0]);
        setSelectedPhoto(e.target.files[0])
    }

    function isBlockedSendButton(){

        if(name && email && phone && position && selectedPhoto && !errorInputName && !errorInputEmail && ! errorInputPhone){
            return true
        } 

        return false
    }
    function sendPostRequest(){
        let formData = new FormData(); 
        formData.append('position_id', position); 
        formData.append('name', name); 
        formData.append('email', email); 
        formData.append('phone', phone); 
        formData.append('photo', selectedPhoto);

        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { 
            method: 'POST', 
            body: formData, 
            headers: { 'Token': token }}).
            then( response => response.json()).
            then(data => { 
                console.log(data); 
                if(data.success) {
                    updateData()
                    setIsSuccessRegistration(true)
                    } else { 
                        setIsSuccessRegistration(false)
                        if(data.message === "Validation failed"){
                            const errorMessage = [];
                            for(let key in data.fails){
                                errorMessage.push(data.fails[key][0])
                            };
                            setErrorRequestMessage(errorMessage.join(' '));
                        } else {
                            setErrorRequestMessage(data.message)
                        }
                    } }) 
            .catch(error => {
                 console.log(error.message)
                });


    }
    return (
        <div className="form-block-container">
            <div className="title request-title">Working with POST request</div>
                <div className="input-forms-container">
                    <div className="input-text-container">
                        <div className="input-text-wrapper">
                            <input className="input-text" style={errorInputName?{border: errorStyle.border}:null} type='text' name='name' value={name} onChange={hundlerNameChange} onBlur={hundlerOnBlurName} placeholder=' ' autoComplete='off'/>
                            <label className="input-text-label" style={errorInputName?{color: errorStyle.color}:null}>Your name</label>
                            {errorInputName && <div className="input-text-error">{errorInputName}</div>}
                        </div>
                        <div className="input-text-wrapper">
                            <input className="input-text" style={errorInputEmail?{border: errorStyle.border}:null}  type='text' name='email' minLength={2} maxLength={100} value={email} onChange={hundlerEmailChange} onBlur={hundlerOnBlurEmail} placeholder=' ' autoComplete='off'/>
                            <label className="input-text-label" style={errorInputEmail?{color: errorStyle.color}:null}>Email</label>
                            {errorInputEmail && <div className="input-text-error">{errorInputEmail}</div>}
                        </div>
                        <div className="input-text-wrapper">
                            <input className="input-text" style={errorInputPhone?{border: errorStyle.border}:null}  type='text' name='phone' minLength={12} maxLength={15} value={phone} onChange={hundlerPhoneChange} onBlur={hundlerOnBlurPhone} placeholder=' ' autoComplete='off'/>
                            <label className="input-text-label" style={errorInputPhone?{color: errorStyle.color}:null}>Phone</label>
                            {errorInputPhone && <div className="input-text-error">{errorInputPhone}</div>}
                            {!errorInputPhone && <div className="input-text-phone-help">+380XX XXX XX XX</div>}
                        </div>
                    </div>
                    <div className="input-radio-container">
                        <div>Select your position</div>
                        <div className="input-radio-buttons-container">
                        {
                            positions.length?
                            positions.map(position => <InputRadio key={position.id} position={position} hundlerPositionChange={hundlerPositionChange}/>)
                            :
                            null
                        }
                        </div>
                    </div>
                    <div className="custom-input-file-container">
                        <label className="custom-input-file"><span className="custom-input-file-span-one">Upload</span><span className="custom-input-file-span-two">{selectedPhoto?selectedPhoto.name:'Upload your photo'}</span><input type='file' accept=".jpg,.jpeg," onChange={handlerInputChange}/></label>
                    </div>
                </div>
                <Button disabled={!isBlockedSendButton()} text='Sign up' callback={sendPostRequest}/>
            <div className="error-request-message">{errorRequestMessage}</div>
            <div style={isSuccessRegistration?null:{display:'none'}} className="image-success-registration-container title">
                <div className="image-success-registration-title">User successfully registered</div>
                <img src={registration} alt='registration'/>
            </div>
        </div>
    )
}