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

const ProductUnit = props => {
    const [productUnitList, setproductUnitList] = useState([]);
    const [loading, setLoading] = useState([true]);
    const fetchAllUnit = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-unit");
        setproductUnitList(res.data.unit);
        setLoading(false);
        // console.log(res);
    };

    useEffect(() => {
        fetchAllUnit();
    }, []);

    if (loading) {
        return (
            <h2 className="text-center mt-3">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <MyBulletListLoader />
            </h2>
        );
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Manage Unit </h2>
                    <Link
                        to="/dbBackup/add-unit"
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Unit
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Unit Name</th>
                                <th>Unit Code</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productUnitList.map(function(item, index) {
                                // return <option value={item.id}> {item.product_name}</option>
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.unit_name}</td>
                                        <td>{item.unit_code}</td>
                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={`/dbBackup/edit-unit/${item.id}`}
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
};

export default ProductUnit;
