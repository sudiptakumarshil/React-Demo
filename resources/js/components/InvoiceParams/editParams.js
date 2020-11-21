import React, { useEffect, useState } from "react";
import { defaultRouteLink } from "../../common/config";
import { Link, useParams } from "react-router-dom";
function editParams(props) {
    const [Params, setParams] = useState([]);
    const { id } = useParams();

    const data = {
        type: 0,
        discount_method: 0,
        status: 0
    };
    const [formData, setFormData] = useState(data);

    const getParams = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/edit-params/" + id
        );
        // console.log(res.data.params);
        setParams(res.data.params);
        setFormData(res.data.params);
    };

    const updateParams = async event => {
        event.preventDefault();
        const res = await axios.patch(
            defaultRouteLink + `/api/update-params/${id}`,
            formData
        );
        if (res.data.status === 200) {
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
                title: "Invoices Parameter Updated  Successfully!!"
            });
        }
    };

    const handleInput = () => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    useEffect(() => {
        getParams();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit Invoice Params </h2>
                    <form onSubmit={updateParams}>
                        <div className="col-md-4">
                            <label className="control-label">type</label>
                            <div className="form-group">
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        name="type"
                                        onChange={handleInput}
                                    >
                                        <option
                                            value="1"
                                            selected={Params.type == 1}
                                        >
                                            {"New purshase"}
                                        </option>
                                        <option
                                            value="2"
                                            selected={Params.type == 2}
                                        >
                                            {"Purshase return"}
                                        </option>
                                        <option
                                            value="3"
                                            selected={Params.type == 3}
                                        >
                                            {"Sale"}
                                        </option>
                                        <option
                                            value="4"
                                            selected={Params.type == 4}
                                        >
                                            {"Sale return"}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className="control-label">
                                Discount Method
                            </label>
                            <div className="form-group">
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        name="discount_method"
                                        onChange={handleInput}
                                    >
                                        <option
                                            selected={
                                                Params.discount_method == 1
                                            }
                                            value="1"
                                        >
                                            {"Invoice wise"}
                                        </option>
                                        <option
                                            selected={
                                                Params.discount_method == 2
                                            }
                                            value="2"
                                        >
                                            {"product wise"}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className="control-label">Status</label>
                            <div className="form-group">
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        name="status"
                                        onChange={handleInput}
                                    >
                                        <option
                                            selected={Params.status == 1}
                                            value="1"
                                        >
                                            {"Active"}
                                        </option>
                                        <option
                                            selected={Params.status == 2}
                                            value="2"
                                        >
                                            {"Inactive"}
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
    );
}

export default editParams;
