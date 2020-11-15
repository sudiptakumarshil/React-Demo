import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
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
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Swal from "sweetalert2";

const Header = props => {
    const [menuList, setMenuList] = useState([]);
    const [submenuList, setsubmenuList] = useState([]);
    const [loading, setLoading] = useState([]);
    const [submenu, setsubmenu] = useState([]);

    const data = {
        submenu: []
    };
    const [formData, setformData] = useState(data);

    const fetchAllmenu = async () => {
        const res = await axios.get(defaultRouteLink + "/api/get-menu-submenu");
        // console.log(res.data.submenu);
        setMenuList(res.data.list.list);
        setLoading(false);
    };

    // {menuList.map(function(item, index) {
    //     if(typeof item.isChecked == 'undefined')
    //         item.isChecked=false;
    //     return (

    //             <tr>
    //                 <td>{item.id}</td>
    //                 <td>
    //                     <input
    //                         type="checkbox"
    //                         key={item.id}
    //                         onClick={handleAllChecked}
    //                         value={item.id}
    //                         checked={item.isChecked}
    //                     />
    //                     {item.name}
    //                 </td>
    //                 <td>
    //                     <div className="row">
    //                         {item.sub_menu.map(sub => {
    //                             //if(typeof sub.isChecked != 'undefined' && sub.isChecked)
    //                              console.log("test5="+sub.isChecked+","+""+sub.id+"-"+sub.name);

    //                             return (<CheckBoxRole handleCheckChieldElement={handleCheckChieldElement}  {...sub} />)
    //                         }
    //                             )
    //                     }
    //                     </div>
    //                 </td>
    //             </tr>

    //     );
    // })}
    useEffect(() => {
        fetchAllmenu();
    }, []);

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
                        <div style={{ textAlign: "center" }}>
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
                                <a href="http://localhost/dbBackup/admin_dashboard">
                                    <i className="icofont-speed-meter"></i>{" "}
                                    Dashboard
                                </a>
                            </li>

                            {menuList.map(function(item, index) {
                                return (
                                    <li className="submenu">
                                        <a href="#">
                                            <i className="icofont-list"></i>
                                            <span>{item.name}</span>
                                            <span className="menu-arrow">
                                                <i className="icofont-simple-right"></i>
                                            </span>
                                        </a>

                                        <ul
                                            className="list-unstyled"
                                            // style={{ display: "none" }}
                                        >
                                            {item.sub_menu.map(sub => {
                                                return (
                                                    <li className="">
                                                        <Link
                                                            to={
                                                                defaultRouteLink + `/${sub.link_id}`

                                                            }
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                            {/*
                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Setup</span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{ display: "none" }}
                                >
                                    <li className="">
                                        <Link to="/dbBackup/manage-invoiceparams">
                                            Manage Invoice Params
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-role">
                                            Role Management
                                        </Link>
                                    </li>
                                </ul>
                            </li>
 */}

                            {/*
                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Input</span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{ display: "none" }}
                                >
                                    <li className="">
                                        <Link to="/dbBackup/manage-warehouse">
                                            Manage WareHouse
                                        </Link>
                                    </li>
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

                                    <li className="">
                                        <Link to={`/dbBackup/issue/${6}`}>
                                            Issue
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbBackup/manage-bank-details">
                                            Bank Details
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-store-invoice">
                                            Manage Store Invoice
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-unit">
                                            Manage Unit
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-account-input">
                                            Manage Account Input
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="submenu">
                                <a href="#">
                                    <i className="icofont-list"></i>
                                    <span>Transection</span>
                                    <span className="menu-arrow">
                                        <i className="icofont-simple-right"></i>
                                    </span>
                                </a>
                                <ul
                                    className="list-unstyled"
                                    style={{ display: "none" }}
                                >
                                    <li className="">
                                        <Link
                                            to={`/dbBackup/new-purshase/${1}`}
                                        >
                                            New Purshase
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link
                                            to={`/dbBackup/purshase-return/${2}`}
                                        >
                                            Purshase Return
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/dbBackup/sale-return/${4}`}>
                                            Sale Return
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/dbBackup/sale/${3}`}>
                                            Sale
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link
                                            to={`/dbBackup/quick-purshase/${5}`}
                                        >
                                            Quick Purshase
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-cash-account">
                                            Manage Cash Account
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/manage-costcenter">
                                            Manage Cost Center
                                        </Link>
                                    </li>

                                    <li className="">
                                        <Link to="/dbBackup/paymentvaucher">
                                            Payment Vaucher
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
                                    style={{ display: "none" }}
                                >
                                    <li className="">
                                        <Link to="/dbBackup/stock-report">
                                            Stock Report
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                         */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-wrapper">{props.children}</div>
        </div>
    );
};
export default compose(withRouter, connect(null, null))(Header);
