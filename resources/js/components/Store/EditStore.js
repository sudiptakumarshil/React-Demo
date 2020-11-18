import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { defaultRouteLink } from "../../common/config";

class EditStore extends Component {
    // STATE DECLARATION ....
    // DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION ... YOU CAN USE STATE DIRECTLY ..
    constructor(props) {
        super(props);
        this.state = {
            warehouseList: [],
            toggle: true,
            store_name: "",
            status: "",
            remarks: "",
            warehouse_id: []
        };
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // GET ALL WAREHOUSE LIST
    fetchallwarehouse = async () => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-warehouse"
        );
        console.log(response);

        this.setState({ warehouseList: response.data.warehouses });
    };

    // FOR UPDATE REQUEST SEND IN SERVER
    UpdateStore = async event => {
        event.preventDefault();

        const id = this.props.match.params.id;

        const res = await axios.patch(
            defaultRouteLink+`/api/update-store/${id}`,
            this.state
        );
        if (res.data.status === 200) {
            this.props.history.push(defaultRouteLink+"/manage-store");
        }
        // SUCCESS ALERT MESSAGE USING SWEET ALERT
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
            title: "Store Updated  Successfully!!"
        });
    };

    async componentDidMount() {
        this.fetchallwarehouse(); //CALLING (fetchallwarehouse) FUNCTION

        // GET SPECIFIC DATA FROM CUSTOMER TABLE BY ID ...
        const id = this.props.match.params.id;
        const res = await axios.get(defaultRouteLink+`/api/edit-store/${id}`);
        // assign data into new constant....
        const vInfo = res.data.store;
        // console.log("data=" + res.data);
        // assign data into state....

        // UPDATE STATE
        this.setState({ store_name: vInfo.store_name });
        this.setState({ remarks: vInfo.remarks });
        this.setState({ status: vInfo.status });
        // this.setState({ warehouse_id: vInfo.ware_id });

        this.setState({ loading: false });
    }

    render() {
        let warhouses = this.state.warehouseList.map((item, index) => {
            // if (warhouses.length === 0) return 1;

            return <option value={item.id}> {item.name}</option>;

            this.setState({
                warehouse_id: item.id // UPDATE STATE ..
            });
        });
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
                                onSubmit={this.UpdateStore}
                            >
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Store Name
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                name="store_name"
                                                required
                                                value={this.state.store_name}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">
                                        Warehouse
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                name="warehouse_id"
                                                onChange={this.handleInput}
                                            >
                                                {warhouses}
                                            </select>
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
                                        Status
                                    </label>
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                name="status"
                                                onChange={this.handleInput}
                                            >
                                                <option value="1">
                                                    Active
                                                </option>
                                                <option value="2">
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

export default EditStore;
