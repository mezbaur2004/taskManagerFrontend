import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/formHelper.js";
import {NewTaskRequest} from "../../APIRequest/APIRequest.js";

const Create = () => {
    let titleRef=useRef(null);
    let descriptionRef=useRef(null);

    let navigate=useNavigate();

    const CreateNew=async()=>{
        let title=titleRef.current.value;
        let description=descriptionRef.current.value;
        if(IsEmpty(title)){
            ErrorToast("Title Required !");
        }else if(IsEmpty(description)){
            ErrorToast("Description Required !");
        }else{
            let res=await NewTaskRequest(title,description)
            if(res === true){
                navigate("/All")
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
                    <div className="card-body">
                        <h4>Create New</h4>
                        <br/>
                        <input ref={titleRef} placeholder="Task Name" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <textarea ref={descriptionRef} rows={5} placeholder="Task Description" className="form-control animated fadeInUp"/>
                        <br/>
                        <button onClick={CreateNew} className="btn float-end btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;