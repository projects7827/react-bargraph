import React, { useRef } from 'react';
import "../css/main.scss";
import img from "../img/bar graph.jpeg";
import Graph from "./Graph";


const Login = () => {
    const ref = useRef({});
    const [state, updateState] = React.useState({ "isLoggedIn": false });

    function submitForm() {
        let value = ref.current;

        if (value["form__email"]){

        }
        else {
            alert("Account Created Successfully");
            updateState({ ...state, "isLoggedIn": true })
        }
    }
    return (
        <>
            {state.isLoggedIn === true ? <Graph /> :
                <section className='form'>
                    <div className='form__left'>
                        <img src={img} />
                        <h1>Choose a Date Range</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                    </div>
                    <div className='form__right'>
                        <h1 className='form__heading'>Create Account</h1>
                        <label className='form__label'>Your Email Address</label>
                        <input type="text" className='form__email' ref={el => ref.current["form__email"] = el}></input>
                        <label className='form__label'>Your Password</label>
                        <input type="text" className='form__password' ref={el => ref.current["form__password"] = el}></input>
                        <label className='form__label'>Confirm your password</label>
                        <input type="text" className='form__confirm-password' ref={el => ref.current["form__confirm-password"] = el}></input>
                        <label className='form__label'>Your Full Name</label>
                        <input type="text" className='form__name' ref={el => ref.current["form__name"] = el}></input>
                        <label className='form__label'>Your Phone Number</label>
                        <input type="text" className='form__phone' ref={el => ref.current["form__phone"] = el}></input>
                        <div className='form__terms_and_conditions'>
                            <input type="checkbox" className='form__terms' ref={el => ref.current["form__terms"] = el}></input>
                            <label className='form__terms_label'>I read and agree Terms and Conditions</label>
                        </div>
                        <button className='form__submit' onClick={submitForm}>Create account</button>
                    </div>
                </section>

            }

        </>
    )
}

export default Login