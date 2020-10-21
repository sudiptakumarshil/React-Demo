import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";

import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;
class BankDetailsEdit extends Component {
    // STATE DECLARATION
    // NOTE: DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION .. YOU CAN USE STATE DIRECTLY ..
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            bank_name: "",
            bank_no: "",
            branch: "",
            address: "",
            account_number: "",
            accounts_id: "",
            accounts_no: "",
            loading:true
        };
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAccountsid = object => {
        this.setState({
            accounts_no: object.ledger_title,
            accounts_id: object.id
        });
    };

    async componentDidMount() {
        // GET SPECIFIC DATA FROM BANKDETAILS TABLE BY ID ...
        const id = this.props.match.params.id;
        const res = await axios.get(`/dbBackup/api/edit-bankdetails/${id}`);
        // assign data into new constant....
        const vInfo = res.data.editbankdetails;
        // console.log("data=" + res.data);
        // assign data into state....

        // UPDATE STATE
        this.setState({ bank_name: vInfo.bank_name });
        this.setState({ bank_no: vInfo.bank_no });
        this.setState({ branch: vInfo.branch });
        this.setState({ address: vInfo.address });
        this.setState({ account_number: vInfo.account_number });
        this.setState({ accounts_no: vInfo.account_id });

        this.setState({ loading: false });
    }

    // Update FORM DATA METHOD ....
    updateBankDetails = async event => {
        event.preventDefault();
        const id = this.props.match.params.id;

        const res = await axios.patch(
            `/dbBackup/api/update-bankdetails/${id}`,
            this.state
        );

        this.setState({
            bank_name: "",
            bank_no: "",
            branch: "",
            address: "",
            account_number: "",
            accounts_id: "",
            accounts_no: ""
        });
        if (res.data.status === 200) {
            this.props.history.push("/dbBackup/manage-bank-details");
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
                title: "Bank Details Updated  Successfully!!"
            });
        } catch (error) {
            console.log("Error");
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <h2 className="text-center mt-3">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <MyBulletListLoader />
                </h2>
            );
        }
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
                            <h4 className="card-title">Edit Bank Details</h4>
                            <form
                                className="form-horizontal"
                                onSubmit={this.updateBankDetails}
                            >
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Bank Name
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Bank Name"
                                                name="bank_name"
                                                required
                                                value={this.state.bank_name}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Bank No
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Bank No"
                                                name="bank_no"
                                                required
                                                value={this.state.bank_no}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Branch
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Branch"
                                                name="branch"
                                                required
                                                value={this.state.branch}
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
                                        Account Number
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="phone"
                                                name="account_number"
                                                required
                                                value={
                                                    this.state.account_number
                                                }
                                                onChange={this.handleInput}
                                            ></input>
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
                                                required
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

export default BankDetailsEdit;
