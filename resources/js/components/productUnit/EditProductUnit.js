import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;

function EditProductUnit(props) {
    const { id } = useParams();

    const data = {
        unit_name: "",
        unit_code: "",
        status: 1
    };
    const [formData, setFormData] = useState(data);

    const updateProductUnit = async event => {
        event.preventDefault();
        const res = await axios.patch(
            `/dbBackup/api/update-unit/${id}`,
            formData
        );

        const data = {
            unit_name: "",
            status: 1
        };

        if (res.data.status === 200) {
            props.history.push("/dbBackup/manage-unit");
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
    };

    const getUnitData = async () => {
        const res = await axios.get(`/dbBackup/api/edit-unit/${id}`);

        const units = res.data.unit;
        setFormData(units);
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    useEffect(() => {
        getUnitData();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit Product Unit</h2>
                    <form onSubmit={updateProductUnit}>
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
                                            value={formData.unit_name}
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
                                            <option
                                                selected={formData.status == 1}
                                                value="1"
                                            >
                                                Active
                                            </option>
                                            <option
                                                selected={formData.status == 2}
                                                value="2"
                                            >
                                                Inactive
                                            </option>
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

export default EditProductUnit;
