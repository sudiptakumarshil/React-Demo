import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import {defaultRouteLink} from '../../common/config';

class EditCustomer extends Component {
    // STATE DECLARATION ....
    // DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION ... YOU CAN USE STATE DIRECTLY ..
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            name: "",
            email: "",
            accounts_no: "",
            phone: "",
            address: "",
            remarks: "",
            accounts_id: ""
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
    // FOR UPDATE REQUEST SEND IN SERVER
    updateCustomer = async event => {
        event.preventDefault();

        const id = this.props.match.params.id;

        const res = await axios.patch(
            defaultRouteLink+`/api/update-customer/${id}`,
            this.state
        );
        if (res.data.status === 200) {
            this.props.history.push(defaultRouteLink+"/manage-customer");
        }
        // SUCCESS ALERT MESSAGE USING SWEET ALERT
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
            title: "Customer Updated  Successfully!!"
        });
    };

    async componentDidMount() {
        // GET SPECIFIC DATA FROM CUSTOMER TABLE BY ID ...
        const id = this.props.match.params.id;
        const res = await axios.get(defaultRouteLink+`/api/edit-customer/${id}`);
        // assign data into new constant....
        const vInfo = res.data.customer;
        // console.log("data=" + res.data);
        // assign data into state....

        // UPDATE STATE
        this.setState({ name: vInfo.name });
        this.setState({ email: vInfo.email });
        this.setState({ phone: vInfo.phone });
        this.setState({ address: vInfo.address });
        this.setState({ remarks: vInfo.remarks });
        this.setState({ accounts_no: vInfo.accounts_no });

        this.setState({ loading: false });
    }

    render() {
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
                            <h4 className="card-title">Edit Customer</h4>
                            <form
                                className="form-horizontal"
                                onSubmit={this.updateCustomer}
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
                                                value={this.state.phone}
                                                onChange={this.handleInput}
                                            ></input>
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
                                                Upadte
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

export default EditCustomer;
