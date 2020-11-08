import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
function ManageAccountInput(props) {
    const [InputList, setInputList] = useState([]);
    const [loading, setLoading] = useState([true]);
    const fetchAllInput = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-input");
        setInputList(res.data.inputs);
        setLoading(false);
        // console.log(res);
    };

    useEffect(() => {
        fetchAllInput();
    }, []);
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Manage AccountsInput </h2>
                    <Link
                        to="/dbBackup/add-account-input"
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Account List
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Input Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {InputList.map(function(item, index) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.m_name}</td>
                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={`/dbBackup/edit-account-input/${item.id}`}
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

export default ManageAccountInput;
