import React, { useState } from 'react';
import InputField from '../../../global_ui/input';
import './requester_form.css'
const RequesterForm = () => {
    /* eslint-disable */

    const [details, setdetails] = useState({
        number: '',
        name: '',
        yearOfBirth: ""
    })
    const [errors, setErrors] = useState({
        numbers: '',
        showErrors: false,
        name: '',
        yearOfBirth: ''
    })


    const submit = (event) => {
        event.preventDefault()
        setErrors({
            ...errors,
            showErrors: true,
        })
        console.log(errors.numbers);
    }

    const _handleNumber = (e) => {
        const number = e.target.value
        const regE = /^[6-9]\d{9}$/
        if (!regE.test(number)) {
            setErrors({
                ...errors,
                numbers: "Please enter a valid number"
            })
        }
        setdetails({
            ...details,
            number: e.target.value
        })

    }

    const _handleName = (e) => {
        const name = e.target.value
        if (name === "") {
            setErrors({
                ...errors,
                name: "Please enter your name"
            })
        }
        else if (!(/^[a-zA-Z]*$/).test(name)) {
            setErrors({
                ...errors,
                name: "Please enter a valid name"
            })
        }
        else if (name.length < 3) {
            setErrors({
                ...errors,
                name: "Name must be atleast 3 characters!"
            })

        }
        setdetails({
            ...details,
            name: e.target.value
        })
    }

    const _handleYear = (e) => {

        const year = e.target.value
        if(!Number.isInteger(year)){
            setErrors({
                ...errors,
                yearOfBirth: "Invalid Year!"
            })
        }
        if(year.length == 0){
            setErrors({
                ...errors,
                yearOfBirth: "Enter Year!"
            })
        }
        else if(year.length != 4){
            setErrors({
                ...errors,
                yearOfBirth: "Invalid Year"
            })
        }

        setdetails({
            ...details,
            yearOfBirth: e.target.value
        })
    }


    return (

        <form className="form" onSubmit={submit} >


            <InputField type="number" error={errors.showErrors ?errors.numbers:""} onChange={_handleNumber} maxLength='10' placeholder="Enter Phone number" />
            <div className="sec-row">
                <InputField error={errors.showErrors ?errors.name:""} onChange={_handleName} type="text" placeholder="Enter Name" />
                <InputField error={errors.showErrors ?errors.yearOfBirth:""} onChange={_handleYear} type="number" placeholder="Year Of Birth" />
            </div>
            <button type="submit" >Request OTP</button>
        </form>

    );
}

export default RequesterForm;