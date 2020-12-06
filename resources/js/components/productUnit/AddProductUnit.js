import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

function AddProductUnit(props) {
    const data = {
        unit_name: "",
        status: 1
    };
    const [formData, setFormData] = useState(data);

    const saveProductUnit = async event => {
        event.preventDefault();

        if (formData.unit_name == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unit Name Cannot Be Empty!!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        } else {
            const res = await axios.post(
                defaultRouteLink + "/api/add-unit",
                formData
            );

            const data = {
                unit_name: "",
                status: 1
            };

            if (res.data.status === 200) {
                props.history.push(defaultRouteLink + "/manage-unit");
            }

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
                    title: "Product Saved  Successfully!!"
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    useEffect(() => {}, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Add Unit </h2>
                    <form onSubmit={saveProductUnit}>
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Unit Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Unit Name"
                                            name="unit_name"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">Status</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="status"
                                            onChange={handleInput}
                                            required
                                        >
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>
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
    );
}

export default AddProductUnit;
