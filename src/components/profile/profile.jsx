import {useEffect, useRef, useState} from 'react';
import {GetProfileDetails, ProfileUpdateRequest} from "../../APIRequest/APIRequest";
import {useSelector} from "react-redux";
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/formHelper";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mobileRef = useRef(null);
    const passwordRef = useRef(null);
    const userImgRef = useRef(null);

    useEffect(()=>{
        GetProfileDetails()
    },[])


    const ProfileData = useSelector((state) => state.profile.value);

    //console.log("profile data:",ProfileData)

    let navigate=useNavigate();

    const UpdateMyProfile = async () => {
        try {
            let email = emailRef.current.value;
            let firstName = firstNameRef.current.value;
            let lastName = lastNameRef.current.value;
            let mobile = mobileRef.current.value;
            let password = passwordRef.current.value;
            let photo = userImgRef.current.value;

            console.log("Update button clicked");

            if (!IsEmail(email)) {
                console.log("Invalid email detected");
                ErrorToast("Valid Email Address Required!");
                return;
            }
            if (IsEmpty(firstName)) {
                ErrorToast("First Name Required!");
                return;
            }
            if (IsEmpty(lastName)) {
                ErrorToast("Last Name Required!");
                return;
            }
            if (!IsMobile(mobile)) {
                ErrorToast("Valid Mobile Required!");
                return;
            }
            if (IsEmpty(password)) {
                console.log("hello world")
                ErrorToast("Password Required!");
                return;
            }

            let result = await ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo);

            if (result === true) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            ErrorToast("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img src={ProfileData.length > 0 ? ProfileData[0]?.photo : ""} className="img-fluid rounded-circle smaller p-5" style={{ width: "300px", height: "300px", objectFit: "cover" }} alt="Profile"/>

                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.photo : ""}
                                               ref={userImgRef} placeholder="Image URL"
                                               className="form-control animated fadeInUp" type="url"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label>Email Address(View Only)</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.email : ""}
                                               readOnly={true} ref={emailRef} placeholder="User Email"
                                               className="form-control animated fadeInUp" type="email"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.firstName : ""}
                                               ref={firstNameRef} placeholder="First Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.lastName : ""}
                                               ref={lastNameRef} placeholder="Last Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.mobile : ""}
                                               ref={mobileRef} placeholder="Mobile"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()}
                                               defaultValue={ProfileData.length > 0 ? ProfileData[0]?.password : ""}
                                               ref={passwordRef} placeholder="User Password"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <button onClick={UpdateMyProfile}
                                                className="btn w-100 float-end btn-primary animated fadeInUp">Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;