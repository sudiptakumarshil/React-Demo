import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
import EditInvoiceTransec from "../modal/EditInvoiceTransectionModal";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import TextField from "@material-ui/core/TextField";

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
class IssueStoreInvoice extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        const year = today.getFullYear();

        // const dateStr = date + "/" + month + "/" + year;

        this.state = {
            warehouseList: [],
            invoicetransectionList: [],
            customerList: [],
            invoice_id: 0,
            toggle: true,
            invoice_code: 0,
            remarks: "",
            warehouse_id: 1,
            vendor_id: 1,
            vendorlist: [],
            date: year + "-" + month + "-" + date,
            store_id: 1,
            storelist: [],
            gross_amount: "",
            discount_taka: 0,
            discount_percent: 0,
            final_discount_percent: "",
            cash_amount: 0,
            bank_account: "",
            bank_id: "",
            customer_id: 2,
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
            invoiceParams: "",
            total_discount: 0,
            editInvoice: [],
            delloading: false,
            barcode: 0,
            closingStock: 0,
            totalQuantity: 0
            // items_id:0
            //----------------
        };
    }

    async componentDidMount() {
        const idx = this.props.match.params.idx;
        let invotransec = this.props.data_p_list.map((item, index) => {
            const idx = this.props.match.params.idx;
            let qty;
            let allQuantity;
            let TotalQuantity;
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <input type="hidden" value={(qty = item.quantity)}></input>
                    <input
                        type="hidden"
                        value={(allQuantity = TotalQuantity += qty)}
                    ></input>
                </tr>
            );
        });
        this.setState({
            idx: idx
        });

        const isLoginExit = getCookieKeyInfo(getAccessTokenName);
        this.setState({
            user_id: isLoginExit
        });
        this.fetchalldata();
    }

    // FOR GETTING WAREHOUSE WISE STORE
    get_warhousewiseStore = async wid => {
        let ware_id = wid;
        // let ware_id = this.state.warehouse_id;
        // console.log(ware_id);

        const response = await axios.get(
            defaultRouteLink + "/api/get-warehouse/" + ware_id
        );
        // console.log(response.data.store);
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

    // GET  STORE INVOICE ---
    editStoreInvoice = async () => {
        const id = props.match.params.id;
        const res = await axios.get(
            defaultRouteLink + "/api/edit-storeInvoice/" + id
        );
        // const invoice = res.data.editinvoice;
        this.setState({
            editInvoice: res.data.editinvoice,
            idx: res.data.editinvoice.type
        });
        // setLoading(false);
    };

    // FOR GETTING PRODUCT WISE PRICE  ........
    getProductWisePriceAuto = async pid => {
        let productid = pid;
        // console.log(productid);

        const response = await axios.get(
            defaultRouteLink + "/api/get-product-wise-price/" + productid
        );
        // console.log(response.data.productPrice);

        if (
            typeof response.data.productPrice != "undefined" &&
            typeof response.data.closing_stock[0].closing != "undefined"
        ) {
            this.setState({
                product: response.data.productPrice,
                price: response.data.productPrice.selling_price,
                closingStock: response.data.closing_stock[0].closing
            });
        } else {
            this.setState({
                price: 0,
                closingStock: 0
            });
        }
    };
    // priceHandleInput = () => {
    //     this.setState({ [event.target.name]: event.target.value });
    //     this.getProductWisePriceAuto(event.target.value);
    // };

    QuickPurshaseInvoiceTransec = async event => {
        // event.preventDefault();
        const idx = this.props.match.params.idx;

        const res = await axios.post(
            defaultRouteLink + "/api/save-storeinvoice",
            this.state,
            {
                params: {
                    type: idx,
                    invoice_id: 0
                }
            }
        );

        this.setState({
            discount_taka: 0,
            discount_percent: 0,
            quantity: 1,
            invoicetransectionList: res.data.invotransec
        });
        this.props.updateStoreInvoice(res.data.invotransec);
        // dispatch({
        //     type:SET_REFRESH_STORETRANSECTION,
        //     updateinvoiceTransection:res.data
        // });
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
    };

    handleProductName = async event => {
        let pro_code = event.target.value;

        const res = await axios.get(
            defaultRouteLink + "/api/get-productCode/",
            {
                params: {
                    product_code: pro_code
                }
            }
        );
        if (res.data.status == 200) {
            this.setState({
                price: res.data.productCode.selling_price,
                product_id: res.data.productCode.id,
                store_id: 1,
                warehouse_id: 1,
                vendor_id: 1,
                quantity: 1
            });
            this.QuickPurshaseInvoiceTransec();
        }

        // console.log(res.data.productCode.selling_price);
    };

    priceHandleInput = e => {
        // console.log(e[0].id);
        if (typeof e[0] != "undefined") {
            this.setState({ product_id: e[0].id });
        }
        // console.log(e[0]); //true
        if (typeof e[0] != "undefined") {
            //var arr=e.isArray(e);
            //console.log("log"+arr);
            var id = e[0].id;
            this.getProductWisePriceAuto(id);
        }
    };

    WarehousehandleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.get_warhousewiseStore(event.target.value);
    };

    handleBarcode = event => {
        let barcodeid = event.target.value;
        // console.log(barcodeid);
        if (barcodeid == "0") {
            // console.log("state");
            this.setState({
                barcode: 1
            });
        } else {
            this.setState({
                barcode: 0
            });
        }
        // this.searchInput.current.focus();
    };

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // save invoice transection .......
    saveinvoiceTransection = async event => {
        event.preventDefault();
        const idx = this.props.match.params.idx;

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
        } else if (idx == 1 && this.state.vendor_id == 0) {
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
        } else if (
            idx == 6 &&
            parseInt(this.state.closingStock) < parseInt(this.state.quantity)
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
            parseInt(this.state.closingStock) < parseInt(this.state.quantity)
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
        }
        //     Swal.fire({
        //         title: "Vendor  Cannot Be Empty!!",
        //         showClass: {
        //             popup: "animate__animated animate__fadeInDown"
        //         },
        //         hideClass: {
        //             popup: "animate__animated animate__fadeOutUp"
        //         }
        //     });
        // }
        else if (this.state.date == 0) {
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
        } else if (
            idx == 2 &&
            parseInt(this.state.closingStock) < parseInt(this.state.quantity)
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
            parseInt(this.state.closingStock) < parseInt(this.state.quantity)
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
            const res = await axios.post(
                defaultRouteLink + "/api/save-storeinvoice",
                this.state,
                {
                    params: {
                        type: idx,
                        invoice_id: 0
                    }
                }
            );
            this.props.updateStoreInvoice(res.data.invotransec);
            this.setState({
                invoicetransectionList: res.data.invotransec
            });

            // dispatch({
            //     type:SET_REFRESH_STORETRANSECTION,
            //     updateinvoiceTransection:res.data
            // });

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

    saveStoreInvoice = async event => {
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
        } else if (this.state.price == null) {
            Swal.fire({
                title: "Price Cannot Be Empty!!",
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
                this.state.totalQuantity = this.props.tqty;
                const res = await axios.post(
                    defaultRouteLink + "/api/save-store-invoice",
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
                        title: "Store Invoices Created  Successfully!!"
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

        const response = await axios.get(defaultRouteLink + "/api/all-data", {
            params: {
                type: idx,
                invoice_id: 0
            }
        });

        if (response.data.status === 200) {
            this.setState({
                warehouseList: response.data.warehouses,
                vendorlist: response.data.vendors,
                // storelist: response.data.stores,
                productList: response.data.products,
                customerList: response.data.customer,
                vatList: response.data.vats,
                invoicetransectionList: response.data.invotransec,
                bankdetailsList: response.data.bankdetails,
                cashamountList: response.data.cashaccount,
                invoiceParams: response.data.invoiceParams
            });
            let tqty = 0;
            response.data.invotransec.map((item, index) => {
                tqty = parseFloat(tqty) + parseFloat(item.quantity);
            });
            this.setState({ loading: false, totalQuantity: tqty });
            this.props.updateStoreInvoice(response.data.invotransec);

            // dispatch({
            //     type:SET_REFRESH_STORETRANSECTION,
            //     data:{}
            // });
        }
    };

    // FOR GETTING AUTO INVOICE NUMBER .............
    getinvoiceNumber = async () => {
        const idx = this.props.match.params.idx;
        if (idx == 6) {
            const response = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-6"
            );
            this.setState({ invoice_code: response.data.invoice_number });
        } else if (idx == 7) {
            const response = await axios.get(
                defaultRouteLink + "/api/get-invoice-number-type-7"
            );
            this.setState({ invoice_code: response.data.invoice_number });
        }
    };

    // FOR DELETE INVOICES TRANSECTION
    delinvoicetransec = async e => {
        this.setState({
            delloading: true
        });

        let delcheck = confirm("Are you Sure to Delete It?");
        if (delcheck) {
            const idx = this.props.match.params.idx;
            const removeId = e.target.getAttribute("data-id");
            const response = await axios.get(
                defaultRouteLink + "/api/delete-invoice-transec/" + removeId,
                {
                    params: {
                        type: idx,
                        invoice_id: 0
                    }
                }
            );
            this.setState({
                delloading: false,
                invoicetransectionList: response.data.invotransec
            });
            this.props.updateStoreInvoice(response.data.invotransec);
        } else {
            return false;
        }
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
        // console.log("props=" + this.props.data_p_list);
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
        let vendors = this.state.vendorlist.map((item, index) => {
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
                    selected={this.state.store_id == item.id}
                    value={item.id}
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
                <option
                    selected={this.state.customer_id == item.id}
                    value={item.id}
                    data-tokens="item.name"
                >
                    {item.name}
                </option>
            );
            this.setState({
                customer_id: item.id // UPDATE STATE ........
                // gross_amount:alltoTalQty
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
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <input type="hidden" value={(qty = item.quantity)}></input>
                    <input
                        type="hidden"
                        value={(allQuantity = TotalQuantity += qty)}
                    ></input>

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
            this.setState({
                totalQuantity: allQuantity
            });
        });

        const idx = this.props.match.params.idx;

        let pagetitle1 = "";
        if (idx == 6) {
            pagetitle1 = "ISSUE";
        } else if (idx == 7) {
            pagetitle1 = "ISSUE RETURN";
        }
        if (this.state.loading) {
            return (
                <h2 className="text-center mt-3">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <MyBulletListLoader />
                </h2>
            );
        }
        if (this.state.delloading) {
            return (
                <h2 className="text-center mt-3">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    {/* <MyBulletListLoader /> */}
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
                                <div className="card-header">{pagetitle1}</div>
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
                                                                // className="form-control selectpicker"
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
                                                                    // id="exampleFormControlSelect1"
                                                                    // className="selectpicker"
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
                                                                    name="customer_id"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .customer_id
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
                                                                // className="selectpicker"
                                                                data-live-search="true"
                                                                // id="exampleFormControlSelect1"
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

                                                {this.state.invoiceParams
                                                    .discount_method == 1 ? (
                                                    <div className="card text-center mt-5">
                                                        <div className="card-header">
                                                            Default Store
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="barcode"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .barcode
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleBarcode
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .barcode
                                                                            }
                                                                        />
                                                                        {""}
                                                                        BarCode
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        {this
                                                                            .state
                                                                            .barcode ==
                                                                        1 ? (
                                                                            <div className="form-group">
                                                                                <label className="control-label">
                                                                                    Product
                                                                                    Code
                                                                                </label>

                                                                                <input
                                                                                    type="text"
                                                                                    name="product_name"
                                                                                    ref={
                                                                                        this
                                                                                            .searchInput
                                                                                    }
                                                                                    className="form-control"
                                                                                    onKeyUp={
                                                                                        this
                                                                                            .handleProductName
                                                                                    }
                                                                                ></input>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="">
                                                                                <label className="control-label">
                                                                                    Product
                                                                                    Name
                                                                                </label>

                                                                                <Typeahead
                                                                                    id="labelkey-example"
                                                                                    labelKey={products =>
                                                                                        `${products.product_name}`
                                                                                    }
                                                                                    options={
                                                                                        this
                                                                                            .state
                                                                                            .productList
                                                                                    }
                                                                                    value={
                                                                                        this
                                                                                            .state
                                                                                            .product_id
                                                                                    }
                                                                                    name="product_id"
                                                                                    onChange={e =>
                                                                                        this.priceHandleInput(
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                    placeholder="Select your product"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {this.state
                                                                        .product
                                                                        .price_type ==
                                                                    2 ? (
                                                                        <div className="col-md-3">
                                                                            <label className="control-label">
                                                                                Product
                                                                                Price
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                name="price"
                                                                                readOnly
                                                                                value={
                                                                                    this
                                                                                        .state
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
                                                                    ) : (
                                                                        <div className="col-md-3">
                                                                            <label className="control-label">
                                                                                Product
                                                                                Price
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                name="price"
                                                                                required
                                                                                value={
                                                                                    this
                                                                                        .state
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
                                                                    )}
                                                                    <div className="col-md-3">
                                                                        <label className="control-label">
                                                                            Closing
                                                                            Stock
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            readOnly
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .closingStock
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
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            onChange={
                                                                                this
                                                                                    .handleInput
                                                                            }
                                                                            name="quantity"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .quantity
                                                                            }
                                                                            className="form-control"
                                                                            placeholder="Quantity"
                                                                        ></input>
                                                                    </div>
                                                                    <button
                                                                        type="submit"
                                                                        class="btn btn-danger "
                                                                        style={{
                                                                            marginTop: 80
                                                                        }}
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="card-footer text-muted"></div>
                                                    </div>
                                                ) : (
                                                    <div className="card text-center mt-5">
                                                        <div className="card-header">
                                                            Default Store
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="barcode"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .barcode
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleBarcode
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .barcode
                                                                            }
                                                                        />
                                                                        {""}
                                                                        BarCode
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        {this
                                                                            .state
                                                                            .barcode ==
                                                                        1 ? (
                                                                            <div className="form-group">
                                                                                <label className="control-label">
                                                                                    Product
                                                                                    Code
                                                                                </label>

                                                                                <input
                                                                                    type="text"
                                                                                    name="product_name"
                                                                                    ref={
                                                                                        this
                                                                                            .searchInput
                                                                                    }
                                                                                    className="form-control"
                                                                                    onKeyUp={
                                                                                        this
                                                                                            .handleProductName
                                                                                    }
                                                                                ></input>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="">
                                                                                <label className="control-label">
                                                                                    Product
                                                                                    Name
                                                                                </label>

                                                                                <Typeahead
                                                                                    id="labelkey-example"
                                                                                    labelKey={products =>
                                                                                        `${products.product_name}`
                                                                                    }
                                                                                    options={
                                                                                        this
                                                                                            .state
                                                                                            .productList
                                                                                    }
                                                                                    value={
                                                                                        this
                                                                                            .state
                                                                                            .product_id
                                                                                    }
                                                                                    name="product_id"
                                                                                    onChange={e =>
                                                                                        this.priceHandleInput(
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                    placeholder="Select your product"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className="col-md-2">
                                                                        <label className="control-label">
                                                                            Closing
                                                                            Stock
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            readOnly
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .closingStock
                                                                            }
                                                                            // onChange={
                                                                            //     this
                                                                            //         .handleInput
                                                                            // }
                                                                            className="form-control"
                                                                            placeholder="Closing Stock"
                                                                        ></input>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <label className="control-label">
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            onChange={
                                                                                this
                                                                                    .handleInput
                                                                            }
                                                                            name="quantity"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .quantity
                                                                            }
                                                                            className="form-control"
                                                                            placeholder="Quantity"
                                                                        ></input>
                                                                    </div>
                                                                    <button
                                                                        type="submit"
                                                                        class="btn btn-danger "
                                                                        style={{
                                                                            marginTop: 80
                                                                        }}
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

                                        {/* fetch all Invoice Transection */}
                                        <div class="card text-center mt-5">
                                            <div class="card-header">
                                                All Data
                                            </div>
                                            <div class="card-body">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <td>SL</td>
                                                            <td>
                                                                Product Name
                                                            </td>
                                                            <td>Quantity</td>
                                                            <td>Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {invotransec}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                Total Quantity ={" "}
                                                                {this.props.tqty
                                                                    ? this.props
                                                                          .tqty
                                                                    : 0}
                                                            </td>

                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={
                                                                        this
                                                                            .saveStoreInvoice
                                                                    }
                                                                >
                                                                    Submit
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="card-footer text-muted"></div>
                                        </div>
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
        data_p_list: state.auth.invoicetransectionList,
        tqty: state.auth.tqty
    };
};

export default connect(mapStateToProps, { updateStoreInvoice })(
    IssueStoreInvoice
);
