import React, { Component } from "react";
import Swal from "sweetalert2";
import "../css/style_frontend.css";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import { defaultRouteLink } from "../../common/config";
class CreateCustomer extends Component {
    // STATE DECLARATION
    // NOTE: DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION .. YOU CAN USE STATE DIRECTLY ..
    constructor(props) {
        super(props);
        this.state = {
            warehouseList: [],
            toggle: true,
            name: "",
            email: "",
            accounts_no: "",
            phone: "",
            address: "",
            remarks: "",
            type:2,
            accounts_id: "",
            warehouse_id: [],
            status:1,
        };
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAccountsid = object => {
        //console.log("accId="+object.id);
        this.setState({
            accounts_no: object.ledger_title,
            accounts_id: object.id
        });
    };
    // GET ALL WAREHOUSE LIST
    fetchallwarehouse = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-data"
        );
        console.log(response);

        this.setState({ warehouseList: response.data.warehouses });
    };

    async componentDidMount() {
        this.fetchallwarehouse(); //CALLING (fetchallwarehouse) FUNCTION
    }
    // SAVE FORM DATA METHOD ....
    CreateCustomer = async event => {
        event.preventDefault();

        const res = await axios.post(
            defaultRouteLink+"/api/create-customer",
            this.state
        );
        this.setState({
            name: "",
            email: "",
            phone: "",
            address: "",
            remarks: "",
            accounts_no: "",
            type:2
        });
        if (res.data.status === 200) {
            this.props.history.push(defaultRouteLink+"/manage-customer");
        }
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
                title: "Customer Create  Successfully!!"
            });
        } catch (error) {
            console.log("Error");
        }
    };

    render() {
        // FETCH ALL WAREHOUSE DATA... LOOP
        let warhouses = this.state.warehouseList.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return <option value={item.id}> {item.name}</option>;

            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });

        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h4 className="page-title"></h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <h4 className="card-title">Create Customer</h4>
                            <form
                                className="form-horizontal"
                                onSubmit={this.CreateCustomer}
                            >
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Name
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                name="name"
                                                required
                                                value={this.state.name}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Email
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Address
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Address"
                                                name="address"
                                                required
                                                value={this.state.address}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Phone
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="phone"
                                                name="phone"
                                                required
                                                value={this.state.phone}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Warehouse
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                name="warehouse_id"
                                                onChange={this.handleInput}
                                                required
                                            >
                                                <option value="0" selected>
                                                    Choose One
                                                </option>

                                                {warhouses}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Remarks
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                placeholder="remarks"
                                                name="remarks"
                                                value={this.state.remarks}
                                                onChange={this.handleInput}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Account No
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Accounts No"
                                                name="accounts_no"
                                                value={this.state.accounts_no}
                                                data-id={this.state.accounts_id}
                                                onChange={this.handleInput}
                                            />
                                            <ModalAccountsLedgerList
                                                handleAccountsid={
                                                    this.handleAccountsid
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2"></label>
                                    <div className="col-md-10">
                                        <div className="input-group">
                                            <button className="btn btn-primary text-center">
                                                save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCustomer;
