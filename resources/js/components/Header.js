import React, {useState, useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter, Redirect} from "react-router-dom";
import {
    defaultRouteLink,
    getAccessTokenName,
    userLogout,
    isLoginExist
} from "../common/config";
import {
    getCookieKeyInfo,
    setCookie,
    removeCookie
} from "../common/CookieService";
import {Link} from "react-router-dom";
import Dashboard from "./Dashboard";
import Swal from "sweetalert2";

const Header = props => {
    return (
        <div className="main-wrapper slide-nav">
            <div className="header">
                <div className="container-fluid">
                    <div className="header-left">
                        <a id="toggle-menu" href="#sidebar" className="logo">
                            <i className="icofont-navigation-menu"></i>
                        </a>
                    </div>
                    <div className="header-right">
                        <div className="page-title-box pull-left">
                            <h3>Admin</h3>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <ul className="nav navbar-nav navbar-right user-menu pull-right">
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle"
                                        href="#"
                                        role="button"
                                        id="profileLinkDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <i className="far fa-user"></i>
                                        </span>{" "}
                                        Admin
                                    </a>

                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="profileLinkDropdown"
                                    >
                                        <a
                                            className="dropdown-item logOut"
                                            href="#"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            className="dropdown-item logOut"
                                            href="#"
                                        >
                                            Password Change
                                        </a>
                                        <a
                                            className="dropdown-item logOut"
                                            onClick={() => userLogout(props)}
                                            href=""
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className="dropdown mobile-user-menu pull-right">
                            <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <ul className="dropdown-menu pull-right">
                                <li>
                                    <a
                                        className="logOut"
                                        onClick={() => userLogout(props)}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar opened" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li>
                                <a href="">
                                    <i className="icofont-speed-meter"></i>{" "}
                                    Dashboard
                                </a>
                            </li>
                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Ware House </span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{display: "none"}}
                                >
                                    <li className="">
                                        <Link to="/dbBackup/manage-warehouse">
                                            Manage WareHouse
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Settings</span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{display: "none"}}
                                >
                                    <li className="">
                                        <Link to="/dbBackup/manage-vendor">
                                            Manage All Vendor
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbBackup/manage-Customer">
                                            Manage All Customer
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbBackup/create-invent-category">
                                            Create Inventory Category
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-product">
                                            Manage Inventory Product
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbBackup/manage-store">
                                            Manage Store
                                        </Link>
                                    </li>
                                    {/* <li className="">
                                        <Link to="/dbBackup/store-invoice">
                                            Store Invoice
                                        </Link>
                                    </li> */}
                                    <li className="">
                                        <Link to={`/dbBackup/new-purshase/${1}`}>
                                            New Purshase
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/dbBackup/purshase-return/${2}`}>
                                        Purshase Return
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/dbBackup/sale-return/${3}`}>
                                            Sale Return
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/dbBackup/sale/${4}`}>
                                            Sale
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Report</span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{display: "none"}}
                                >
                                    <li className="">
                                        <a
                                            data-id="0"
                                            href="{{ url('/report_all') }}"
                                        >
                                            All
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            data-id="0"
                                            href="{{ url('/getTaskSituation') }}"
                                        >
                                            {" "}
                                            Task Status
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            data-id="0"
                                            href="{{ url('/taskDetailsReport') }}"
                                        >
                                            Activites
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-wrapper">{props.children}</div>
        </div>
    );
};
export default compose(withRouter, connect(null, null))(Header);
