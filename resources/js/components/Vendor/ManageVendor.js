import React, { Component } from "react";
import Vendor from "./Vendor";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook,BulletList  } from 'react-content-loader'
const MyBulletListLoader = () => <BulletList />
class ManageVendor extends Component {
    state = {
        vendors: [],
        loading: true
    };
    fetchallvendor = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-vendor");
        if (res.data.status === 200) {
            this.setState({ vendors: res.data.vendors });
            this.setState({ loading: false });
        }
        // console.log(res);
    };
    componentDidMount = () => {
        this.fetchallvendor();
    };

    render() {
        if (this.state.loading) {
            return (
                <MyBulletListLoader/>
            );
        }

        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>

                    <Link
                        to={defaultRouteLink+"/create-vendor"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Create Vendor
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
                                            <td>type</td>
                                            <td>Remarks</td>
                                            <td>WareHouse Name</td>
                                            <td>Accounts No</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Vendor vendor={this.state.vendors} />
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

export default ManageVendor;
