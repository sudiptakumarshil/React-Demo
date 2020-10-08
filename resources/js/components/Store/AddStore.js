import React, { Component } from "react";
import Swal from "sweetalert2";
import { defaultRouteLink } from "../../common/config";
class AddStore extends Component {
    // STATE DECLARATION
    // NOTE: DON'T NEED TO ADD CONSTRUCTOR IN REACT NEW VERSION .. YOU CAN USE STATE DIRECTLY ..
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

    async componentDidMount() {
        this.fetchallwarehouse(); //CALLING (fetchallwarehouse) FUNCTION
    }
    // SAVE FORM DATA METHOD ....
    saveStore = async event => {
        event.preventDefault();

        const res = await axios.post("/dbBackup/api/save-store", this.state);
        this.setState({
            store_name: "",
            status: "",
            remarks: ""
        });

        // SUCCESS MESSAGE USING SWEET ALERT
        try {
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
                title: "Store Create  Successfully!!"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        }
    };

    render() {
        // FETCH ALL WAREHOUSE DATA... LOOP
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
                                onSubmit={this.saveStore}
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
                                                // id="exampleFormControlSelect1"
                                                name="warehouse_id"
                                                required
                                                onChange={this.handleInput}
                                            >
                                            <option value="0" selected>Choose One</option>
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
                                                required
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
                                                required
                                            >
                                                <option selected>Choose one </option>
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

export default AddStore;
