import React, { useRef } from 'react';
import "../css/main.scss";
import img from "../img/bar graph.jpeg";
import Graph from "./Graph";


const Login = () => {
    const ref = useRef({});
    const [state, updateState] = React.useState({ "isLoggedIn": getCookie("pt-login") !== "" ? true : false, "name": getCookie("pt-name") });

    function validateEmail(email) {
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
        return res.test(email);
    }


    function setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    }


    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function phoneValidation(value) {
        var arr = [];
        for (let i = 0; i < value.length; i++) {
            console.log(parseInt(value[i]));
            if (isNaN(parseInt(value[i]))) {
                console.log("done")
                return false
            }
        }
        return true;
    }
    function submitForm() {
        let value = ref.current;
        if (value["form__email"].value === "" || value["form__email"].value === undefined) {
            showAlert("failure", "Enter Email");
        }
        else if (validateEmail(value["form__email"].value) === false) {
            showAlert("failure", "Enter a valid Email Address");
        }
        else if (value["form__password"].value === "" || value["form__password"].value === undefined) {
            showAlert("failure", "Enter Password");
        }

        else if (value["form__confirm-password"].value === "" || value["form__confirm-password"].value === undefined) {
            showAlert("failure", "Enter Confirmation Password");
        }
        else if (value["form__password"].value !== value["form__confirm-password"].value) {
            showAlert("failure", "Password not matching");
        }


        else if (value["form__password"].value.length < 8) {
            showAlert("failure", "Invalid Password");
        }
        else if (value["form__name"].value === "" || value["form__name"].value === undefined) {
            showAlert("failure", "Enter Name");
        }
        else if (value["form__phone"].value === "" || value["form__phone"].value === undefined) {
            showAlert("failure", "Enter Phone Number");
        }
        else if (value["form__phone"].value.length !== 10 || phoneValidation(value["form__phone"].value) === false) {
            showAlert("failure", "Invalid Phone Number");
        }
        else if (value["form__terms"].checked === false) {
            showAlert("failure", "Read and check terms and conditions ");
        }
        else {
            setCookie("pt-login", true);
            setCookie("pt-name", value["form__name"].value)
            showAlert("success", "Account Created Successfully");
            setTimeout(() => {
                updateState({ ...state, "isLoggedIn": true, "name": value["form__name"].value })
            }, 2000)
        }
    }
    function showAlert(value, message) {
        let el = ref.current["form__alert"]
        el.style.display = "flex";
        if (value === "success") {
            el.style.background = "green";
        }
        else {
            el.style.background = "red";
        }
        el.innerHTML = message;
    }
    return (
        <>
            {state.isLoggedIn === true ? <Graph name={state.name} /> :
                <section className='form'>
                    <div className='form__left'>
                        <img src={img} alt="mainImg" />
                        <h1>Choose a Date Range</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                    </div>
                    <div className='form__right'>
                        <div className='form__alert' ref={el => ref.current["form__alert"] = el}>Wrong Password</div>
                        <h1 className='form__heading'>Create Account</h1>
                        <label className='form__label'>Your Email Address</label>
                        <input type="text" className='form__email' ref={el => ref.current["form__email"] = el}></input>
                        <label className='form__label'>Your Password</label>
                        <input type="password" className='form__password' ref={el => ref.current["form__password"] = el}></input>
                        <label className='form__label'>Confirm your password</label>
                        <input type="password" className='form__confirm-password' ref={el => ref.current["form__confirm-password"] = el}></input>
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