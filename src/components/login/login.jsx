import {Fragment, useRef} from "react";
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/FormHelper";
import {LoginRequest} from "../../APIRequest/APIRequest.js";
import {Link} from "react-router-dom";
const Login = () => {

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const SubmitLogin=async ()=>{
        let email=emailRef.current.value
        let pass=passRef.current.value;
        if(!IsEmail(email)){
            ErrorToast("Invalid email address");
        }else if(IsEmpty(pass)){
            ErrorToast("Password Required")
        }else{
            let result=await LoginRequest(email,pass);
            if (result === true) {
                window.location.href = "/";
            }
            }
        }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SIGN IN</h4>
                                <br/>
                                <input
                                    ref={emailRef}
                                    placeholder="User Email"
                                    className="form-control animated fadeInUp"
                                    type="email"
                                    autoComplete="email"
                                />

                                <br/>
                                <input
                                    ref={passRef}
                                    placeholder="User Password"
                                    className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={SubmitLogin}
                                        className="btn w-100 animated fadeInUp float-end btn-primary">Next
                                </button>
                                <hr/>
                                <div className="float-end mt-3">

                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/Registration">Sign Up </Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/SendOTP">Forget Password</Link>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;