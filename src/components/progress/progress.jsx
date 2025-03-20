import { Fragment, useEffect } from "react";
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TaskListByStatus } from "../../APIRequest/APIRequest.js";
import { useSelector } from "react-redux";
import { DeleteToDo } from "../../helper/deleteAlert.js";
import { UpdateToDo } from "../../helper/updateAlert.js";

const Progress = () => {
    useEffect(() => {
        TaskListByStatus("Progress");
    }, []);

    const ProgressList = useSelector((state) => state.task.Progress) || [];

    const DeleteItem = async (id) => {
        try {
            const result = await DeleteToDo(id);
            if (result) {
                TaskListByStatus("Progress");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const StatusChangeItem = async (id, status) => {
        try {
            const result = await UpdateToDo(id, status);
            if (result) {
                TaskListByStatus("Progress");
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
                        <h5>In Progress</h5>
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
                    {ProgressList.length > 0 ? (
                        ProgressList.map((item, i) => (
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
                                            <span className="badge float-end bg-secondary">{item.status}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center pt-5">
                            <h6 className="text-muted">No Progress Tasks Found</h6>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Progress;
