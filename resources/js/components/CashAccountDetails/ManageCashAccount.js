import React, { Component } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import CashAccount from "./CashAccount"
class ManageCashAccount extends Component {
    // state declaration
    state = {
        cashlist: [],
        loading: true
    };
    // get all bank details from bankdetails table ..
    fetchAllCash = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-cash-account");
        if (res.data.status === 200) {
            this.setState({ cashlist: res.data.cashall });
            this.setState({ loading: false });
        }
        console.log(res);
    };

    componentDidMount = () => {
        this.fetchAllCash(); // calling  fetchAllCash function
    };
    render() {
        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>

                    <Link
                        to="/dbBackup/add-cash-account"
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Cash Account Details
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-box">
                            <div className="card-block">
                                <h6 className="card-title text-bold"></h6>
                                <p className="content-group"></p>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Cash Name</td>
                                            <td>Cash No</td>
                                            <td>Remarks</td>
                                            <td>Accounts No</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* CashAccount.js component */}
                                        <CashAccount
                                            cashAccounts={this.state.cashlist}
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageCashAccount;
