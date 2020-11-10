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
        idx: "",
        isModalShow: false,
        modalData: {},
        closingStock: 0,
        discount_taka: 0,
        discount_percent: 0
    };
    const [formData, setFormData] = useState(dataObj);
    const dispatch = useDispatch();
    let i_id = props.modalData.id;
    let item_id = props.modalData.item_id;
    // let c_id = props.modalData.c_id;

    const alldata = async () => {
        const idx = props.match.params.idx;
        const response = await axios.get(defaultRouteLink + "/api/all-data", {
            params: {
                type: idx
            }
        });

        setproductList(response.data.products);
        setinvoiceParams(response.data.invoiceParams);


    };

    const updateinvoiceTransection = async event => {
        event.preventDefault();

        // if (parseFloat(formData.closingStock) < parseFloat(formData.quantity)) {
        //     Swal.fire({
        //         title: "Quantity  Cannot Be Greater than closingStock!!",
        //         showClass: {
        //             popup: "animate__animated animate__fadeInDown"
        //         },
        //         hideClass: {
        //             popup: "animate__animated animate__fadeOutUp"
        //         }
        //     });
        // }
        if (
            idx == 2 &&
            parseInt(formData.closingStock) < parseInt(formData.quantity)
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
            idx == 3 &&
            parseInt(formData.closingStock) < parseInt(formData.quantity)
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
            const res = await axios.patch(
                `/dbBackup/api/update-transecinvoice/${i_id}`,
                formData
            );
            // for redux    .........  //
            dispatch({
                type: SET_REFRESH_STORETRANSECTION,
                updateinvoiceTransection: res.data.products
            });
            props.handleClose();
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
                price: response.data.productPrice.selling_price,
                closingStock: response.data.closing_stock[0].closing
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

        console.log("onchange="+JSON.stringify(e));

        // const { name, value } = event.target;
        // getProductWisePriceAuto(event.target.value);
        // setFormData(oldState => ({
        //     ...oldState,
        //     [name]: value
        // }));

        // if (typeof e[0] != "undefined") {
        //     this.setState({ product_id: e[0].id });
        // }
        // console.log(e[0]); //true
        if (typeof e[0] != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                product_id: e[0].id
            }));
        }

        if (typeof e[0] != "undefined") {
            var id = e[0].id;
            getProductWisePriceAuto(id);
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

         alldata().then(() => {

            var isExist=productList.find(item => item.id == item_id);
            var list=[];
            list.push(isExist);
            var data_set=JSON.stringify(list);
            console.log("test="+[data_set]);
            setSelected(isExist ? [isExist] :[]);

          });



        i_id = props.modalData.id;
        const idx = props.match.params.idx;
        setFormData(oldState => ({
            ...oldState,
            idx: idx,
            product_id: item_id
        }));
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
                                                                        name="product_id"
                                                                        onChange={e =>
                                                                            handleProductPrice(
                                                                                e
                                                                            )
                                                                        }
                                                                        selected={selected}
                                                                        options={
                                                                            productList
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
                                                                    <label className="control-label"></label>
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        value={
                                                                            formData.closingStock
                                                                        }
                                                                        // onChange={
                                                                        //     this
                                                                        //         .handleInput
                                                                        // }
                                                                        className="form-control"
                                                                        placeholder="Closing Stock"
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
                                                                        selected={selected}
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
