import React, { Component } from "react";
import { defaultRouteLink } from "../../common/config";
import { Link } from "react-router-dom";
import Store from "./Store";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;
class ManageStore extends Component {
    // state declaration
    state = {
        stores: [],
        loading: true
    };

    // get all customer from customers table ..
    fetchallStore = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-store");
        if (res.data.status === 200) {
            this.setState({ stores: res.data.stores });
            this.setState({ loading: false });
        }
        console.log(res);
    };

    componentDidMount = () => {
        this.fetchallStore(); // calling  fetchallCustomer function
    };

    render() {
        //  first page loading icon
        if (this.state.loading) {
            return (
                <MyBulletListLoader />
            );
        }

        return (
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="page-title"></h4>
                    </div>

                    <Link
                        to={defaultRouteLink+"/add-store"}
                        type="button"
                        className="btn btn-primary"
                    >
                       Add Store
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
                                            <td>Store Name</td>
                                            <td>Remarks</td>
                                            <td>Warehouse Name</td>
                                            <td>Status</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Store.js component   */}
                                        <Store
                                            store={this.state.stores}
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

export default ManageStore;
