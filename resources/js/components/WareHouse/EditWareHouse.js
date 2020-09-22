import React, { Component } from "react";
import axios from "axios";
import { Link, Router } from "react-router-dom";
import Swal from "sweetalert2";
class EditWareHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            address: "",
            foreign_address: "",
            loading:true
        };
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    updateWarehouse = async event => {
        event.preventDefault();
        const id = this.props.match.params.id;

        const res = await axios.patch(
            `/dbBackup/api/update-warehouse/${id}`,
            this.state
        );
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
            title: "WareHouse Updated Successfully!!"
        });
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(`/dbBackup/api/edit-warehouse/${id}`);
        // console.log(res);
        // assign data into new constant....
        const wInfo = res.data.warehouses;
        // console.log("data=" + res.data);
        // assign data into state....
        this.setState({ name: wInfo.name });
        this.setState({ foreign_name: wInfo.foreign_name });
        this.setState({ wh_keeper: wInfo.wh_keeper });
        this.setState({ location: wInfo.location });
        this.setState({ telephone: wInfo.telephone });
        this.setState({ sequence: wInfo.sequence });
        this.setState({ province_no: wInfo.province_no });
        this.setState({ resign_code: wInfo.resign_code });
        this.setState({
            wh_transfer_interface_account: wInfo.wh_transfer_interface_account
        });
        this.setState({ item_activity: wInfo.item_activity });
        this.setState({ default_cc_code: wInfo.default_cc_code });
        this.setState({ account_name: wInfo.account_name });
        this.setState({ branch: wInfo.branch });
        this.setState({ pricing_level: wInfo.pricing_level });
        this.setState({
            global_location_no: wInfo.global_location_no
        });
        this.setState({ longitude: wInfo.longitude });
        this.setState({ latitude: wInfo.latitude });
        this.setState({ address: wInfo.address });
        this.setState({ foreign_address: wInfo.foreign_address });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return (
                <h2 className="text-center mt-50">
                    <i className="fas fa-spinner fa-spin"></i>
                </h2>
            );
        }
        return (
            <div>
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <h4 className="page-title"></h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <h4 className="card-title"></h4>
                                <form onSubmit={this.updateWarehouse}>
                                    <h4 className="text-center mt-top:20" >Edit WareHouse </h4>
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
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Sequence"
                                                        name="sequence"
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
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Province No"
                                                        name="province_no"
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
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Province No"
                                                        name="resign_code"
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
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Pricing Level"
                                                        name="pricing_level"
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
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Global Location No"
                                                        name="global_location_no"
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

export default EditWareHouse;
