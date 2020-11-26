import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;
function ManageSalesMan(props) {
    const [SalesManList, setSalesManList] = useState([]);

    const allSalesMan = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-salesman");
        setSalesManList(res.data.allSalesMan);
        // setLoading(false);
    };

    useEffect(()=>{
        allSalesMan();
    },[])

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Manage SalesMan </h2>
                    <Link
                        to={defaultRouteLink + "/add-salesman"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Add SalesMan
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Warehouse Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SalesManList.map(function(item, index) {
                                // return <option value={item.id}> {item.product_name}</option>
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.wname}</td>
                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={
                                                    defaultRouteLink +
                                                    `/edit-salesman/${item.id}`
                                                }
                                                className="btn btn-primary"
                                                type="button"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageSalesMan;
