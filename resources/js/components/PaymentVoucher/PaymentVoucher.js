import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import "../css/style_frontend.css";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import ModalSetting from "../modal/ModalSetting";
import { Typeahead } from "react-bootstrap-typeahead";
function AddPaymentVoucher(props) {
    const [loading, setLoading] = useState(true);
    const [warhouseList, setwarhouseList] = useState([]);
    const [cashList, setcashList] = useState([]);
    const [costcenterList, setcostcenterList] = useState([]);
    const [docType, setdocType] = useState([]);
    const [postingType, setpostingType] = useState([]);
    const [AccountsList, setAccountsList] = useState([]);
    const [ledgers, setLedgers] = useState([]);
    const [Setting, setSetting] = useState([]);
    const [bankList, setbankList] = useState([]);

    const data = {
        name: "",
        ware_id: 0,
        status: 1,
        trash: 1,
        cashAccount_id: "",
        costcenter_id: 0,
        postingType_id: 0,
        docType_id: 0,
        accounts_no: "",
        accounts_id: "",
        setting_name: "",
        setting_id: "",
        bank_id: 0,
        invoice_type: 2,
        ammount:0,
        date:"",
        cheque_number:"",
        cheque_date:"",
        remarks:"",
        description:""

    };

    const [formData, setFormData] = useState(data);

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    // const filter_accountId = async value => {
    //     const res = await axios.get("/dbBackup/api/filter-accounts", {
    //         params: {
    //             filterdata: value
    //         }
    //     });
    //     setAccountsList(res.data.result);
    // };

    const fetchalllledger_copy = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-ledger");
        if (res.data.status === 200) {
            setLedgers(res.data.ledgers);
        }
    };
    const fetch_All_Setting = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-setting");
        if (res.data.status === 200) {
            setSetting(res.data.setting);
        }
    };

    const handleModalWithValue = obj => {
        setShow(false);
        props.handleAccountsid(obj);
    };

    const handleAccountInput = event => {
        const { name, value } = event.target;

        if (typeof value != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                [name]: value
            }));
        }

        // filter_accountId(value);
    };

    const fetchalldata = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setwarhouseList(res.data.warehouses);
        setcashList(res.data.cashaccount);
        setcostcenterList(res.data.costcenter);
        setbankList(res.data.bankdetails);
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
        return <option value={item.account_no}> {item.cash_name}</option>;
        setFormData(oldState => ({
            ...oldState,
            cashAccount_id: item.account_no
        }));
    });
    const bankDetails = bankList.map(function(item, index) {
        return <option value={item.account_id}> {item.bank_name}</option>;
        setFormData(oldState => ({
            ...oldState,
            bank_id: item.account_id
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
    const acclist = AccountsList.map(function(item, index) {
        return <li value={item.id}> {item.ledger_title}</li>;
        // setFormData(oldState => ({
        //     ...oldState,
        //     docType_id: item.id
        // }));
    });

    const handleAccountsid = object => {
        //console.log("accId="+object.id);
        setFormData(oldState => ({
            ...oldState,
            accounts_no: object.ledger_title,
            accounts_id: object.id
        }));
    };

    const handleSettingsid = object => {
        //console.log("accId="+object.id);
        setFormData(oldState => ({
            ...oldState,
            setting_name: object.name,
            setting_id: object.id
        }));
    };

    const SavePaymentVoucher = async event =>{
        event.preventDefault();
        if(formData.ware_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'WareHouse Cannot Empty!',
                footer: 'Please Enter A Value'
              })
        }
         else if(formData.invoice_type ==1 && formData.bank_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bank Cannot be Empty!',
                footer: 'Please Enter A Value'
              })
        }
         else if(formData.invoice_type ==2 && formData.cashAccount_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cash  Cannot be Empty!',
                footer: 'Please Enter A Value'
              })
        }
        else if(formData.date ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Date Cannot Empty!',
                footer: 'Please Enter A Value'
              })
        }
        else if(formData.description ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Descripton Cannot Empty!',
                footer: 'Please Enter A Value'
              })
        }
        else if(formData.costcenter_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cost Center Cannot be Empty!',
                footer: 'Please Enter A Value'
              })
        }
        else if(formData.postingType_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'WareHouse Cannnot Empty!',
                footer: 'Please Enter A Value'
              })
        }
        else if(formData.postingType_id ==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'WareHouse Cannnot Empty!',
                footer: 'Please Enter A Value'
              })
        }
       else {

        const res = await axios.post(defaultRouteLink+
            "/api/save-paymentvoucher",
            formData
        );
       }

    }

    useEffect(() => {
        fetchalldata();
        fetchalllledger_copy();
        fetch_All_Setting();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Payment Voucher</h2>
                    <form onSubmit={SavePaymentVoucher}>
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
                            {formData.invoice_type == 1 ? (
                                <div className="col-md-3">
                                    <label className="control-label">
                                        Bank Account
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                name="bank_id"
                                                onChange={handleInput}
                                                required
                                            >
                                                <option selected>
                                                    Choose one{" "}
                                                </option>
                                                {bankDetails}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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
                            )}

                            <div className="col-md-3">
                                <label className="control-label">
                                    Account Type{" "}
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="radio"
                                            name="invoice_type"
                                            value="2"
                                            onChange={handleInput}
                                        ></input>
                                        Cash
                                        <input
                                            type="radio"
                                            name="invoice_type"
                                            value="1"
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
                                            name="date"
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
                                            type="number"
                                            value={formData.ammount}
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
                                            name="description"
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
                                            name="cost_center_id"
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
                                            name="posting_type_id"
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
                                            name=""
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
                                <label className="control-label">
                                    Stand By
                                </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="checkbox"></input>
                                    </div>
                                </div>
                            </div>
                            {formData.invoice_type == 1 ? (
                                <>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Cheque Number{" "}
                                        </label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="cheque_number"
                                                    className="form-control"
                                                    onChange={handleInput}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label">
                                            Cheque Date{" "}
                                        </label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="date"
                                                    name="cheque_date"
                                                    className="form-control"
                                                    onChange={handleInput}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <td></td>
                            )}
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
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Accounts No"
                                            name="setting_id"
                                            required
                                            value={formData.setting_name}
                                            data-id={formData.setting_id}
                                            onChange={handleInput}
                                        />

                                        {/* <Typeahead
                                            id="labelkey-example"
                                            labelKey={Setting =>
                                                `${Setting.name}`
                                            }
                                            options={Setting}
                                            value={formData.setting_name}
                                            data-id={formData.setting_id}
                                            name="setting_no"
                                            // onChange={event=>handleAccountInput(event)}
                                            onChange={event=>handleInput(event)}
                                            placeholder="Select your product"
                                        /> */}
                                        {}
                                        {/* <ul>
                                            {acclist}
                                        </ul> */}

                                        <ModalSetting
                                            handleSettingsid={handleSettingsid}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Setting No"
                                            name="accounts_id"
                                            required
                                            value={formData.accounts_no}
                                            data-id={formData.accounts_id}
                                            // onChange={handleInput}
                                            onChange={handleInput}
                                        />
                                        {/* <Typeahead
                                            id="labelkey-example"
                                            labelKey={ledgers =>
                                                `${ledgers.ledger_title}`
                                            }
                                            options={ledgers}
                                            value={formData.accounts_no}
                                            data-id={formData.accounts_id}
                                            name="accounts_no"
                                            // onChange={event=>handleAccountInput(event)}
                                            onChange={handleInput}
                                            placeholder="Select your product"
                                        /> */}
                                        <ModalAccountsLedgerList
                                            handleAccountsid={handleAccountsid}
                                        />
                                    </td>
                                    <td>
                                         <textarea
                                            className="form-control"
                                            placeholder="description"
                                            name="remarks"
                                            required
                                            onChange={handleInput}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ammount"
                                            name="ammount"
                                            required
                                            onChange={handleInput}
                                        />
                                    </td>
                                </tbody>
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
