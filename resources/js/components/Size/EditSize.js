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
function EditSize(props) {
    const { id } = useParams();
    const data = {
        name: "",
        status: 1
    };
    const [formData, setFormData] = useState(data);

    const editSize = async () => {
        const res = await axios.get(defaultRouteLink + `/api/edit-size/${id}`);

        setFormData(res.data.size);
    };

    const UpdateSize = async event => {
        event.preventDefault();
        const res = await axios.patch(
            defaultRouteLink + `/api/update-size/${id}`,
            formData
        );

        const data = {
            name: "",
            status: 1
        };
        setFormData(data);

        if (res.data.status === 200) {
            props.history.push(defaultRouteLink + "/manage-size");
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
                title: "Size  Updated  Successfully!!"
            });
        } catch (error) {
            console.error(error);
        }
    };
    const SizeData = async event => {
        const res = await axios.get(
            defaultRouteLink + "/api/save-size",
            formData
        );

        const data = {
            name: "",
            status: 1
        };
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };
    useEffect(() => {
        editSize();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit Size</h2>
                    <form onSubmit={UpdateSize}>
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Size Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={formData.name}
                                            name="name"
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

export default EditSize;
