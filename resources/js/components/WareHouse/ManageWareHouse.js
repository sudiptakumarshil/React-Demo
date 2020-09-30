import React, { Component } from "react";
import axios from "axios";
import Warehouse from "./WarHouse";
import AddWareHouse from "./addWareHouse";
import { Link, Router } from "react-router-dom";

class ManageWareHouse extends Component {

    state = {
        warehouses: [],
        loading: true
    };
    fetchallwarehouse = async () => {
        const res = await axios.get("/dbBackup/api/all-warehouse");

        if (res.data.status === 200) {
            this.setState({ warehouses: res.data.warehouses });
            this.setState({ loading: false });
        }
        // console.log(res);
    };
    componentDidMount = () => {
        this.fetchallwarehouse();
    };

    render() {
        // if (this.state.loading) {
        //     return (
        //         <h2 className="text-center mt-50">
        //             <i className="fas fa-spinner fa-spin fa-3x"></i>
        //         </h2>
        //     );
        // }

        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>
                    <div className="col-xs-6">
                        <div className="row">
                            <Link
                                to="/dbBackup/add-warehouse"
                                type="button"
                                className="btn btn-primary"
                            >
                                Add WareHouse
                            </Link>
                        </div>
                    </div>
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
                                            <td>Foreign Name</td>
                                            <td>Foreign Name</td>
                                            <td>Wh keeper</td>
                                            <td>Location</td>
                                            <td>Telephone</td>
                                            <td>Sequence</td>
                                            {/* <td>Province No</td> */}
                                            {/* <td>Resign Code</td>
                                                <td>
                                                    Wh Transfer Interface
                                                    Account
                                                </td>
                                                <td>Item Activity</td>
                                                <td>Default Cc Code</td>
                                                <td>Account Name</td>
                                                <td>Branch</td>
                                                <td>Pricing Level</td>
                                                <td>Global Location No</td>
                                                <td>Longitude</td>
                                                <td>Latitude</td>
                                                <td>Address</td>
                                                <td>Foreign Address</td> */}
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Warehouse
                                            warehouse={this.state.warehouses}
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

export default ManageWareHouse;
