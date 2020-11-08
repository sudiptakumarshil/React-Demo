import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

function AddCostCenter(props) {
    const [warhouseList, setwarhouseList] = useState([]);
    const [loading, setLoading] = useState(true);

    const data = {
        name: "",
        wareHouse_id: "",
        status: 1,
        trash: 1
    };

    const [formData, setFormData] = useState(data);

    const savecostcenter = async event => {
        event.preventDefault();
        const res = await axios.post("/dbBackup/api/add-costcenter", formData);
        const data = {
            name: "",
            wareHouse_id: "",
            status: 1,
            trash: 1
        };

        if (res.data.status === 200) {
            props.history.push("/dbBackup/manage-costcenter");
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
                title: "Cost Center  Saved  Successfully!!"
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchallwareHouse = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setwarhouseList(res.data.warehouses);
        setLoading(false);
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };
    const warehouse = warhouseList.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            wareHouse_id: item.id
        }));
    });

    useEffect(() => {
        fetchallwareHouse();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Add Cost Center </h2>
                    <form onSubmit={savecostcenter}>
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Cost Center Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cost Center Name"
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
                                    WareHouse Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="wareHouse_id"
                                            onChange={handleInput}
                                            required
                                        >
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            {warehouse}
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

export default AddCostCenter;
