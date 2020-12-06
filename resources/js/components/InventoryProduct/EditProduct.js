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
const EditProduct = props => {
    const [list, setList] = useState([]);
    // const [id, setid] = useState([]);
    const [warehouselist, setWarehouselist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productvalue] = useState([]);
    const [unitlist, setunitlist] = useState([]);

    const { pe_id } = useParams();

    // console.log("test="+pe_id);

    const data = {
        product_code: "",
        product_name: "",
        pices_of_carton: "",
        category_id: 0,
        category_name: "",
        warehouse_id: "",
        sorting: "",
        unit_id: 0,
        opening_stock: "",
        buy_price: "",
        cost: "",
        selling_price: "",
        price_type: "",
        product_image: "",
        unit_id: 0,
        status: 1
    };
    const [formData, setFormData] = useState(data);

    const id = 1;

    const SaveInventProduct = async event => {
        event.preventDefault();

        // const id = this.props.match.params.id;

        const res = await axios.patch(
            defaultRouteLink + `/api/update-inventproduct/${pe_id}`,
            formData
        );
        if (res.data.status === 200) {
            props.history.push(defaultRouteLink + "/manage-product");
        }
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
            title: "Product Updated  Successfully!!"
        });

        // const res = await axios.patch(
        //     "/dbBackup/api/update-inventproduct/${pe_id}",
        //     formData
        // );
        // setProduct_image(product_image)
    };

    const fetchallinventCategory = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/all-inventcategory"
        );

        setList(res.data.list);
        setLoading(false);
    };

    const fetchallwarehouse = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");

        setWarehouselist(response.data.warehouses);
        setunitlist(response.data.unitlist);
        // console.log(response.data.warehouses);
        setLoading(false);
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };
    const changephoto = event => {
        const file = event.target.files[0];
        if (file.size > 1048576) {
            alert("your image too long");
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                setFormData(oldState => ({
                    ...oldState,
                    product_image: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchproduct = async () => {
        //

        // const res = await axios.get(
        //     defaultRouteLink + "/api/edit-inventproduct/${pe_id}"
        // );

        const res = await axios.get(
            defaultRouteLink + `/api/edit-inventproduct/${pe_id}`
        );

        const products = res.data.product;
        setFormData(products);
    };

    useEffect(() => {
        let unmounted = false;
        fetchallinventCategory();
        fetchallwarehouse();
        fetchproduct();
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
        return (
            <option selected={formData.warehouse_id == item.id} value={item.id}>
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            warehouse_id: item.id
        }));
    });
    const unitlists = unitlist.map(function(item, index) {
        return (
            <option selected={formData.unit_id == item.id}>
                {" "}
                {item.unit_name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            unit_id: item.id
        }));
    });

    if (loading) {
        return <MyBulletListLoader />;
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit product </h2>
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
                                            value={formData.product_code}
                                            onChange={handleInput}
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
                                            required
                                            value={formData.product_name}
                                            onChange={handleInput}
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
                                            value={formData.pices_of_carton}
                                            onChange={handleInput}
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
                                            readOnly
                                            placeholder="Category Name"
                                            name="category_id"
                                            value={formData.category_name}
                                            data-id={formData.category_id}
                                            onChange={handleInput}
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
                                            value={formData.warehouse_id}
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
                                            value={formData.sorting}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="control-label">Unit</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="unit_id"
                                            onChange={handleInput}
                                        >
                                            <option value="0" selected>
                                                Choose One{" "}
                                            </option>
                                            {unitlists}
                                        </select>
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
                                            value={formData.opening_stock}
                                            onChange={handleInput}
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
                                            value={formData.buy_price}
                                            onChange={handleInput}
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
                                            value={formData.cost}
                                            onChange={handleInput}
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
                                            value={formData.selling_price}
                                            onChange={handleInput}
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
                            {/* <div className="row pt-3"> */}
                            <div className="col-md-4">
                                <label className="control-label">Status</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="status"
                                            onChange={handleInput}
                                        >
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            <option
                                                selected={formData.status == 1}
                                                value="1"
                                            >
                                                Active
                                            </option>
                                            <option
                                                selected={formData.status == 2}
                                                value="2"
                                            >
                                                Inactive
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className="col-md-4">
                                <label className="control-label">
                                    Image Upload
                                </label>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        onChange={changephoto}
                                        name="product_image"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                    ></input>
                                </div>
                                {/* {defaultRouteLink +
                                `/public/productImage/${formData.product_image}` ? (
                                    <img
                                        src={
                                            defaultRouteLink +
                                            `/public/productImage/${formData.product_image}`
                                        }
                                        height="80px"
                                        width="80px"
                                    />
                                ) : (
                                    <img
                                        src={formData.product_image}
                                        height="80px"
                                        width="80px"
                                    />
                                )} */}
                                <img
                                    src={
                                        defaultRouteLink +
                                        `/public/productImage/${formData.product_image}`
                                    }
                                    height="80px"
                                    width="80px"
                                />

                                {formData.product_image ? (
                                    <img
                                        src={formData.product_image}
                                        height="80px"
                                        width="80px"
                                    />
                                ) : (
                                    <td></td>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-lg-2"></label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <button className="btn btn-primary text-center">
                                        Update
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

export default EditProduct;
