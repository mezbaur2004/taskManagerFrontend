import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TaskListByStatus } from "../../APIRequest/APIRequest.js";
import { DeleteToDo } from "../../helper/deleteAlert.js";
import { UpdateToDo } from "../../helper/updateAlert.js";

const Completed = () => {
    useEffect(() => {
         TaskListByStatus("Completed");
    }, []);

    const CompletedList = useSelector((state) => state.task.Completed) || [];

    const DeleteItem = async (id) => {
        try {
            const result = await DeleteToDo(id);
            if (result === true) {
                TaskListByStatus("Completed");
            }
        } catch (error) {
            console.log("Error deleting task:", error.toString());
        }
    };

    const StatusChangeItem = async (id, status) => {
        try {
            const result = await UpdateToDo(id, status);
            if (result === true) {
                TaskListByStatus("Completed");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <Fragment>
            <div className="container-fluid content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Completed</h5>
                    </div>
                    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                        <div className="row">
                            <div className="col-8">
                                <input className="form-control w-100" placeholder="Search..." />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary w-100">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-0 m-0">
                    {CompletedList.length > 0 ? (
                        CompletedList.map((item, i) => (
                            <div key={i} className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="animated fadeInUp">{item.title}</h6>
                                        <p className="animated fadeInUp">{item.description}</p>
                                        <p className="m-0 animated fadeInUp p-0">
                                            <AiOutlineCalendar /> {item.createdDate}
                                            <a
                                                onClick={() => StatusChangeItem(item._id, item.status)}
                                                className="icon-nav text-primary mx-1"
                                            >
                                                <AiOutlineEdit />
                                            </a>
                                            <a
                                                onClick={() => DeleteItem(item._id)}
                                                className="icon-nav text-danger mx-1"
                                            >
                                                <AiOutlineDelete />
                                            </a>
                                            <span className="badge float-end bg-success">{item.status}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center pt-5">
                            <h6 className="text-muted">No Completed Tasks Found</h6>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Completed;
