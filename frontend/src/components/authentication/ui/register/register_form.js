import React, { useContext, useState } from 'react';
import { AuthContext, requestOTP } from '../../../context/auth/authProvider';
import InputField from '../../../global_ui/input';
import './register_form.css'
import Requester from '../../../../models/requester'
import Rider from '../../../../models/rider'

const Form = () => {

    const { isRequester,dispatch ,otp} = useContext(AuthContext)
    const [details, setdetails] = useState({
        number: '',
        name: '',
        yearOfBirth: ""
    })
    const [errors, setErrors] = useState({
        number: '',
        showErrors: false,
        name: '',
        errorCount: 0,
        yearOfBirth: ''
    })


    const submit = (event) => {
        event.preventDefault()
        console.log(otp);
        setErrors({
            ...errors,
            showErrors: true,
        })
        console.log(errors.errorCount);
        if (errors.errorCount <= 0) {
            if(isRequester){
                const requester = new Requester(details.number,details.name,details.yearOfBirth)
                requestOTP(dispatch,requester)
            }else{
                const rider = new Rider(details.number,details.name)
                requestOTP(dispatch,rider)

            }
        }
        else{
            console.log("ukghj");
        }
    }

    const _handleNumber = (e) => {
        const number = e.target.value
        const regE = /^[6-9]\d{9}$/
        if (!regE.test(number)) {
            setErrors({
                ...errors,
                number: "Please enter a valid number"
            })
        } else {
            setErrors({
                ...errors,
                number: "",
                errorCount: errors.errorCount - 1
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

        } else {
            setErrors({
                ...errors,
                name: "",
                errorCount: errors.errorCount - 1

            })
        }
        setdetails({
            ...details,
            name: e.target.value
        })
    }

    const _handleYear = (e) => {

        const year = e.target.value
        if (!Number.isInteger(year)) {
            setErrors({
                ...errors,
                yearOfBirth: "Invalid Year!"
            })
        }
        if (year.length == 0) {
            setErrors({
                ...errors,
                yearOfBirth: "Enter Year!"
            })
        }
        else if (year.length != 4) {
            setErrors({
                ...errors,
                yearOfBirth: "Invalid Year"
            })
        }
        else {
            setErrors({
                ...errors,
                yearOfBirth: "",
                errorCount: errors.errorCount - 1

            })
        }
        setdetails({
            ...details,
            yearOfBirth: e.target.value
        })
    }


    return (

        <form className="form" onSubmit={submit} >

            <p style={{ textAlign: "center", fontSize: 2 + 'em' }} >{otp}</p>
            <div style={{ height: 1 + 'rem' }} ></div>

            <InputField type="number" error={errors.showErrors ? errors.number : ""} onChange={_handleNumber} maxLength='10' placeholder="Enter Phone number" />
            <div className="sec-row">
                <InputField error={errors.showErrors ? errors.name : ""} onChange={_handleName} type="text" placeholder="Enter Name" />
                <InputField error={errors.showErrors ? errors.yearOfBirth : ""} onChange={_handleYear} type="number" placeholder="Year Of Birth" />
            </div>
            <button className="otp-btn" type="submit" >REQUEST OTP</button>
        </form>

    );
}

export default Form;