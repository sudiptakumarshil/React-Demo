import React, { Component } from "react";
import Swal from "sweetalert2";
import "../css/style_frontend.css";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import { defaultRouteLink } from "../../common/config";
class AddCashAccount extends Component {
    // STATE DECLARATION
    // NOTE: DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION .. YOU CAN USE STATE DIRECTLY ..
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            cash_no: "",
            cash_name: "",
            remarks: "",
            accounts_id: "",
            accounts_no: ""
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

    async componentDidMount() {}
    // SAVE FORM DATA METHOD ..........
    AddCashAccount = async event => {
        event.preventDefault();

        const res = await axios.post(
            defaultRouteLink+"/api/save-cash-account",
            this.state
        );
        this.setState({
            cash_no: "",
            cash_name: "",
            remarks: "",
            accounts_id: "",
            accounts_no: ""
        });
        if (res.data.status === 200) {
            // this.props.history.push("/dbBackup/manage-customer");
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
                title: "Cash Account  Created  Successfully!!"
            });
        } catch (error) {
            console.log("Error");
        }
    };


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
                            <h4 className="card-title">Add Cash Account </h4>
                            <form
                                className="form-horizontal"
                                onSubmit={this.AddCashAccount}
                            >
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Cash Name
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Cash Name"
                                                name="cash_name"
                                                required
                                                value={this.state.cash_name}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Cash No
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Cash No"
                                                name="cash_no"
                                                required
                                                value={this.state.cash_no}
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
                                                placeholder="Remarks"
                                                name="remarks"
                                                required
                                                value={this.state.remarks}
                                                onChange={this.handleInput}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Chart Of Account
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

export default AddCashAccount;
