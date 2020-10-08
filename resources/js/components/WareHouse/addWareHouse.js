import React, { Component } from "react";
import Swal from "sweetalert2";

class addWareHouse extends Component {
    state = {
        name: "",
        foreign_name: "",
        wh_keeper: "",
        location: "",
        telephone: "",
        sequence: "",
        province_no: "",
        resign_code: "",
        wh_transfer_interface_account: "",
        item_activity: "",
        default_cc_code: "",
        account_name: "",
        branch: "",
        pricing_level: "",
        global_location_no: "",
        longitude: "",
        latitude: ""
    };

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    SaveWareHouse = async event => {
        event.preventDefault();
        const SweetAlert = require("react-bootstrap-sweetalert");
        const res = await axios.post(
            "/dbBackup/api/save-warehouse",
            this.state
        );
        this.setState({
            name: "",
            foreign_name: "",
            wh_keeper: "",
            location: "",
            telephone: "",
            sequence: "",
            province_no: "",
            resign_code: "",
            wh_transfer_interface_account: "",
            item_activity: "",
            default_cc_code: "",
            account_name: "",
            branch: "",
            pricing_level: "",
            global_location_no: "",
            longitude: "",
            latitude: "",
            loading: true
        });
        this.setState({ loading: false });

        if (res.data.status === 200) {
            this.props.history.push("/dbBackup/manage-warehouse");
        }
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
            title: "WareHouse Saved Successfully!!"
        });
    };

    render() {
        return (
            <div>
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <h4 className="page-title">Add WareHouse </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <h4 className="card-title"></h4>
                                <form onSubmit={this.SaveWareHouse}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Name
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        name="name"
                                                        required
                                                        value={this.state.name}
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Foreign Name
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Foreign Name"
                                                        name="foreign_name"
                                                        required
                                                        value={
                                                            this.state
                                                                .foreign_name
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                WH Keeper
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Wh Keeper"
                                                        name="wh_keeper"
                                                        required
                                                        value={
                                                            this.state.wh_keeper
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Location
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Location"
                                                        name="location"
                                                        required
                                                        value={
                                                            this.state.location
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Telephone
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Telephone"
                                                        name="telephone"
                                                        required
                                                        value={
                                                            this.state.telephone
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Sequence
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Sequence"
                                                        name="sequence"
                                                        required
                                                        value={
                                                            this.state.sequence
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Province No
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Province No"
                                                        name="province_no"
                                                        required
                                                        value={
                                                            this.state
                                                                .province_no
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Resign Code
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Province No"
                                                        name="resign_code"
                                                        required
                                                        value={
                                                            this.state
                                                                .resign_code
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Wh Transfer Interface Account
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Wh Transfer Interface Account"
                                                        name="wh_transfer_interface_account"
                                                        required
                                                        value={
                                                            this.state
                                                                .wh_transfer_interface_account
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Item Activity
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Item Activity"
                                                        name="item_activity"
                                                        required
                                                        value={
                                                            this.state
                                                                .item_activity
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Default Cc Code
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Default Cc Code"
                                                        name="default_cc_code"
                                                        required
                                                        value={
                                                            this.state
                                                                .default_cc_code
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Account Name
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Account Name"
                                                        name="account_name"
                                                        required
                                                        value={
                                                            this.state
                                                                .account_name
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Branch
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Branch"
                                                        name="branch"
                                                        required
                                                        value={
                                                            this.state.branch
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Pricing Level
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Pricing Level"
                                                        name="pricing_level"
                                                        required
                                                        value={
                                                            this.state
                                                                .pricing_level
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Global Location No
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Global Location No"
                                                        name="global_location_no"
                                                        required
                                                        value={
                                                            this.state
                                                                .global_location_no
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Longitude
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Longitude"
                                                        name="longitude"
                                                        required
                                                        value={
                                                            this.state.longitude
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Latitude
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Latitude"
                                                        name="latitude"
                                                        required
                                                        value={
                                                            this.state.latitude
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Address
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Address"
                                                        name="address"
                                                        required
                                                        value={
                                                            this.state.address
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">
                                                Foreign Address
                                            </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Foreign Address"
                                                        name="foreign_address"
                                                        required
                                                        value={
                                                            this.state
                                                                .foreign_address
                                                        }
                                                        onChange={
                                                            this.handleInput
                                                        }
                                                    ></input>
                                                </div>
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
            </div>
        );
    }
}

export default addWareHouse;
