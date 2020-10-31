import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import { defaultRouteLink, dispatchEditAction } from "../../common/config";
import { Link, useParams } from "react-router-dom";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import { fetchalldata } from "../StoreInvoice/AddStoreInvoice";
import AddStoreInvoice from "../StoreInvoice/AddStoreInvoice";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import {
    SET_REFRESH_STORETRANSECTION,
    SET_CURRENT_USER,
    SET_CURRENT_USER_EXIST,
    SET_CURRENT_USER_NOT_FOUND
} from "../../actions/user_types";

// import {defaultRouteLink,dispatchEditAction} from '../common/config';
const MyBulletListLoader = () => <BulletList />;

const EditInvoiceTransectionModal = props => {
    const [warehouselist, setWarehouselist] = useState([]);
    const [vendorlist, setvendorlist] = useState([]);
    const [storelist, setstorelist] = useState([]);
    const [productList, setproductList] = useState([]);
    const dataObj = {};
    const [formData, setFormData] = useState(dataObj);
    const dispatch = useDispatch();
    let i_id = props.modalData.id;
    let item_id = props.modalData.d_id;
    // const [product_id, setproduct_id] = useState([0]);
    // console.log("tester", productid);

    //console.log("test fdata55=" + JSON.stringify(formData));
    // const i_id = props.modalData.id;
    // console.log(props.modalData.quantity+","+JSON.stringify(formData));

    const alldata = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");
        setproductList(response.data.products);
    };

    // setFormData(oldState => ({
    //     ...oldState,
    //     i_id: props.modalData.id,
    //     price: props.modalData.price,
    //     quantity: props.modalData.quantity
    // }));

    const updateinvoiceTransection = async event => {
        event.preventDefault();
        const res = await axios.patch(
            `/dbBackup/api/update-transecinvoice/${i_id}`,
            formData
        );

        // props.action
        //  console.log("log333="+JSON.stringify(res.data));
        dispatch({
            type: SET_REFRESH_STORETRANSECTION,
            updateinvoiceTransection: res.data.products
        });
        props.handleClose();
    };

    // FOR GETTING PRODUCT WISE PRICE  ........
    const getProductWisePriceAuto = async p_id => {
        // console.log(productid);

        const response = await axios.get(
            defaultRouteLink + "/api/get-product-wise-price/" + p_id
        );

        if (typeof response.data.productPrice.selling_price != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                price: response.data.productPrice.selling_price
            }));
        } else {
            setFormData(oldState => ({
                ...oldState,
                price: 0
            }));
        }
    };

    const handleProductPrice = event => {
        const { name, value } = event.target;
        getProductWisePriceAuto(event.target.value);
    };

    const handleInputs = event => {
        const { name, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));

        /*setFormData(oldState => ({
            ...oldState,
            i_id: props.modalData.id,
            price: props.modalData.price,
            quantity: props.modalData.quantity,
            date: props.modalData.date,
            discount_percent: props.modalData.discount_percent,
            discount_taka: props.modalData.discount_taka,
            idx: idx
        }));*/
    };
    useEffect(() => {
        setFormData(props.modalData);
        alldata();
        i_id = props.modalData.id;
        const idx = props.match.params.idx;
        setFormData(oldState => ({
            ...oldState,
            idx: idx
        }));

    }, [props]);

    // GET ALL WAREHOUSE LIST FROM (ware_house_details) TABLE

    const warhouses = warehouselist.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;

        setFormData(oldState => ({
            ...oldState,
            warehouse_id: item.id
        }));
    });

    // GET ALL VENDOR LIST

    const vendors = vendorlist.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;

        setFormData(oldState => ({
            ...oldState,
            vendor_id: item.id
        }));
    });
    // GET ALL STORE LIST

    const stores = storelist.map(function(item, index) {
        return <option value={item.id}> {item.store_name}</option>;

        setFormData(oldState => ({
            ...oldState,
            store_id: item.id
        }));
    });

    // GET ALL PRODUCT LIST

    const products = productList.map(function(item, index) {
        return (
            <option selected={item_id == item.id} value={item.id}>
                {" "}
                {item.product_name}
            </option>
        );
        // console.log(item.id);
        setFormData(oldState => ({
            ...oldState,
            product_id:item.id
        }));
        // setproduct_id(item.id);
    });
    if (props.show == true) {
        <MyBulletListLoader />;
    }

    return (
        <>
            {/* <Button variant="primary" onClick={props.handleShow}>

            </Button> */}
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                fade={false}
                style={{ opacity: 1 }}
                size="lg"
                onHide={close}
                // saveModalDetails={saveModalDetails}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productList.length < 0 ? (
                        <MyBulletListLoader />
                    ) : (
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center">Transaction</h2>
                                <div class="card text-center">
                                    <div class="card-header"></div>
                                    <div class="card-body">
                                        <form
                                            onSubmit={updateinvoiceTransection}
                                        >
                                            <div class="card text-center mt-5">
                                                <div class="card-header">
                                                    Default Store
                                                </div>
                                                <div class="card-body">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div className="col-md-3">
                                                                <label className="control-label">
                                                                    Product Name
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    data-live-search="true"
                                                                    name="product_id"
                                                                    // value={
                                                                    //     formData.product_id
                                                                    // }
                                                                    onChange={
                                                                        handleProductPrice
                                                                    }
                                                                >
                                                                    <option value="0">
                                                                        Choose
                                                                        One
                                                                    </option>
                                                                    {products}
                                                                </select>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="control-label">
                                                                    Quantity
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    onChange={
                                                                        handleInputs
                                                                    }
                                                                    name="quantity"
                                                                    value={
                                                                        formData.quantity
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Quantity"
                                                                ></input>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label className="control-label">
                                                                    Price
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="price"
                                                                    onChange={
                                                                        handleInputs
                                                                    }
                                                                    value={
                                                                        // props
                                                                        //     .modalData
                                                                        //     .price
                                                                        formData.price
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Price"
                                                                ></input>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="control-label">
                                                                    Discount
                                                                    Taka
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="discount_taka"
                                                                    onChange={
                                                                        handleInputs
                                                                    }
                                                                    value={
                                                                        formData.discount_taka
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Discount Taka"
                                                                ></input>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label className="control-label">
                                                                    Discount
                                                                    Percent
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="discount_percent"
                                                                    onChange={
                                                                        handleInputs
                                                                    }
                                                                    value={
                                                                        formData.discount_percent
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Discount Percent"
                                                                ></input>
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                class="btn btn-danger"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="card-footer text-muted"></div>
                                            </div>
                                        </form>
                                    </div>

                                    <div class="card-footer text-muted"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

//   render(<EditInvoiceTransectionModal />);
export default EditInvoiceTransectionModal;
