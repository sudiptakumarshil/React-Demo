import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import { defaultRouteLink, dispatchEditAction } from "../../common/config";
import { Link, useParams } from "react-router-dom";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import { fetchalldata } from "../StoreInvoice/AddStoreInvoice";
import AddStoreInvoice from "../StoreInvoice/AddStoreInvoice";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
    SET_REFRESH_STORETRANSECTION,
    SET_CURRENT_USER,
    SET_CURRENT_USER_EXIST,
    SET_CURRENT_USER_NOT_FOUND
} from "../../actions/user_types";

import {
    getAccessTokenNameInfo,
    getAccessTokenName,
    getApiServerDashboard
} from "../../common/config";
import {
    getCookieKeyInfo,
    setCookie,
    removeCookie
} from "../../common/CookieService";
// import {defaultRouteLink,dispatchEditAction} from '../common/config';
const MyBulletListLoader = () => <BulletList />;

const EditInvoiceTransectionModal = props => {
    const [warehouselist, setWarehouselist] = useState([]);
    const [vendorlist, setvendorlist] = useState([]);
    const [storelist, setstorelist] = useState([]);
    const [productList, setproductList] = useState([]);
    const [invoiceParams, setinvoiceParams] = useState("");
    const [selected, setSelected] = useState([]);
    // invoiceParams: response.data.invoiceParams
    const { idx } = useParams();
    const dataObj = {
        product_id: 0,
        quantity: 1,
        price: 0,
        user_id:0,
        idx: "",
        isModalShow: false,
        modalData: {},
        closingStock: 0,
        discount_taka: 0,
        discount_percent: 0,
        pname: "",
        clossingStock: {}
    };
    const [formData, setFormData] = useState(dataObj);
    const dispatch = useDispatch();
    // invoice id ..
    let i_id = props.modalData.id;
    let closingstock = props.closingStock;
    // end invoice id

    let item_id = props.modalData.item_id;
    //console.log("item id="+item_id);
    // let c_id = props.modalData.c_id;

    const alldata = async () => {
        if (productList.length <= 0) {
            const idx = props.match.params.idx;
            let i_id = props.modalData.id;
            const response = await axios.get(
                defaultRouteLink + "/api/all-data",
                {
                    params: {
                        type: idx,
                        invoice_id: i_id
                    }
                }
            );

            setproductList(response.data.products);
            setinvoiceParams(response.data.invoiceParams);

            var isExist = response.data.products.find(
                item => item.id == item_id
            );
            var list = [];
            list.push(isExist);
            var data_set = JSON.stringify(list);
            // console.log(
            //     "test=" +
            //         JSON.stringify(isExist) +
            //         "," +
            //         JSON.stringify(productList)
            // );
            setSelected(isExist ? [isExist] : []);
        }
    };

    const updateinvoiceTransection = async event => {
        event.preventDefault();
        if (idx == 2 && parseInt(closingstock) < parseInt(formData.quantity)) {
            Swal.fire({
                title: "Quantity  Cannot Be Greater than closingStock!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (
            idx == 3 &&
            parseInt(closingstock) < parseInt(formData.quantity)
        ) {
            Swal.fire({
                title: "Quantity  Cannot Be Greater than closingStock!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (
            idx == 6 &&
            parseInt(closingstock) < parseInt(formData.quantity)
        ) {
            Swal.fire({
                title: "Quantity  Cannot Be Greater than closingStock!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (
            idx == 7 &&
            parseInt(closingstock) < parseInt(formData.quantity)
        ) {
            Swal.fire({
                title: "Quantity  Cannot Be Greater than closingStock!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else {
            let i_id = props.modalData.id;
            const idx = props.match.params.idx;
            const isLoginExit = getCookieKeyInfo(getAccessTokenName);
            const res = await axios.patch(
                defaultRouteLink + `/api/update-transecinvoice/${i_id}`,
                formData,
                {
                    params: {
                        invoice_id: i_id,
                        type: idx,
                        user_id: isLoginExit
                    }
                }
            );
            // for redux    .........  //
            // dispatch({
            //     type: SET_REFRESH_STORETRANSECTION,
            //     updateinvoiceTransection: res.data.products
            // });
            props.handleUpdate(res.data.products);
        }
    };

    // FOR GETTING PRODUCT WISE PRICE  ........
    const getProductWisePriceAuto = async p_id => {
        // console.log(productid);

        const response = await axios.get(
            defaultRouteLink + "/api/get-product-wise-price/" + p_id
        );

        if (
            typeof response.data.productPrice.selling_price != "undefined" &&
            typeof response.data.closing_stock[0].closing != "undefined"
        ) {
            setFormData(oldState => ({
                ...oldState,
                price: response.data.productPrice.selling_price
                // closingStock: response.data.closing_stock[0].closing
                // closingStock: response.data.plusClosingStock
            }));
        } else {
            setFormData(oldState => ({
                ...oldState,
                price: 0,
                closingStock: 0
            }));
        }
    };

    const handleProductPrice = e => {
        // alert("hello world")
        setSelected(e);

        if (typeof e[0] != "undefined") {
            // console.log("id",e[0].id);
            //     if (e[0].length > 0) {
            setFormData(oldState => ({
                ...oldState,
                product_id: e[0].id
            }));
            var id = e[0].id;
            getProductWisePriceAuto(id);
            //         console.log(id);
            //     }
        } else {
            console.log("sorry!!");
        }
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
        alldata().then(() => {});

        i_id = props.modalData.id;
        const idx = props.match.params.idx;
        const isLoginExit = getCookieKeyInfo(getAccessTokenName);
        console.log("user",isLoginExit)
        setFormData(oldState => ({
            ...oldState,
            idx: idx,
            product_id: item_id,
            user_id:isLoginExit
        }));
        getProductWisePriceAuto(props.modalData.item_id);
    }, [props]);

    // GET ALL PRODUCT LIST

    const products = productList.map(function(item, index) {
        return (
            <option selected={item_id == item.id} value={item.id}>
                {" "}
                {item.product_name}
            </option>
        );
    });

    if (props.show == true) {
        <MyBulletListLoader />;
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                fade={false}
                style={{ opacity: 1 }}
                size="lg"
            >
                <Modal.Header onClick={props.handleClose}>
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
                                            {invoiceParams.discount_method ==
                                            1 ? (
                                                <div class="card text-center mt-5">
                                                    <div class="card-header">
                                                        Default Store
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="container">
                                                            <div class="row">
                                                                <div className="col-md-3">
                                                                    <label className="control-label">
                                                                        Product
                                                                        Name
                                                                    </label>
                                                                    <Typeahead
                                                                        id="labelkey-example"
                                                                        labelKey={products =>
                                                                            `${products.product_name}`
                                                                        }
                                                                        key={product =>
                                                                            `${product.id}`
                                                                        }
                                                                        //    selected={formData.product_id}

                                                                        valueKey={
                                                                            formData.product_id
                                                                        }
                                                                        isValid={product =>
                                                                            `${product.id}`
                                                                        }
                                                                        options={
                                                                            productList
                                                                        }
                                                                        value={
                                                                            formData.product_id
                                                                        }
                                                                        name="product_id"
                                                                        onChange={e =>
                                                                            handleProductPrice(
                                                                                e
                                                                            )
                                                                        }
                                                                        selected={
                                                                            selected
                                                                        }
                                                                        placeholder="Select your product"
                                                                    />
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
                                                                {formData.idx ==
                                                                    6 ||
                                                                formData.idx ==
                                                                    7 ? (
                                                                    <td></td>
                                                                ) : (
                                                                    <>
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
                                                                                readOnly
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
                                                                                readOnly
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
                                                                    </>
                                                                )}

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
                                            ) : (
                                                <div class="card text-center mt-5">
                                                    <div class="card-header">
                                                        Default Store
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="container">
                                                            <div class="row">
                                                                <div className="col-md-3">
                                                                    <label className="control-label">
                                                                        Product
                                                                        Name
                                                                    </label>
                                                                    {/* <select
                                                                        className="form-control"
                                                                        data-live-search="true"
                                                                        name="product_id"
                                                                        value={
                                                                            formData.product_id
                                                                        }
                                                                        onChange={
                                                                            handleProductPrice
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            Choose
                                                                            One
                                                                        </option>
                                                                        {
                                                                            products
                                                                        }
                                                                    </select>
                                                                */}
                                                                    <Typeahead
                                                                        id="labelkey-example"
                                                                        labelKey={products =>
                                                                            `${products.product_name}`
                                                                        }
                                                                        key={product =>
                                                                            `${product.id}`
                                                                        }
                                                                        //    selected={formData.product_id}

                                                                        valueKey={
                                                                            formData.product_id
                                                                        }
                                                                        isValid={product =>
                                                                            `${product.id}`
                                                                        }
                                                                        options={
                                                                            productList
                                                                        }
                                                                        value={
                                                                            formData.product_id
                                                                        }
                                                                        name="product_id"
                                                                        onChange={e =>
                                                                            handleProductPrice(
                                                                                e
                                                                            )
                                                                        }
                                                                        selected={
                                                                            selected
                                                                        }
                                                                        placeholder="Select your product"
                                                                    />
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
                                                                {formData.idx ==
                                                                    6 ||
                                                                formData.idx ==
                                                                    7 ? (
                                                                    <td></td>
                                                                ) : (
                                                                    <>
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
                                                                    </>
                                                                )}

                                                                <div className="col-md-3">
                                                                    <label className="control-label"></label>
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        value={
                                                                            // formData.closingStock
                                                                            closingstock
                                                                        }
                                                                        // onChange={
                                                                        //     this
                                                                        //         .handleInput
                                                                        // }
                                                                        className="form-control"
                                                                        placeholder="Closing Stock"
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
                                            )}
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
                </Modal.Footer>
            </Modal>
        </>
    );
};

//   render(<EditInvoiceTransectionModal />);
export default EditInvoiceTransectionModal;
