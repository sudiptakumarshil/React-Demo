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
function ManageSize(props) {
    const [sizeList, setsizeList] = useState([]);
    const [loading, setLoading] = useState([true]);

    const allsizelist = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-size");
        setsizeList(res.data.size);
        setLoading(false);
    };

    useEffect(() => {
        allsizelist();
    }, []);
    if (loading) {
        return (
            <MyBulletListLoader />
        );
    }
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Manage Size</h2>
                    <Link
                        to={defaultRouteLink + "/add-size"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Size
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizeList.map(function(item, index) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={
                                                    defaultRouteLink +
                                                    `/edit-size/${item.id}`
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

export default ManageSize;
