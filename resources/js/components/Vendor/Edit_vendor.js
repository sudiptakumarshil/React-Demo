import React, { Component } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import axios from "axios";
import "../css/style_frontend.css";
import Swal from "sweetalert2";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import { defaultRouteLink } from "../../common/config";


class Edit_vendor extends Component {
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
            accounts_id: "",
            status:1
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

    updatevendor = async event => {
        event.preventDefault();

        const id = this.props.match.params.id;

        const res = await axios.patch(
            defaultRouteLink+`/api/update-vendor/${id}`,
            this.state
        );
        if (res.data.status === 200) {
            this.props.history.push(defaultRouteLink+"/manage-vendor");
        }
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
            title: "Vendor Create  Successfully!!"
        });
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(defaultRouteLink+`/api/edit-vendor/${id}`);
        // assign data into new constant....
        const vInfo = res.data.vendor;
        // console.log("data=" + res.data);
        // assign data into state....
        this.setState({ name: vInfo.name });
        this.setState({ email: vInfo.email });
        this.setState({ phone: vInfo.phone });
        this.setState({ address: vInfo.address });
        this.setState({ remarks: vInfo.remarks });
        this.setState({ accounts_no: vInfo.accounts_no });
        this.setState({ status: vInfo.status });
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
                            <h4 className="card-title">Create Vendor</h4>
                            <form
                                className="form-horizontal"
                                onSubmit={this.updatevendor}
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
                                    <label className="control-label col-lg-2">
                                        Status
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                name="status"
                                                onChange={this.handleInput}
                                                required
                                            >
                                                <option>Choose one </option>
                                                <option selected={this.state.status==1} value="1">
                                                    Active
                                                </option>
                                                <option selected={this.state.status==2} value="2">
                                                    Inactive
                                                </option>
                                            </select>
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

export default Edit_vendor;
