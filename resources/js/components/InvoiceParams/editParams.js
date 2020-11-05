import React, { useEffect, useState } from "react";
import { defaultRouteLink } from "../../common/config";
import { Link, useParams } from "react-router-dom";
function editParams(props) {
    const [Params, setParams] = useState([]);
    const { id } = useParams();

    const data = {
        type: 0,
        discount_method: 0
    };
    const [formData, setFormData] = useState(data);

    const getParams = async () => {
        const res = await axios.get(defaultRouteLink + "/api/edit-params/"+id);
        // console.log(res.data.params);
        setParams(res.data.params);
    };

    const updateParams = async event => {
        event.preventDefault();

        const res = await axios.patch(
            `/dbBackup/api/update-params/${id}`,
            formData
        );
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
                    <h2>Add product </h2>
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
                                        <option value="1" selected={Params.type ==1}>
                                            {"New purshase"}
                                        </option>
                                        <option value="2"selected={Params.type ==2}>
                                            {"Purshase return"}
                                        </option>
                                        <option value="3" selected={Params.type ==3}>{"Sale"}</option>
                                        <option value="4" selected={Params.type ==4}>
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
                                        <option value="1">
                                            {"Invoice wise"}
                                        </option>
                                        <option value="2">
                                            {"product wise"}
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
