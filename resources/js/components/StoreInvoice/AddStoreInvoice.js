import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
class AddStoreInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseList: [],
            customerList:[],
            toggle: true,
            invoice_code: "",
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
            customer_id:"",
            product_id: "",
            productList: [],
            quantity: "",
            price: "",
            idx:""
        };
    }
    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    // save invoice transection .......

    saveinvoiceTransection = async event => {
        event.preventDefault();

        const res = await axios.post(
            "/dbBackup/api/save-storeinvoice",
            this.state
        );
        this.setState({

            Invoice_code: "",
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
                title: "Store Create  Successfully!!"
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

    // GET ALL WAREHOUSE LIST
    fetchallwarehouse = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-warehouse"
        );
        console.log(response);

        this.setState({ warehouseList: response.data.warehouses });
    };
    fetchallvendor = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-vendor");
        console.log(response);

        this.setState({ vendorlist: response.data.vendors });
    };
    fetchallstore = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-store");
        console.log(response);

        this.setState({ storelist: response.data.stores });
    };

    fetchallproduct = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-inventproduct"
        );
        console.log(response);

        this.setState({ productList: response.data.products });
    };

    fetchallcustomer = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-customer"

        );

        this.setState({ customerList: response.data.customers });
    }

    async componentDidMount() {
        const idx = this.props.match.params.idx;
        console.log(idx);
        this.setState({
            idx:idx
        });

        this.fetchallwarehouse();
        this.fetchallvendor();
        this.fetchallstore();
        this.fetchallproduct();
        this.fetchallcustomer();
    }

    render() {
        // FETCH ALL WAREHOUSE DATA... LOOP
        let warhouses = this.state.warehouseList.map((item, index) => {
            // if (warhouses.length === 0) return 1;

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
            // if (warhouses.length === 0) return 1;

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
        // fetch all product data ..
        let products = this.state.productList.map((item, index) => {
            return (
                <option value={item.id} data-tokens="item.product_name">
                    {item.product_name}
                </option>
            );
            this.setState({
                product_id: item.id, // UPDATE STATE ........
                // price: item.selling_price
                price: item.id
            });

            // console.log(this.state.price);
        });

        let customers = this.state.customerList.map((item, index) => {
            return (

                <option value={item.id} data-tokens="item.name">
                    {item.name}
                </option>
            );
            this.setState({
                customer_id: item.id, // UPDATE STATE ........
            });

            // console.log(this.state.price);
        });

        const idx = this.props.match.params.idx;


        let pagetitle1 = "";
        if (idx == 1) {
            pagetitle1 = "NEW PURCHASE";
        } else if (idx == 2) {
            pagetitle1 = "Purshase Return";
        } else if (idx == 3) {
            pagetitle1 = "Sale Rteurn";
        } else {
            pagetitle1 = "Sale";
        }



        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Transaction</h2>
                            <div class="card text-center">

                                <div class="card-header">{pagetitle1}</div>
                                <div class="card-body">
                                    <form
                                        onSubmit={this.saveinvoiceTransection}
                                    >
                                        <div class="container">
                                            <div class="row">
                                                <div className="col-md-2">
                                                    <label className="control-label">
                                                        Invoice Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Invoice Code"
                                                        name="invoice_code"
                                                        value={
                                                            this.state
                                                                .invoice_code
                                                        }
                                                        required
                                                        onChange={
                                                            this.handleInput
                                                        }
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
                                                        // ref="selectPicker"
                                                        // id="exampleFormControlSelect1"
                                                        name="warehouse_id"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                        <option selected disabled>Choose One</option>
                                                        {warhouses}
                                                    </select>
                                                </div>
                                                {
                                                idx == 1 ?
                                                <div className="col-md-2">
                                                    <label className="control-label">
                                                        Vendor
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        // id="exampleFormControlSelect1"
                                                        // className="selectpicker"
                                                        data-live-search="true"
                                                        value={this.state.vendor_id}
                                                        name="vendor_id"
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                    <option selected disabled>Choose One</option>
                                                        {vendors}
                                                    </select>
                                                </div>
                                                :
                                                <div className="col-md-2">
                                                <label className="control-label">
                                                    Customer
                                                </label>
                                                <select
                                                    className="form-control"
                                                    data-live-search="true"
                                                    name="customer_id"
                                                    value={this.state.customer_id}
                                                    onChange={
                                                        this.handleInput
                                                    }
                                                >
                                                    <option selected disabled>Choose One</option>
                                                    {customers}
                                                </select>
                                            </div>


                                                }

                                                <div className="col-md-2">
                                                    <label className="control-label">
                                                        Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="date"
                                                        required
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
                                                        value={this.state.store_id}
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    >
                                                         <option selected disabled>Choose One</option>
                                                        {stores}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card text-center">
                                            <div class="card-header">
                                                Default Store
                                            </div>
                                            <div class="card-body">
                                                <div class="container">
                                                    <div class="row">
                                                        <div className="col-md-2">
                                                            <label className="control-label"></label>
                                                            <select
                                                                className="form-control"
                                                                data-live-search="true"
                                                                name="product_id"
                                                                value={this.state.product_id}
                                                                onChange={
                                                                    this
                                                                        .handleInput
                                                                }
                                                            >
                                                             <option selected disabled>Choose One</option>
                                                                {products}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-2">
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
                                                        <div className="col-md-2">
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
                                                        <button className="btn btn-primary">
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
                                            className="form-control"
                                            name="gross_amount"
                                            required
                                            value={this.state.gross_amount}
                                            onChange={this.handleInput}
                                        ></input>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Discount Taka
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="discount_taka"
                                            value={this.state.discount_taka}
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
                                            value={this.state.discount_percent}
                                            required
                                            onChange={this.handleInput}
                                        ></input>
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
                                </div>
                                <div class="card-footer text-muted">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStoreInvoice;
