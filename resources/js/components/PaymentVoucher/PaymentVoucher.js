import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import "../css/style_frontend.css";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
function AddPaymentVoucher(props) {
    const [loading, setLoading] = useState(true);
    const [warhouseList, setwarhouseList] = useState([]);
    const [cashList, setcashList] = useState([]);
    const [costcenterList, setcostcenterList] = useState([]);
    const [docType, setdocType] = useState([]);
    const [postingType, setpostingType] = useState([]);

    const data = {
        name: "",
        ware_id: 0,
        status: 1,
        trash: 1,
        cashAccount_id: 0,
        costcenter_id: 0,
        postingType_id: 0,
        docType_id: 0
    };

    const [formData, setFormData] = useState(data);
    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    const fetchalldata = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setwarhouseList(res.data.warehouses);
        setcashList(res.data.cashaccount);
        setcostcenterList(res.data.costcenter);
        setdocType(res.data.docType);
        setpostingType(res.data.postingType);
        setLoading(false);
    };

    const warehouse = warhouseList.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            ware_id: item.id
        }));
    });

    const cashDetails = cashList.map(function(item, index) {
        return <option value={item.id}> {item.cash_name}</option>;
        setFormData(oldState => ({
            ...oldState,
            cashAccount_id: item.id
        }));
    });

    const costCenter = costcenterList.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            costcenter_id: item.id
        }));
    });

    const postingtype = postingType.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            postingType_id: item.id
        }));
    });
    const doctype = docType.map(function(item, index) {
        return <option value={item.id}> {item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            docType_id: item.id
        }));
    });

    useEffect(() => {
        fetchalldata();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Payment Voucher</h2>
                    <form>
                        <div className="row pt-3">
                            <div className="col-md-3">
                                <label className="control-label">
                                    WareHouse
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
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            {warehouse}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Cash Account
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="cashAccount_id"
                                            onChange={handleInput}
                                            required
                                        >
                                            <option selected>
                                                Choose one{" "}
                                            </option>
                                            {cashDetails}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Account Type{" "}
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="radio"
                                            name="account_type"
                                            onChange={handleInput}
                                        ></input>
                                        Cash
                                        <input
                                            type="radio"
                                            name="account_type"
                                            onChange={handleInput}
                                        ></input>
                                        Bank
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">Date</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Ammount</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Description
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <textarea
                                            className="form-control"
                                            onChange={handleInput}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">
                                    Cost Center
                                </label>
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
                                            {costCenter}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">Ref NO</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">
                                    Posting Type
                                </label>
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
                                            {postingtype}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Doc Type
                                </label>
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
                                            {doctype}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">Doc NO</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="control-label">Stand By</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="checkbox"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-4">
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
                            </div> */}

                            <table
                                className="table table-bordered"
                                style={{ marginTop: 5 }}
                            >
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Account No</th>
                                        <th>Detail Account </th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
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

export default AddPaymentVoucher;
