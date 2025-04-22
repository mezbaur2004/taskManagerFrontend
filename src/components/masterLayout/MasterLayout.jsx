import React, { Fragment, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import logo from "../../assets/images/logo.svg";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { getUserDetails, removeSessions } from "../../helper/SessionHelper";
import alt from "../../assets/images/image.png";

const MasterLayout = (props) => {
    const contentRef = useRef(null);
    const sideNavRef = useRef(null);


    const onLogout = () => {
        removeSessions();
    };

    const MenuBarClickHandler = () => {
        const sideNav = sideNavRef.current;
        const content = contentRef.current;

        if (sideNav && content) {
            sideNav.classList.toggle("side-nav-open");
            sideNav.classList.toggle("side-nav-close");
            content.classList.toggle("content-expand");
            content.classList.toggle("content");
        }
    };
    let photoE = () => {
        const userPhoto = getUserDetails()['photo'];
        if (userPhoto === "") {
            return alt;
        } else {
            return userPhoto;
        }
    }

    return (
        <Fragment>
            <Navbar className="fixed-top px-0 shadow-sm">
                <Container fluid>
                    <Navbar.Brand>
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
                            <AiOutlineMenuUnfold />
                        </a>
                        <img className="nav-logo mx-2" src={logo} alt="logo" />
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={photoE()} alt="User Profile Picture" />
                            <div className="user-dropdown-content">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={photoE()} alt="User Profile Picture" />
                                    <h6>{getUserDetails()['firstName']}</h6>
                                    <hr className="user-dropdown-divider p-0" />
                                </div>
                                <NavLink to="/Profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={sideNavRef} className="side-nav-open">
                <NavLink to="/" end className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>

                <NavLink to="/Create" className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create New Task</span>
                </NavLink>

                <NavLink to="/All" className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New</span>
                </NavLink>

                <NavLink to="/Progress" className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <BsHourglass className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span>
                </NavLink>

                <NavLink to="/Completed" className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <AiOutlineCheckCircle className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span>
                </NavLink>

                <NavLink to="/Cancelled" className={({ isActive }) => (isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2")}>
                    <MdOutlineCancelPresentation className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Cancelled</span>
                </NavLink>
            </div>

            <div ref={contentRef} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;
