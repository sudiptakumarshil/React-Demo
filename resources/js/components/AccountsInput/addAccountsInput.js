import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

function addAccountsInput(props) {
    const [moduleList, setmoduleList] = useState([]);
    const [loading, setLoading] = useState(true);

    const data = {
        name: "",
        input_type: "",
        status: 1,
        trash: 1
    };
    const [formData, setFormData] = useState(data);

    const saveinput = async event => {
        event.preventDefault();
        const res = await axios.post("/dbBackup/api/add-input", formData);
        const data = {
            name: "",
            input_type: 0,
            status: 1,
            trash: 1
        };

        if (res.data.status === 200) {
            props.history.push("/dbBackup/manage-account-input");
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
                title: "Account Input  Saved  Successfully!!"
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllModuleList = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-module");
        setmoduleList(res.data.module);
        setLoading(false);
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };
    const Module = moduleList.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            input_type: item.id
        }));
    });

    useEffect(() => {
        fetchAllModuleList();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Add Account Input </h2>
                    <form onSubmit={saveinput}>
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">Name</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Acounts Unit Name"
                                            name="name"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Input Type{" "}
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="input_type"
                                            onChange={handleInput}
                                            required
                                        >
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            {Module}
                                        </select>
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

export default addAccountsInput;
