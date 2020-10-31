import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const MyBulletListLoader = () => <BulletList />;

function EditStoreInvoice(props) {
    const [loading, setLoading] = useState([true]);
    const [wareHouseList, setwareHouseList] = useState([]);
    const [vendorList, setvendorList] = useState([]);
    const [storelist, setstorelist] = useState([]);
    const v_id = props.match.params.vendor_id;
    const w_id = props.match.params.ware_id;
    const data = {
        ware_id: "",
        vendor_id: "",
        date: "",
        gross_amount: "",
        store_id: "",
        discount_taka: "",
        discount_percent: "",
        cash_amount: "",
        cash_id: "",
        bank_amount: "",
        bank_id: "",
        remarks: ""
    };
    const [formData, setFormData] = useState(data);

    // GET ALL STORE INVOICE ---
    const editStoreInvoice = async () => {
        const id = props.match.params.id;
        const res = await axios.get(
            defaultRouteLink + "/api/edit-storeInvoice/" + id
        );
        const invoice = res.data.editinvoice;
        setFormData(invoice);
        // setLoading(false);
    };

    if (loading) {
        return (
            <h2 className="text-center mt-3">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <MyBulletListLoader/>
            </h2>
        );
    }

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    // for getting warehouse ,store ,product , vendor ,customer,vat....
    const fetchalldata = async () => {
        const idx = props.match.params.idx;
        const response = await axios.get(defaultRouteLink + "/api/all-data");
        if (response.data.status === 200) {
            setwareHouseList(response.data.warehouses);
            setvendorList(response.data.vendors);
            // setLoading(false);
        }
    };

    // FOR GETTING WAREHOUSE WISE STORE
    const get_warhousewiseStore = async wid => {
        let ware_id = wid;

        const response = await axios.get(
            defaultRouteLink + "/api/get-warehouse/" + ware_id
        );
        console.log(response.data.store);
        if (typeof response.data.store != "undefined") {
            setstorelist(response.data.store);
            // console.log(response.data.store);
        } else {
            setstorelist();
        }
    };
    const WarehousehandleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));

        get_warhousewiseStore(event.target.value);
    };

    const warhouses = wareHouseList.map(function(item, index) {
        return (
            <option value={item.id} selected={w_id == item.id}>
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            ware_id: item.id
        }));
    });

    const vendors = vendorList.map(function(item, index) {
        return (
            <option value={item.id} selected={v_id == item.id}>
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            vendor_id: item.id
        }));
    });

    // FETCH ALL STORE DATA... LOOP
    let stores = storelist.map((item, index) => {
        return (
            <option value={item.id} data-tokens="item.name">
                {" "}
                {item.store_name}
            </option>
        );

        setFormData(oldState => ({
            ...oldState,
            store_id: item.id
        }));
    });
    useEffect(() => {
        let unmounted = false;
        editStoreInvoice();
        fetchalldata();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Edit Store Invoice </h2>
                    <form>
                        <div className="row pt-3">
                            <div className="col-md-3">
                                <label className="control-label">
                                    Warehouse
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="ware_id"
                                            onChange={WarehousehandleInput}
                                            value={formData.ware_id}
                                        >
                                            {warhouses}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">Vendor</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="vendor_id"
                                            onChange={handleInput}
                                            value={formData.vendor_id}
                                        >
                                            {vendors}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Store </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="store_id"
                                            onChange={handleInput}
                                            value={formData.store_id}
                                        >
                                            {stores}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Date</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="date"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.date}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Gross Amount
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="gross_amount"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.gross_amount}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    DiscountTaka
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="discount_taka"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.discount_taka}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Discount Percent
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="discount_percent"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.discount_percent}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Cash Amount
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="cash_amount"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.cash_amount}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">
                                    Bank Amount
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="bank_amount"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={formData.bank_amount}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Remarks</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            onChange={handleInput}
                                            value={formData.remarks}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div style={{marginLeft:600 ,marginTop:100}}>
                        <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStoreInvoice;
