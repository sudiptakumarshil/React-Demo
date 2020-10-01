import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
class AddStoreInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseList: [],
            toggle: true,
            type: "",
            remarks: "",
            warehouse_id: [],
            vendor_id: [],
            vendorlist: [],
            date: "",
            store_id: [],
            storelist: [],
            gross_amount: "",
            discount_taka: "",
            discount_percent: "",
            cash_amount: "",
            bank_account: "",
            bank_id: ""
        };
    }
    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    saveStoreInvoice = event => {};
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

    async componentDidMount() {
        this.fetchallwarehouse();
        this.fetchallvendor();
        this.fetchallstore();
    }

    render() {
        // FETCH ALL WAREHOUSE DATA... LOOP
        let warhouses = this.state.warehouseList.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return <option value={item.id}> {item.name}</option>;

            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });
        // FETCH ALL VENDOR DATA... LOOP
        let vendors = this.state.vendorlist.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return <option value={item.id}> {item.name}</option>;

            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });
        // FETCH ALL STORE DATA... LOOP
        let stores = this.state.storelist.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return <option value={item.id}> {item.store_name}</option>;

            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });

        let padd = {
            PaddingLeft: "200px"
        };

        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Transaction</h2>
                            <div class="card text-center">
                                <div class="card-header">NEW PURCHASE</div>
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div className="col-md-4">
                                                <label className="control-label">
                                                    Type
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    name="type"
                                                    required
                                                    onChange={this.handleInput}
                                                ></input>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="control-label">
                                                    Warehouse
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect1"
                                                    name="warehouse_id"
                                                    onChange={this.handleInput}
                                                >
                                                    {warhouses}
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="control-label">
                                                    Vendor
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect1"
                                                    name="vendor_id"
                                                    onChange={this.handleInput}
                                                >
                                                    {vendors}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="control-label">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="date"
                                                    required
                                                    value={this.state.date}
                                                    onChange={this.handleInput}
                                                ></input>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="control-label">
                                                    Store
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect1"
                                                    name="store_id"
                                                    onChange={this.handleInput}
                                                >
                                                    {stores}
                                                </select>
                                            </div>

                                            {/* <div className="col-md-4">
                                                <label>HEllllllllllllooo</label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                ></input>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer text-muted">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 pt-5">
                         </div>
                    <div className="col-md-6 pt-5">
                        <div className="row">
                            <div class="card" style={padd}>
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
                                            required
                                            onChange={this.handleInput}
                                        ></input>
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
