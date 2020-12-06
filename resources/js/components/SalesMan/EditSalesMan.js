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
import { assignWith } from "lodash";

const MyBulletListLoader = () => <BulletList />;

function EditSalesMan(props) {
    const { id } = useParams();
    const [warehouseList, setwarehouseList] = useState([]);
    // const [salesman,setsalesman] = useState([]);
    const data = {
        name: "",
        ware_id: 0,
        status: 1
    };
    const [formData, setformData] = useState(data);

    const get_warehouse = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setwarehouseList(res.data.warehouses);
    };

    const edit_SalesMan = async () => {
        const res = await axios.get(
            defaultRouteLink + `/api/edit-salesman/${id}`
        );

        setformData(res.data.editSalesMan);
    };

    const UpdateSalesman = async () => {
        event.preventDefault();

        if (formData.name == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Name Cannot Be Empty!!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        } else if (formData.ware_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Warehouse  Cannot Be Empty!!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        } else {
            const res = await axios.patch(
                defaultRouteLink + `/api/update-salesman/${id}`,
                formData
            );
            if (res.data.status === 200) {
                props.history.push(defaultRouteLink + "/manage-salesman");
            }
            const data = {
                name: "",
                ware_id: 0,
                status: 1
            };
            setformData(data);
        }
    };
    useEffect(() => {
        edit_SalesMan();
        get_warehouse();
    }, []);

    const handleInput = event => {
        const { name, files, value } = event.target;
        setformData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    const warehouse = warehouseList.map((item, index) => {
        return (
            <option selected={formData.ware_id == item.id} value={item.id}>
                {item.name}
            </option>
        );
        setformData(oldState => ({
            ...oldState,
            ware_id: item.id
        }));
    });

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8">
                    <h2>Edit Sales Man </h2>
                    <form onSubmit={UpdateSalesman}>
                        <div className="row pt-3">
                            <div className="col-md-4">
                                <label className="control-label">
                                    Salesman Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Salesman  Name"
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
                                    Warhouse Name
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="ware_id"
                                            onChange={handleInput}
                                            required
                                        >
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

export default EditSalesMan;
