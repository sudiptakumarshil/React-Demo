import React, {Component} from 'react';
import {defaultRouteLink} from "../../common/config";
import {Link} from "react-router-dom";
import Vendor from "../Vendor/Vendor";
import Customer from "./Customer";


class ManageCustomer extends Component {
    state = {
        customers: [],
        loading: true
    };
    fetchallCustomer = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-customer");
        if (res.data.status === 200) {
            this.setState({ customers: res.data.customers });
            this.setState({ loading: false });
        }
        console.log(res);
    };
    componentDidMount = () => {
        this.fetchallCustomer();
    };

    render() {
        if (this.state.loading) {
            return (
                <h2 className="text-center mt-50">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                </h2>
            );
        }

        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>

                    <Link
                        to="/dbBackup/create-customer"
                        type="button"
                        className="btn btn-primary"
                    >
                        Create Customer
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
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Address</td>
                                        <td>Phone</td>
                                        <td>Remarks</td>
                                        <td>WareHouse Name</td>
                                        <td>Accounts No</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <Customer customer={this.state.customers} />
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

export default ManageCustomer;
