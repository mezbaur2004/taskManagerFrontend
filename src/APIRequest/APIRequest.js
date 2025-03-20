import axios from 'axios';
import {ErrorToast,SuccessToast} from "../helper/formHelper.js";
import store from '../redux/store/store.js';
import {HideLoader,ShowLoader} from "../redux/state-slice/settingsSlice.js"
import {getToken,setEmail,setOTP,setToken,setUserDetails} from "../helper/sessionHelper.js";
import {SetCancelledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/taskSlice";
import {SetSummary} from "../redux/state-slice/summarySlice.js";
import {SetProfile} from "../redux/state-slice/profileSlice.js";

const BaseURL="http://localhost:3030/api";

const AxiosHeader={headers:{"token":getToken()}}


export async function LoginRequest(email,password){
    try{
        store.dispatch(ShowLoader())
        let URL=BaseURL+`/login`;
        let PostBody={"email":email,"password":password}
        let res=await axios.post(URL,PostBody);
        store.dispatch(HideLoader());
        if(res.status===200){
            setToken(res.data.token);
            setUserDetails(res.data.data)
            //console.log(res.data.data)
            SuccessToast("Login successful");
            localStorage.setItem("token", res.data.token);

            return true;
        }else{
            ErrorToast("Invalid login credentials");
            return false;
        }

    }catch (error){
        store.dispatch(HideLoader());

        if (error.response) {
            // Server responded with a status code outside of the 2xx range
            ErrorToast(`Invalid login credentials`);
        } else if (error.request) {
            // The request was made but no response was received
            ErrorToast("Network Error: No response from server");
        } else {
            // Something else went wrong
            ErrorToast("Something Went Wrong, e:",error.toString());
        }
        return false;
    }
}

export async function RegistrationRequest(email, firstName, lastName, mobile, password,photo) {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/registration`;
        let PostBody = { email, firstName, lastName, mobile, password, photo };

        let res = await axios.post(URL, PostBody);

        store.dispatch(HideLoader());

        if (res.status === 200) {
            if (res.data.status === "fail") {
                // Handle duplicate email error from backend
                if (res.data.message === "Email Already Exists") {
                    ErrorToast("Email Already Exists");
                    return false;
                } else {
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            } else {
                SuccessToast("Registration Successful");
                return true;
            }
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    } catch (err) {
        store.dispatch(HideLoader());
        console.error("Registration Error:", err);

        // Handle errors properly
        if (err.response && err.response.data) {
            ErrorToast(err.response.data.message || "Something Went Wrong");
        } else {
            ErrorToast("Something Went Wrong, e:",err.toString());
        }
        return false;
    }
}

export async function TaskListByStatus(Status){
    try{
        store.dispatch(ShowLoader());
        let URL=BaseURL+"/listTaskByStatus/"+Status;
        let res=await axios.get(URL,AxiosHeader);
        //console.log("AxiosHeader->",AxiosHeader)
        store.dispatch(HideLoader());
        if(res.status===200){
            if(Status==="New"){
                store.dispatch(SetNewTask(res.data['data']));
            }
            else if(Status==="Completed"){
                store.dispatch(SetCompletedTask(res.data['data']));
            }
            else if(Status==="Cancelled"){
                store.dispatch(SetCancelledTask(res.data['data']));
            }
            else if(Status==="Progress"){
                store.dispatch(SetProgressTask(res.data['data']));
            }
        }
        else{
            //console.log("not200\n",URL,"\n",AxiosHeader,"\n",Status)
            ErrorToast("Something Went Wrong");
        }
    }catch (error) {
        ErrorToast("Something Went Wrong, e:",error.toString());
        store.dispatch(HideLoader());
    }
}

export async function DeleteRequest(id){
    try{
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/deleteTask/${id}`;
        let res= await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader());
        if(res.status===200){
            SuccessToast("Task deleted successfully");
            return true;
        }else{
            ErrorToast("Something Went Wrong");
        }
    }catch (error) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
    }
}

export async function UpdateStatusRequest(id,status){
    try{
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/updateTaskStatus/${id}/${status}`;
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader());
        if(res.status===200){
            SuccessToast("Status updated successfully!");
            return true;
        }else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }catch (error){
        ErrorToast("Something Went Wrong, e:",error.toString())
        store.dispatch(HideLoader())
        return false;
    }
}

export async function NewTaskRequest(title,description){
    try{

        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/createTask`;
        let PostBody={title,description,status:"New"};
        let res=await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if(res.status===200){
            SuccessToast("New Task Created");
            return true;
        }else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }catch(error){
        ErrorToast("Something Went Wrong, e:",error.toString());
        return false;
    }
}

export async function SummaryRequest(){
    try{
        store.dispatch(ShowLoader());
        let URL=`${BaseURL}/taskStatusCount`;
        //console.log(URL)
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader());
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }else{
            ErrorToast("Something Went Wrong")
        }
    }catch (error){
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
    }
}

export async function GetProfileDetails(){
    try {
        store.dispatch(ShowLoader());
        let URL=`${BaseURL}/profileDetails`
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data']));
        }else{
            ErrorToast("Something Went Wrong");
        }
    }catch (error) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong.e:",error.toString())
    }
}

export async function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){
    try{
        store.dispatch(ShowLoader());
        let URL=`${BaseURL}/updateProfile`;

        let PostBody={email,firstName,lastName,mobile,password,photo};
        let UserDetails={email,firstName,lastName,mobile,photo};
        let res= await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader());
        if(res.status===200){
            SuccessToast("Profile Updated successfully");
            setUserDetails(UserDetails);
            return true;
        }else{
            ErrorToast("Something Went Wrong");
            return false;
        }

    }catch (error) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong.e:",error.toString());
        return false;
    }
}

