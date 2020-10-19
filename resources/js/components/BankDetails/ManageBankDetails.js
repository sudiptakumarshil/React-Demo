import React, { Component } from 'react';
import BankDetails from "./BankDetails";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
class ManageBankDetails extends Component {

     // state declaration
     state = {
        bankdetails: [],
        loading: true
    };
    // get all bank details from bankdetails table ..
    fetchAllBankDetails = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-bankdetails");
        if (res.data.status === 200) {
            this.setState({ bankdetails: res.data.bankdetails});
            this.setState({ loading: false });
        }
        console.log(res);
    };

    componentDidMount = () => {
        this.fetchAllBankDetails(); // calling  fetchAllBankDetails function
    };
    render() {
        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>

                    <Link
                        to="/dbBackup/add-bank-details"
                        type="button"
                        className="btn btn-primary"
                    >
                        Add Bank Details
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
                                            <td>Bank Name</td>
                                            <td>Bank No</td>
                                            <td>Address</td>
                                            <td>Account Number </td>
                                            <td>Branch</td>
                                            <td>Accounts No</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* BankDetails.js component   */}
                                        <BankDetails
                                            bankdetails={this.state.bankdetails}
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

export default ManageBankDetails;
