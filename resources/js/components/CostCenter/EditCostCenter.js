import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

function EditCostCenter(props) {
    const { id } = useParams();
    const [warhouseList, setwarhouseList] = useState([]);
    const [loading, setLoading] = useState(true);

    const data = {
        name: "",
        ware_id: 0,
        status: 1,
        trash: 1
    };

    const [formData, setFormData] = useState(data);

    const updatecostcenter = async event => {
        event.preventDefault();
        if (formData.name == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cost Center Name Cannot Be Empty!!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        } else if (formData.wareHouse_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "WareHouse Cannot Be Empty!!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        } else {
            const res = await axios.patch(
                defaultRouteLink + `/api/update-costcenter/${id}`,
                formData
            );

            const data = {
                name: "",
                ware_id: 0,
                status: 1,
                trash: 1
            };

            if (res.data.status === 200) {
                props.history.push(defaultRouteLink + "/manage-costcenter");
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
                    title: "Cost Center  Updated  Successfully!!"
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const EditCostCenter = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/edit-costcenter/" + id
        );
        setFormData(res.data.cost);
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
        return (
            <option selected={formData.ware_id == item.id} value={item.id}>
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            ware_id: item.id
        }));
    });

    useEffect(() => {
        fetchallwareHouse();
        EditCostCenter();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit Cost Center </h2>
                    <form onSubmit={updatecostcenter}>
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
                                            value={formData.name}
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
                                            value={formData.wareHouse_id}
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

export default EditCostCenter;
