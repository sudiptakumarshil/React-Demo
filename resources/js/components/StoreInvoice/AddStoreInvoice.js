import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
import EditInvoiceTransec from "../modal/EditInvoiceTransectionModal";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

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
class AddStoreInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseList: [],
            invoicetransectionList: [],
            customerList: [],
            toggle: true,
            invoice_code: [],
            remarks: "",
            warehouse_id: "",
            vendor_id: "",
            vendorlist: [],
            date: "",
            store_id: "",
            storelist: [],
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
            modalData: {},
            vatList: [],
            bankdetailsList: [],
            cashamountList: [],
            vat_id: "",
            loading: true,
            time: "",
            bankdetails_id: "",
            cashamount_id: ""
        };
    }

    async componentDidMount() {
        const idx = this.props.match.params.idx;
        const id = this.props.match.params.id;
        console.log(idx);

        this.setState({
            idx: idx
        });

        const isLoginExit = JSON.stringify(
            getCookieKeyInfo(getAccessTokenName)
        );
        this.setState({
            user_id: isLoginExit
        });
        console.log("user id=" + isLoginExit);
        this.fetchalldata();
        // this.invoiceNumbers();
        this.getinvoiceNumber();
    }

    // FOR GETTING WAREHOUSE WISE STORE
    get_warhousewiseStore = async () => {
        let ware_id = this.state.warehouse_id;
        // console.log(ware_id);

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
                storelist: []
            });
        }
    };
    // FOR GETTING PRODUCT WISE PRICE  ........
    getProductWisePriceAuto = async () => {
        let productid = this.state.product_id;

        const response = await axios.get(
            defaultRouteLink + "/api/get-product-wise-price/" + productid
        );
        // console.log(response.data.productPrice);

        if (typeof response.data.productPrice != "undefined") {
            this.setState({
                price: response.data.productPrice.selling_price
            });
        } else {
            this.setState({
                price: ""
            });
        }
    };

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.get_warhousewiseStore();
        this.getProductWisePriceAuto();
    };

    // save invoice transection .......

    saveinvoiceTransection = async event => {
        event.preventDefault();
        if (this.state.warehouse_id == 0) {
            Swal.fire({
                title: "WareHouse Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.vendor_id == 0) {
            Swal.fire({
                title: "Vendor  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.date == 0) {
            Swal.fire({
                title: "Date  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.store_id == 0) {
            Swal.fire({
                title: "Store  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.product_id == 0) {
            Swal.fire({
                title: "Product  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.quantity == 0) {
            Swal.fire({
                title: "Quantity  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else if (this.state.price == 0) {
            Swal.fire({
                title: "Price  Cannot Be Empty!!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } else {
            const res = await axios.post(
                "/dbBackup/api/save-storeinvoice",
                this.state
            );
            this.setState({
                // Invoice_code: "",
                remarks: "",
                // warehouse_id: [],
                // vendor_id: [],
                date: "",
                // store_id: [],
                discount_taka: "",
                discount_percent: "",
                cash_amount: "",
                bank_account: "",
                // product_id: "",
                quantity: "",
                price: ""
            });

            // dispatch({
            //     type:SET_REFRESH_STORETRANSECTION,
            //     updateinvoiceTransection:res.data
            // });

            this.fetchalldata();

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
                    title: "Store Created  Successfully!!"
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: "<a href>Why do I have this issue?</a>"
                });
            }
        }
    };

    // for getting warehouse ,store ,product , vendor ,customer,vat....
    fetchalldata = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");

        if (response.data.status === 200) {
            this.setState({
                warehouseList: response.data.warehouses,
                vendorlist: response.data.vendors,
                // storelist: response.data.stores,
                productList: response.data.products,
                customerList: response.data.customers,
                vatList: response.data.vats,
                invoicetransectionList: response.data.invotransec,
                bankdetailsList: response.data.bankdetails,
                cashamountList: response.data.cashaccount
            });

            this.props.updateStoreInvoice(response.data.invotransec);

            this.setState({ loading: false });
            // dispatch({
            //     type:SET_REFRESH_STORETRANSECTION,
            //     data:{}
            // });
        }
    };

    // FOR GETTING AUTO INVOICE NUMBER .............
    getinvoiceNumber = async () => {
        const idx = this.props.match.params.idx;

        if (idx == 1) {
            const response = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-1"
            );

            this.setState({ invoice_code: response.data.invoice_number });
        } else if (idx == 2) {
            const response2 = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-2"
            );

            this.setState({ invoice_code: response2.data.invoice_number });
        } else if (idx == 3) {
            const response3 = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-3"
            );
            this.setState({ invoice_code: response3.data.invoice_number });
        } else if (idx == 4) {
            const response4 = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-4"
            );
            this.setState({ invoice_code: response4.data.invoice_number });
        } else {
            console.log("ok");
        }
    };

    // FOR DELETE INVOICES
    delinvoicetransec = async e => {
        const removeId = e.target.getAttribute("data-id");
        const response = await axios.get(
            defaultRouteLink + "/api/delete-invoice-transec/" + removeId
        );
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

        this.fetchalldata();
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

    render() {
        // console.log("product lsit="+this.state.data_p_list);
        console.log("props=" + this.props.data_p_list);
        // FETCH ALL WAREHOUSE DATA... LOOP
        let warhouses = this.state.warehouseList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.name">
                    {item.name}
                </option>
            );
            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });
        // FETCH ALL VENDOR DATA... LOOP
        let vendors = this.state.vendorlist.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return (
                <option value={item.id} data-tokens="item.name">
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
                <option value={item.id} data-tokens="item.name">
                    {" "}
                    {item.store_name}
                </option>
            );

            this.setState({
                store_id: item.id // UPDATE STATE ..
            });
        });
        // this.props.addSearchProductList(response.data.product_list);
        // fetch all product data ......
        let products = this.state.productList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.product_name">
                    {item.product_name}
                </option>
            );
            this.setState({
                product_id: item.id, // UPDATE STATE ........
                price: item.selling_price
            });
        });
        // FETCH ALL CUSTOMER DATA... LOOP
        let customers = this.state.customerList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.name">
                    {item.name}
                </option>
            );
            this.setState({
                customer_id: item.id // UPDATE STATE ........
            });
        });

        let discounttaka;
        let totaldiscount;
        let totalpriceQuantity;
        let totalpercent;
        let totalvat;
        let vatcount;
        let alldiscounttaka = 0;
        let totalDiscountTaka = 0;
        let totalPercentTaka = 0;
        let totalGrossAmount = 0;
        let alltoTalQty = 0;
        let allTotalPrice = 0;
        let grossAmountToMinusDiscounttaka = 0;
        let allvattotal = 0;

        // FETCH ALL Invoice transection  DATA... LOOP
        // let invotransec = this.state.invoicetransectionList.map(
        let invotransec = this.props.data_p_list.map((item, index) => {
            const idx = this.props.match.params.idx;
            return (
                <tr>
                    <td>{index + 1}</td>

                    {item.dp_name != null ? (
                        <td>{item.dp_name}</td>
                    ) : (
                        <td>{item.cp_name}</td>
                    )}
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{(totalpriceQuantity = item.price * item.quantity)}</td>
                    <td>{item.discount_taka}</td>
                    <td>{item.discount_percent}</td>
                    <td>{item.vat_name}</td>
                    <td>{item.value}</td>
                    <input
                        type="hidden"
                        value={
                            (totalpercent =
                                (totalpriceQuantity * item.discount_percent) /
                                100)
                        }
                    ></input>
                    <input
                        type="hidden"
                        value={(discounttaka = item.discount_taka)}
                    ></input>
                    {/* start all discount percent and manually taka additionn */}
                    <input
                        type="hidden"
                        value={(totalPercentTaka += totalpercent)}
                    ></input>
                    <input
                        type="hidden"
                        value={(totalDiscountTaka += discounttaka)}
                    ></input>
                    {/* end all discount percent and manually taka additionn */}

                    {/* start all qty  and price and manually taka substruction */}
                    <input
                        type="hidden"
                        value={(alltoTalQty += totalpriceQuantity)}
                    ></input>

                    {/* end all qty  and price and manually taka substruction */}

                    {/* for all vat total */}


                    {/* end all vat total */}

                    <input
                        type="hidden"
                        value={(totaldiscount = totalpercent + discounttaka)}
                    ></input>

                    <input
                        type="hidden"
                        value={(totalvat = totalpriceQuantity - totaldiscount)}
                    ></input>

                    <input
                        type="hidden"
                        value={(vatcount = (totalvat * item.value) / 100)}
                    ></input>
                    <td>{totalvat + vatcount}</td>

                    <input type="hidden"
                    value={allvattotal+=vatcount}
                    >
                    </input>
                    <td>
                        <button
                            onClick={() => this.handleProductEdit(item.id)}
                            className="btn btn-primary"
                        >
                            Edit
                        </button>
                        <button
                            onClick={this.delinvoicetransec}
                            className="btn btn-primary"
                            data-id={item.id}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        // FETCH ALL VAT DATA... LOOP
        let allvat = this.state.vatList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.name">
                    {item.vat_name}
                </option>
            );
            this.setState({
                vat_id: item.id // UPDATE STATE ........
            });
        });
        // FETCH ALL BANK ACCOUNT LIST ... LOOP
        let allbanklist = this.state.bankdetailsList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.name">
                    {item.bank_name}
                </option>
            );
            this.setState({
                vat_id: item.id // UPDATE STATE ........
            });
        });
        // FETCH ALL CASH ACCOUNT DETAILS LIST ... LOOP
        let allaccountlist = this.state.cashamountList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.name">
                    {item.cash_name}
                </option>
            );
            this.setState({
                vat_id: item.id // UPDATE STATE ........
            });
        });

        const idx = this.props.match.params.idx;

        let pagetitle1 = "";
        if (idx == 1) {
            pagetitle1 = "NEW PURCHASE";
        } else if (idx == 2) {
            pagetitle1 = "PURSHASE RETURN";
        } else if (idx == 3) {
            pagetitle1 = "SALE RETURN";
        } else {
            pagetitle1 = "SALE";
        }
        if (this.state.loading) {
            return (
                <h2 className="text-center mt-3">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <MyBulletListLoader />
                </h2>
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
                            <h2 className="text-center">Transaction</h2>
                            <div class="card text-center">
                                <div class="card-header">{pagetitle1}</div>
                                <div class="card-body">
                                    <span align="center"></span>
                                    <form
                                        onSubmit={this.saveinvoiceTransection}
                                    >
                                        <div class="container">
                                            <div class="row">
                                                <div className="col-md-2">
                                                    <label className="control-label">
                                                        Invoice Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Invoice Code"
                                                        name="invoice_code"
                                                        disabled
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
                                                        // className="form-control selectpicker"
                                                        className="form-control"
                                                        data-live-search="true"
                                                        data-width="fit"
                                                        name="warehouse_id"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                        required
                                                    >
                                                        <option value="0">
                                                            Choose One
                                                        </option>
                                                        {warhouses}
                                                    </select>
                                                </div>
                                                {idx == 1 ? (
                                                    <div className="col-md-2">
                                                        <label className="control-label">
                                                            Vendor
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            // id="exampleFormControlSelect1"
                                                            // className="selectpicker"
                                                            data-live-search="true"
                                                            value={
                                                                this.state
                                                                    .vendor_id
                                                            }
                                                            name="vendor_id"
                                                            onChange={
                                                                this.handleInput
                                                            }
                                                        >
                                                            <option
                                                                selected
                                                                value="0"
                                                            >
                                                                Choose One
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
                                                            name="customer_id"
                                                            value={
                                                                this.state
                                                                    .customer_id
                                                            }
                                                            onChange={
                                                                this.handleInput
                                                            }
                                                        >
                                                            <option
                                                                selected
                                                                value="0"
                                                            >
                                                                Choose One
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
                                                        type="date"
                                                        className="form-control"
                                                        name="date"
                                                        value={this.state.date}
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">
                                                        Store
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        // className="selectpicker"
                                                        data-live-search="true"
                                                        // id="exampleFormControlSelect1"
                                                        name="store_id"
                                                        value={
                                                            this.state.store_id
                                                        }
                                                        onChange={
                                                            this.handleInput
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

                                        <div class="card text-center mt-5">
                                            <div class="card-header">
                                                Default Store
                                            </div>
                                            <div class="card-body">
                                                <div class="container">
                                                    <div class="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <select
                                                                className="form-control"
                                                                data-live-search="true"
                                                                name="product_id"
                                                                value={
                                                                    this.state
                                                                        .product_id
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
                                                                {products}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <input
                                                                type="text"
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                                name="quantity"
                                                                value={
                                                                    this.state
                                                                        .quantity
                                                                }
                                                                className="form-control"
                                                                placeholder="Quantity"
                                                            ></input>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <input
                                                                type="text"
                                                                name="price"
                                                                value={
                                                                    this.state
                                                                        .price
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                                className="form-control"
                                                                placeholder="Price"
                                                            ></input>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <input
                                                                type="text"
                                                                name="discount_taka"
                                                                value={
                                                                    this.state
                                                                        .discount_taka
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                                className="form-control"
                                                                placeholder="Discount Taka"
                                                            ></input>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <select
                                                                className="form-control"
                                                                data-live-search="true"
                                                                name="vat_id"
                                                                value={
                                                                    this.state
                                                                        .vat_id
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
                                                                    Vat
                                                                </option>
                                                                {allvat}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="control-label"></label>
                                                            <input
                                                                type="text"
                                                                name="discount_percent"
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                                className="form-control"
                                                                placeholder="Discount persent"
                                                            ></input>
                                                        </div>
                                                        {/* <button
                                                            type="submit"
                                                            class="btn btn-danger"
                                                        >
                                                            Submit
                                                        </button> */}
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

                    {/* fetch all Invoice Transection */}
                    <div class="card text-center mt-5">
                        <div class="card-header">All Data</div>
                        <div class="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td>SL</td>
                                        <td>Product Name</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td>Total</td>
                                        <td>Discount Taka</td>
                                        <td>Discount Percent </td>
                                        <td>Vat Name</td>
                                        <td>Vat Amount</td>
                                        <td>Net</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>{invotransec}</tbody>
                            </table>
                        </div>

                        <div class="card-footer text-muted"></div>
                    </div>

                    <div className="col-md-6 pt-5"></div>
                    <div className="col-md-6 pt-5">
                        <div className="row">
                            <div class="card">
                                <div class="card-header">Featured</div>
                                <div class="card-body">
                                <div className="col-md-4">
                                        <label className="control-label">
                                            Gross Amount
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            name="gross_amount"
                                            required
                                            value={alltoTalQty}
                                            onChange={this.handleInput}
                                        ></input>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Discount Taka
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            name="discount_taka"
                                            value={
                                                alldiscounttaka = totalDiscountTaka +
                                                totalPercentTaka
                                            }
                                            required
                                            onChange={this.handleInput}
                                        ></input>

                                        <input
                                            type="hidden"
                                            className="form-control"
                                            name="discount_taka"
                                            value={
                                                grossAmountToMinusDiscounttaka = alltoTalQty -alldiscounttaka
                                            }
                                            required
                                            onChange={this.handleInput}
                                        ></input>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Discount Percent
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="discount_percent"
                                            // value={allvattotal}
                                            required
                                            onChange={this.handleInput}
                                        ></input>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Total Vat
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            name="discount_taka"
                                            value={
                                                allvattotal
                                            }
                                            required
                                            onChange={this.handleInput}
                                        ></input>

                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Net Payable
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            name="discount_taka"
                                            value={
                                                (grossAmountToMinusDiscounttaka + allvattotal)
                                            }
                                            onChange={this.handleInput}
                                        ></input>

                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Cash Account
                                        </label>
                                        <select
                                            className="form-control"
                                            data-live-search="true"
                                            name="cashamount_id"
                                            value={this.state.cashamount_id}
                                            onChange={this.handleInput}
                                        >
                                            <option selected value="0">
                                                Choose One
                                            </option>
                                            {allaccountlist}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Cash Amount
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cash_amount"
                                            value={this.state.cash_amount}
                                            required
                                            onChange={this.handleInput}
                                        ></input>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Bank Account
                                        </label>
                                        <select
                                            className="form-control"
                                            data-live-search="true"
                                            name="bankdetails_id"
                                            value={this.state.bankdetails_id}
                                            onChange={this.handleInput}
                                        >
                                            <option selected value="0">
                                                Choose One
                                            </option>
                                            {allbanklist}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Remarks
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            value={this.state.remarks}
                                            required
                                            onChange={this.handleInput}
                                        ></textarea>
                                    </div>
                                    {/* <div className="col-md-4">
                                        <h3>Net Payable = {(grossAmountToMinusDiscounttaka + allvattotal)}</h3>
                                    </div> */}
                                </div>
                                <div class="card-footer text-muted"></div>
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

export default connect(mapStateToProps, { updateStoreInvoice })(
    AddStoreInvoice
);
