import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
import EditInvoiceTransec from "../modal/EditInvoiceTransectionModal";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import TextField from "@material-ui/core/TextField";
import {
    Form,
    Button,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import { compose } from "redux";
import {
    MemoryRouter,
    HashRouter,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { updateStoreInvoice } from "../../actions/authActions";
import {
    SET_REFRESH_STORETRANSECTION,
    SET_CURRENT_USER,
    SET_CURRENT_USER_EXIST,
    SET_CURRENT_USER_NOT_FOUND
} from "../../actions/user_types";
// const dispatch=useDispatch();
const MyBulletListLoader = () => <BulletList />;
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
import { isEmpty, isFunction } from "lodash";
import { red } from "@material-ui/core/colors";

// const mapDispatch = {action};
class ReturnInvoice extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        const year = today.getFullYear();
        this.state = {
            warehouseList: [],
            invoicetransectionList: [],
            customerList: [],
            toggle: true,
            invoice_code: 0,
            remarks: "",
            warehouse_id: 0,
            vendor_id: "",
            vendorlist: [],
            date: year + "-" + month + "-" + date,
            store_id: "",
            storelist: [],
            gross_amount: "",
            discount_taka: 0,
            discount_percent: 0,
            final_discount_percent: "",
            cash_amount: 0,
            bank_account: "",
            bank_id: "",
            // customer_id: "",
            product_id: 0,
            productList: [],
            product: "",
            quantity: 1,
            price: 0,
            idx: "",
            user_id: "",
            isModalShow: false,
            modalData: {},
            vatList: [],
            vat_value: 0,
            bankdetailsList: [],
            cashamountList: [],
            vat_id: 0,
            loading: true,
            time: "",
            bankdetails_id: "",
            cashamount_id: "",
            // ----------------
            netAmount: 0,
            totalpriceQuantity: 0,
            totalpercent: 0,
            discountTaka: 0,
            totalVat: 0,
            netPayable: 0,
            vat: 0,
            bank_amount: 0,
            totalExchange: 0,
            total_discount: 0,
            delloading: false,
            barcode: 1,
            invoiceParams: "",
            editInvoice: [],
            invoice_id: 0,
            totalQty: 0,
            closingStock: 0,
            return_quantity: [],
            transec_id: []
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const idx = this.props.match.params.idx;
        const res = await axios.get(
            defaultRouteLink + "/api/edit-storeInvoice/" + id
        );
        const invoice = res.data.editinvoice;

        this.setState({
            warehouse_id: invoice.ware_id,
            vendor_id: invoice.vendor_id,
            date: invoice.date,
            store_id: invoice.store_id,
            storelist: res.data.store,
            invoice_id: this.props.match.params.id,
            idx: idx
        });

        const isLoginExit = getCookieKeyInfo(getAccessTokenName);
        this.setState({
            user_id: isLoginExit
        });
        // console.log("user id=" + isLoginExit);
        this.fetchalldata();
        // this.invoiceNumbers();
        // this.getinvoiceNumber();
        // this.editStoreInvoice();
    }

    // FOR GETTING WAREHOUSE WISE STORE
    get_warhousewiseStore = async wid => {
        let ware_id = wid;

        const response = await axios.get(
            defaultRouteLink + "/api/get-warehouse/" + ware_id
        );

        console.log(response.data.store);
        if (typeof response.data.store != "undefined") {
            this.setState({
                storelist: response.data.store
            });
        } else {
            this.setState({
                storelist: response.data.store
            });
        }
    };

    WarehousehandleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.get_warhousewiseStore(event.target.value);
    };

    // save invoice transection .......

    handleInput = event => {
        let values = [...this.state.values];
        this.setState({
            totalExchange: exchange,
            [event.target.name]: event.target.value
        });
    };
    handleCustomerInput = event => {
        this.setState({
            vendor_id: event.target.value
        });
    };

    handleChange(i, event) {
        //console.log("data="+event.target.value);
        //console.log("data3="+event.target.getAttribute("data-ref"));
        let obj = {
            qty: event.target.value,
            ref_id: event.target.getAttribute("data-ref"),
            ref_pid: event.target.getAttribute("data-pid")
        };
        let return_quantity = [...this.state.return_quantity];
        return_quantity[i] = obj;
        //let return_quantity = [...this.state.return_quantity,JSON.stringify(event)];
        console.log("data=" + i);
        //return_quantity[event.id] = event;
        this.setState({ return_quantity });
    }
    saveReturnStoreInvoice = async event => {
        // event.preventDefault();
        const idx = this.props.match.params.idx;

        if (idx == 1 && this.state.vendor_id == 0) {
            Swal.fire({
                title: "Vendor  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (idx == 2 && this.state.vendor_id == 0) {
            Swal.fire({
                title: "Vendor  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        }
        // else if (this.state.vendor_id == 0) {
        else if (idx == 3 && this.state.vendor_id == 0) {
            Swal.fire({
                title: "Customer  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (idx == 4 && this.state.vendor_id == 0) {
            Swal.fire({
                title: "Customer  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.warehouse_id == 0) {
            Swal.fire({
                title: "WareHouse   Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else {
            let check = confirm("are you sure ??");
            if (check) {
                const res = await axios.post(
                    defaultRouteLink + "/api/return-save-store-invoice",
                    this.state
                );

                // SUCCESS MESSAGE USING SWEET ALERT
                if (res.data.status === 200) {
                    this.props.history.push(
                        defaultRouteLink + "/manage-store-invoice"
                    );
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: toast => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        }
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Return Issue Invoices Created  Successfully!!"
                    });
                }
            } else {
                return false;
            }
        }
    };

    // for getting warehouse ,store ,product , vendor ,customer,vat....
    fetchalldata = async () => {
        const idx = this.props.match.params.idx;
        const invoice_id = this.props.match.params.id;
        const response = await axios.get(defaultRouteLink + "/api/all-data", {
            params: {
                type: 6,
                invoice_id: invoice_id,
                isRefIssue: 7
            }
        });

        if (response.data.status === 200) {
            this.setState({
                warehouseList: response.data.warehouses,
                vendorlist: response.data.vendors,
                productList: response.data.products,
                customerList: response.data.customer,
                invoicetransectionList: response.data.return_issue,
                invoiceParams: response.data.invoiceParams,
                invoice_code: response.data.invoice_number
            });

            // this.props.updateStoreInvoice(response.data.invotransec);
            this.props.updateStoreInvoice(response.data.returned_issues);

            this.setState({ loading: false });

            response.data.invotransec.map((item, index) => {});

            // dispatch({
            //     type:SET_REFRESH_STORETRANSECTION,
            //     data:{}
            // });
        }
    };

    handleBarcode = event => {
        let barcodeid = event.target.value;
        if (barcodeid == "0") {
            this.setState({
                barcode: 1
            });
        } else {
            this.setState({
                barcode: 0
            });
        }
    };

    // FOR DELETE INVOICES
    delinvoicetransec = async e => {
        const removeId = e.target.getAttribute("data-id");
        const response = await axios.get(
            defaultRouteLink + "/api/delete-invoice-transec/" + removeId,
            {
                params: {
                    type: idx,
                    invoice_id: this.props.match.params.id
                }
            }
        );
        this.setState({
            invoicetransectionList: response.data.invotransec
        });
        this.props.updateStoreInvoice(response.data.invotransec);
        // SUCCESS MESSAGE USING SWEET ALERT
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
                title: "Invoice Transection Deleted Successfully!!"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        }

        // this.fetchalldata();
    };
    handleModalClose = () => {
        this.setState({
            isModalShow: false
        });
    };
    handleProductEdit = async item_id => {
        this.setState({
            isModalShow: true
        });
        // editInvoiceTransection = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/edit-invoice-transec/" + item_id
        );
        this.setState({ modalData: response.data.invoice });

        // };
    };

    // for react live search ...
    filterBy = (option, state) => {
        if (state.selected.length) {
            return true;
        }
        return (
            option.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1
        );
    };

    ToggleButton = ({ isOpen, onClick }) => (
        <button
            className="toggle-button"
            onClick={onClick}
            onMouseDown={e => {
                // Prevent input from losing focus.
                e.preventDefault();
            }}
        ></button>
    );

    // end for live search
    render() {
        // console.log("product lsit="+this.state.data_p_list);
        // FETCH ALL WAREHOUSE DATA... LOOP
        let warhouses = this.state.warehouseList.map((item, index) => {
            return (
                <option
                    selected={this.state.warehouse_id == item.id}
                    value={item.id}
                    data-tokens="item.name"
                >
                    {item.name}
                </option>
            );
            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });
        // FETCH ALL VENDOR DATA... LOOP
        let customers = this.state.customerList.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return (
                <option
                    selected={this.state.vendor_id == item.id}
                    value={item.id}
                    data-tokens="item.name"
                >
                    {" "}
                    {item.name}
                </option>
            );

            this.setState({
                vendor_id: item.id // UPDATE STATE ..
            });
        });
        // FETCH ALL STORE DATA... LOOP
        let stores = this.state.storelist.map((item, index) => {
            return (
                <option
                    value={item.id}
                    selected={this.state.store_id == item.id}
                    data-tokens="item.name"
                >
                    {" "}
                    {item.store_name}
                </option>
            );

            this.setState({
                store_id: item.id // UPDATE STATE ..
            });
        });

        let TotalQuantity = 0;
        let allQuantity = 0;
        let qty;

        // FETCH ALL Invoice transection  DATA... LOOP
        // let invotransec = this.state.invoicetransectionList.map(
        let invotransec = this.props.data_p_list.map((item, index) => {
            const idx = this.props.match.params.idx;

            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <input
                            type="text"
                            placeholder="Return Quantity"
                            className="form-control"
                            name="return_quantity"
                            data-ref={item.id}
                            data-pid={item.pid}
                            // onChange={
                            //     this
                            //         .handleChange
                            // }
                            onChange={this.handleChange.bind(this, index)}
                        ></input>
                    </td>
                    <input type="hidden" value={(qty = item.quantity)}></input>
                    <input
                        type="hidden"
                        value={(allQuantity = TotalQuantity += qty)}
                    ></input>
                </tr>
            );
            this.setState({ transec_id: item.id });
        });

        const idx = this.props.match.params.idx;

        if (this.state.loading) {
            return (
                <MyBulletListLoader />
            );
        }

        return (
            <div>
                <EditInvoiceTransec
                    show={this.state.isModalShow}
                    modalData={this.state.modalData}
                    handleClose={this.handleModalClose}
                    {...this.props}
                />

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ marginTop: 30 }}>
                                <Link
                                    to={defaultRouteLink + `/new-purshase/${1}`}
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ marginLeft: 15 }}
                                >
                                    New Purshase
                                </Link>
                                <Link
                                    to={
                                        defaultRouteLink +
                                        `/purshase-return/${2}`
                                    }
                                    type="button"
                                    className="btn btn-info"
                                    style={{ marginLeft: 15 }}
                                >
                                    Purshase Return{" "}
                                </Link>
                                {/* <Link
                                    to={defaultRouteLink + `/sale-return/${3}`}
                                    type="button"
                                    className="btn btn-success"
                                    style={{ marginLeft: 15 }}
                                >
                                    Sale{" "}
                                </Link>
                                <Link
                                    to={defaultRouteLink + `/sale/${4}`}
                                    type="button"
                                    className="btn btn-warning"
                                    style={{ marginLeft: 15 }}
                                >
                                    Sale Return
                                </Link> */}
                                <Link
                                    to={defaultRouteLink + `/issue/${6}`}
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    style={{ marginLeft: 15 }}
                                >
                                    Issue
                                </Link>
                                <Link
                                    to={defaultRouteLink + `/issue-return/${7}`}
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{ marginLeft: 15 }}
                                >
                                    Issue Return
                                </Link>
                                <Link
                                    to={
                                        defaultRouteLink +
                                        `/manage-store-invoice`
                                    }
                                    type="button"
                                    className="btn btn-dark"
                                    style={{ marginLeft: 15 }}
                                >
                                    Manage Invoice
                                </Link>
                            </div>

                            <h2 className="text-center">Transaction</h2>
                            <div className="card text-center">
                                <div className="card-header">
                                    {"Return Issue"}
                                </div>
                                <div className="row pt-5">
                                    <div className="col-md-12">
                                        <div className="card-body">
                                            <span align="center"></span>
                                            <form
                                                onSubmit={
                                                    this.saveinvoiceTransection
                                                }
                                            >
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label className="control-label">
                                                                Invoice Number
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Invoice Code"
                                                                name="invoice_code"
                                                                readOnly
                                                                value={
                                                                    this.state
                                                                        .invoice_code
                                                                }
                                                                required
                                                                // onChange={
                                                                //     this.handleInput
                                                                // }
                                                            ></input>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="control-label">
                                                                Warehouse
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                className="form-control"
                                                                data-live-search="true"
                                                                data-width="fit"
                                                                name="warehouse_id"
                                                                onChange={
                                                                    this
                                                                        .WarehousehandleInput
                                                                }
                                                                required
                                                            >
                                                                <option value="0">
                                                                    Choose One
                                                                </option>
                                                                {warhouses}
                                                            </select>
                                                        </div>
                                                        {idx == 1 ||
                                                        idx == 2 ? (
                                                            <div className="col-md-2">
                                                                <label className="control-label">
                                                                    Vendor
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    data-live-search="true"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .vendor_id
                                                                    }
                                                                    name="vendor_id"
                                                                    onChange={
                                                                        this
                                                                            .handleInput
                                                                    }
                                                                >
                                                                    <option
                                                                        selected
                                                                        value="0"
                                                                    >
                                                                        Choose
                                                                        One
                                                                    </option>
                                                                    {vendors}
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <div className="col-md-2">
                                                                <label className="control-label">
                                                                    Customer
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    data-live-search="true"
                                                                    name="vendor_id"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .vendor_id
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleCustomerInput
                                                                    }
                                                                >
                                                                    <option
                                                                        selected
                                                                        value="0"
                                                                    >
                                                                        Choose
                                                                        One
                                                                    </option>
                                                                    {customers}
                                                                </select>
                                                            </div>
                                                        )}

                                                        <div className="col-md-2">
                                                            <label className="control-label">
                                                                Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                className="form-control"
                                                                name="date"
                                                                value={
                                                                    this.state
                                                                        .date
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            ></input>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="control-label">
                                                                Store
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                data-live-search="true"
                                                                name="store_id"
                                                                value={
                                                                    this.state
                                                                        .store_id
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            >
                                                                <option
                                                                    selected
                                                                    value="0"
                                                                >
                                                                    Choose One
                                                                </option>
                                                                {stores}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        {/* fetch all Invoice Transection */}
                                        <div class="card text-center mt-5">
                                            <div class="card-header">
                                                All Data
                                            </div>
                                            <div class="card-body">
                                                <div className="row">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <td>SL</td>
                                                                <td>
                                                                    Product Name
                                                                </td>
                                                                <td>
                                                                    Quantity
                                                                </td>
                                                                <td>
                                                                    Return
                                                                    Quantity
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {invotransec}

                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    Total
                                                                    Quantity ={" "}
                                                                    {
                                                                        TotalQuantity
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={
                                                                            this
                                                                                .saveReturnStoreInvoice
                                                                        }
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="card-footer text-muted"></div>
                                        </div>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// for redux configuration ..............
const mapStateToProps = state => {
    return {
        data_p_list: state.auth.invoicetransectionList
    };
};

export default connect(mapStateToProps, { updateStoreInvoice })(ReturnInvoice);
