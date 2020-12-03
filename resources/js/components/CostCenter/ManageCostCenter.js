import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;
function ManageCostCenter(props) {
    const [costList, setcostList] = useState([]);
    const [loading, setLoading] = useState([true]);
    const fetchAllCost = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-costcenter");
        setcostList(res.data.costs);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCost();
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
                    <h2>Manage Cost Center </h2>
                    <Link
                        to={defaultRouteLink+"/add-costcenter"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Cost Center
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>WareHouse Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costList.map(function(item, index) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                        <td>{item.wname}</td>
                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={defaultRouteLink+`/edit-costcenter/${item.id}`}
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

export default ManageCostCenter;
