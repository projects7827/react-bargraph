import React from 'react';
import "../css/main.scss";


const Login = () => {
    return (
        <>
            <section className='form'>
                <div className='form__left'>
                    <img></img>
                    <h1></h1>
                    <p></p>
                </div>
                <div className='form__right'>
                    <h1 className='form__heading'>Create Account</h1>
                    <label className='form__label'>Your Email Address</label>
                    <input type="text" className='form__email'></input>
                    <label className='form__label'>Your Password</label>
                    <input type="text" className='form__password'></input>
                    <label className='form__label'>Confirm your password</label>
                    <input type="text" className='form__confirm-password'></input>
                    <label className='form__label'>Your Full Name</label>
                    <input type="text" className='form__name'></input>
                    <label className='form__label'>Your Phone Number</label>
                    <input type="text" className='form__input'></input>
                    <div className='form__terms_and_conditions'>
                        <input type="checkbox" className='form__terms'></input>
                        <label className='form__terms_label'>I read and agree Terms and Conditions</label>
                    </div>

                    <button className='form__submit'>Create account</button>
                </div>
            </section>
        </>
    )
}

export default Login