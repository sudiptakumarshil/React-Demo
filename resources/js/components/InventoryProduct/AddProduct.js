import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";

const AddProduct = props => {
    const [list, setList] = useState([]);
    const [warehouselist, setWarehouselist] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [category_name, setCategory_name] = useState([]);
    const data = {
        product_code: "",
        product_name: "",
        pices_of_carton: "",
        category_id: "",
        category_name: "",
        warehouse_id: "",
        sorting: "",
        unit: "",
        opening_stock: "",
        buy_price: "",
        cost: "",
        selling_price: "",
        price_type: "",
        product_image: ""
    };
    const [formData, setFormData] = useState(data);

    const SaveInventProduct = async event => {
        event.preventDefault();

        const res = await axios.post(
            "/dbBackup/api/save-inventproduct",
            formData
        );

        try {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: toast => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: "success",
                title: "Product Saved  Successfully!!"
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchallinventCategory = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/all-inventcategory"
        );

        setList(res.data.list);
        setLoading(false);
    };

    const fetchallwarehouse = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-warehouse"
        );

        setWarehouselist(response.data.warehouses);
        console.log(response.data.warehouses);
        setLoading(false);
    };

    const handleInput = event => {
        //this.setState({ [event.target.name]: event.target.value });
        //console.log(event.target.value);
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
            // [files]: value
        }));
        // setFormData(oldState => ({ ...oldState, [name]: files }));
    };

    useEffect(() => {
        fetchallinventCategory();
        fetchallwarehouse();
    }, []);

    const renderTree = nodes => (
        <TreeItem
            data-id={nodes.id}
            key={nodes.id}
            nodeId={nodes.id}
            label={renderLabel(nodes)}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map(node => renderTree(node))
                : null}
        </TreeItem>
    );

    const renderLabel = item => (
        <span
            onClick={event => {
                // console.log(item.id)

                setFormData(oldState => ({
                    ...oldState,
                    category_id: item.id,
                    category_name: item.name
                }));
                // setInvent_category(item.name);
                // setRoot_name(item.root_category);
                // setid(item.id);
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {item.name}
        </span>
    );

    const handleNodeData = data => {
        console.log("test=" + event);
    };

    const warhouses = warehouselist.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            warehouse_id: item.id
        }));
    });

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Add product </h2>
                    <form
                        onSubmit={SaveInventProduct}
                        enctype="multipart/form-data"
                    >
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Product Code
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Product Code"
                                            name="product_code"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="control-label">Name</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Product Name"
                                            name="product_name"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="control-label">
                                    Pices of Carton
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pices of Carton"
                                            name="pices_of_carton"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Category Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Category Name"
                                            name="category_id"
                                            value={formData.category_name}
                                            data-id={formData.category_id}
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Warehouse
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="warehouse_id"
                                            onChange={handleInput}
                                        >
                                            {warhouses}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">Sorting</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Sorting"
                                            name="sorting"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">Unit</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Unit"
                                            name="unit"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Opening Stock
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Opening Stock"
                                            name="opening_stock"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Buy Price
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buy Price"
                                            name="buy_price"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">Cost</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cost"
                                            name="cost"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Selling Price
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Selling Price"
                                            name="selling_price"
                                            onChange={handleInput}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Price Type
                                </label>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        name="price_type"
                                        onChange={handleInput}
                                    >
                                        <option value="1">
                                            Customize Price
                                        </option>
                                        <option value="2">Fixed Price</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">
                                    Image Upload
                                </label>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        onChange={handleInput}
                                        name="product_image"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-lg-2"></label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <button className="btn btn-primary text-center">
                                        save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    {list.map(item => {
                        return (
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpanded={["root"]}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
                                {renderTree(item)}
                            </TreeView>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
