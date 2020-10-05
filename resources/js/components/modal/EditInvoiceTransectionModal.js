import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import { defaultRouteLink } from "../../common/config";
import { Link, useParams } from "react-router-dom";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;

const EditInvoiceTransectionModal = props => {
    const [warehouselist, setWarehouselist] = useState([]);
    const [vendorlist, setvendorlist] = useState([]);
    const [storelist, setstorelist] = useState([]);
    const [productList, setproductList] = useState([]);
    const { idx } = useParams();
    console.log("test=" + idx);

    // const i_id = props.modalData.id;

    const alldata = {
        // warehouseList: [],
        invoicetransectionList: [],
        // customerList: [],
        toggle: true,
        invoice_code: "",
        remarks: "",
        warehouse_id: "",
        vendor_id: "",
        vendorlist: [],
        date: "",
        store_id: "",
        // storelist: [],
        gross_amount: "",
        discount_taka: "",
        discount_percent: "",
        cash_amount: "",
        bank_account: "",
        bank_id: "",
        customer_id: "",
        product_id: "",
        productList: [],
        quantity: "",
        price: "",
        idx: "",
        user_id: "",
        isModalShow: false,
        // modalData: {},
        i_id: ""
    };
    const [formData, setFormData] = useState(alldata);

    const fetchalldata = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");
        // console.log(response)
        console.log("test data" + response);
        setWarehouselist(response.data.warehouses);
        setvendorlist(response.data.vendors);
        setstorelist(response.data.stores);
        setproductList(response.data.products);
    };
    // setFormData(oldState => ({
    //     ...oldState,
    //     i_id: props.modalData.id,
    //     price: props.modalData.price,
    //     quantity: props.modalData.quantity
    // }));

    const updateinvoiceTransection = async event => {
        const i_id = props.modalData.id;

        event.preventDefault();
        const res = await axios.patch(
            `/dbBackup/api/update-transecinvoice/${i_id}`,
            formData
        );
    };

    const handleInput = event => {
        const { name, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));

        setFormData(oldState => ({
            ...oldState,
            i_id: props.modalData.id,
            price: props.modalData.price,
            quantity: props.modalData.quantity,
            date: props.modalData.date,
            discount_percent: props.modalData.discount_percent,
            discount_taka: props.modalData.discount_taka,
            idx: idx
        }));
    };

    useEffect(() => {
        fetchalldata();
    }, []);

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
        return <option value={item.id}> {item.product_name}</option>;

        setFormData(oldState => ({
            ...oldState,
            product_id: item.id
        }));
    });

    return (
        <>
            <Button variant="primary" onClick={props.handleShow}>
                Edit
            </Button>

            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                fade={false}
                style={{ opacity: 1 }}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Transaction</h2>
                            <div class="card text-center">
                                <div class="card-header"></div>
                                <div class="card-body">
                                    <form onSubmit={updateinvoiceTransection}>
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
                                                                onChange={
                                                                    handleInput
                                                                }
                                                            >
                                                                <option
                                                                    disabled
                                                                >
                                                                    Choose One
                                                                </option>
                                                                {products}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="control-label">
                                                                Quantity
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                name="quantity"
                                                                value={
                                                                    // props
                                                                    //     .modalData
                                                                    //     .quantity
                                                                    formData.quantity
                                                                }
                                                                className="form-control"
                                                                placeholder="Quantity"
                                                            ></input>

                                                            <input
                                                                type="hidden"
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                name="i_id"
                                                                value={
                                                                    // props
                                                                    //     .modalData
                                                                    //     .id
                                                                    formData.id
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
                                                                type="text"
                                                                name="price"
                                                                value={
                                                                    // props
                                                                    //     .modalData
                                                                    //     .price
                                                                    formData.price
                                                                }
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                className="form-control"
                                                                placeholder="Price"
                                                            ></input>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="control-label">
                                                                Discount Taka
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="discount_taka"
                                                                value={
                                                                    formData.discount_taka
                                                                }
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                className="form-control"
                                                                placeholder="Discount Taka"
                                                            ></input>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="control-label">
                                                                Discount Percent
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="discount_percent"
                                                                value={
                                                                    formData.discount_percent
                                                                }
                                                                onChange={
                                                                    handleInput
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
