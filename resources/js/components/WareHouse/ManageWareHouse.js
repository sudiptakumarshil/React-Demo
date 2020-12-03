import React, { Component } from "react";
import axios from "axios";
import Warehouse from "./WarHouse";
import AddWareHouse from "./addWareHouse";
import { Link, Router } from "react-router-dom";
import Pagination from "react-js-pagination";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook,BulletList  } from 'react-content-loader'
const MyBulletListLoader = () => <BulletList />

class ManageWareHouse extends Component {
    state = {
        warehouses: [],
        loading: true,
        activePage: 1,
        total_count:0,
        limit:1,
    };
    fetchallwarehouse = async (pageNumber = 1) => {
        console.log(pageNumber);
        const res = await axios.get(
            defaultRouteLink+"/api/all-warehouse",
            {
                params:{
                    start_page:pageNumber,
                    limit:this.state.limit
                }
            }
        );

        // if (res.data.status === 200) {

        if(res.data.count >=0 ){
            this.setState({ warehouses: res.data.warehouses,loading: false ,total_count:res.data.count,activePage:pageNumber});
        }
        else{
            this.setState({ warehouses: res.data.warehouses,loading: false,activePage:pageNumber});
        }

    };

    componentDidMount = () => {
        this.fetchallwarehouse();
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
                    <div className="col-xs-6">
                        <div className="row">
                            <Link
                                to={defaultRouteLink+"/add-warehouse"}
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
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Warehouse
                                            warehouse={this.state.warehouses}
                                        />
                                        <div>
                                            <Pagination
                                                activePage={
                                                    this.state.activePage
                                                }
                                                pageRangeDisplayed={10}
                                                itemsCountPerPage={this.state.limit}
                                                totalItemsCount={this.state.total_count}
                                                onChange={this.fetchallwarehouse.bind(this)}
                                            />
                                        </div>
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
