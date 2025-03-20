import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorToast,IsEmail, IsEmpty} from "../../helper/formHelper.js";
import { RegistrationRequest } from "../../APIRequest/APIRequest";

const Registration = () => {

    let emailRef=useRef(null);
    let firstNameRef=useRef(null);
    let lastNameRef=useRef(null);
    let mobileRef=useRef(null);
    let passwordRef=useRef(null);

    let navigate=useNavigate();

    const onRegistration=async ()=>{
        let email=emailRef.current.value;
        let firstName=firstNameRef.current.value;
        let lastName=lastNameRef.current.value;
        let mobile=mobileRef.current.value;
        let password=passwordRef.current.value;
        let photo=""
        if(!IsEmail(email)){
            ErrorToast("Valid Email Address Required !");
        }else if(IsEmpty(firstName)){
            ErrorToast("First Name is required");
        }else if(IsEmpty(lastName)){
            ErrorToast("Last Name is required");
        }else if(IsEmpty(mobile)){
            ErrorToast("Valid Mobile number is required");
        }else if(IsEmpty(password)){
            ErrorToast("Password is required");
        }else{
            try {
                let result = await RegistrationRequest(email, firstName, lastName, mobile, password, photo);
                if (result === true) {
                    navigate("/login");
                }
            } catch (error) {
                ErrorToast("Something went wrong during registration!");
                console.error("Registration Error:", error);
            }
        }

    }

    return (
        <div>
            <div className="container">
                <div className="row  justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up</h4>
                                <hr/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Email Address</label>
                                            <input ref={emailRef}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>First Name</label>
                                            <input ref={firstNameRef} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Last Name</label>
                                            <input ref={lastNameRef} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Mobile Number</label>
                                            <input ref={mobileRef} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Password</label>
                                            <input ref={passwordRef} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                        </div>

                                    </div>
                                    <div className="row mt-2 p-0">
                                        <div className="col-md-4 p-2">
                                            <button onClick={onRegistration} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        </div>
    );
};

export default Registration;