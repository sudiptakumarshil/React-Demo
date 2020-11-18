import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;

const ManageProduct = props => {
    const [productlist, setProductlist] = useState([]);
    const [loading, setLoading] = useState([true]);

    const fetchallproduct = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/all-inventproduct"
        );
        setProductlist(res.data.products);
        setLoading(false);
        // console.log(res);
    };

    useEffect(() => {
        fetchallproduct();
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
                    <h2>Add product </h2>
                    <Link
                        to={defaultRouteLink+"/add-product"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Product
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Pices Of Carton</th>
                                <th>Category AutoCode</th>
                                <th>Category Name</th>
                                <th>Warehouse Name</th>
                                <th>Sorting</th>
                                <th>Unit</th>
                                <th>Opening Stock</th>
                                <th>Reorder level</th>
                                <th>Buy Price</th>
                                <th>Cost</th>
                                <th>Selling Price</th>
                                <th>Price Type</th>
                                <th>Product Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productlist.map(function(item, index) {
                                // return <option value={item.id}> {item.product_name}</option>
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.product_code}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.pices_of_carton}</td>
                                        <td>{item.category_autocode}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.name}</td>
                                        <td>{item.sorting}</td>
                                        <td>{item.unit_name}</td>
                                        <td>{item.opening_stock}</td>
                                        <td>{item.reorder_level}</td>
                                        <td>{item.buy_price}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.selling_price}</td>
                                        {item.price_type == 1 ? (
                                            <td id="32">Customize Price</td>
                                        ) : (
                                            <td id="36">Fixed Price</td>
                                        )}
                                        <td>{item.product_image}</td>
                                        <td>
                                            <Link
                                                to={defaultRouteLink+`/edit-product/${item.id}`}
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

export default ManageProduct;
