import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import "../css/style_frontend.css";
import ModalAccountsLedgerList from "../modal/ModalAccountsLedgerList";
import ModalSetting from "../modal/ModalSetting";
import { Typeahead } from "react-bootstrap-typeahead";
import { Alert } from "@material-ui/lab";
function EditPayment(props) {
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
    const [selected, setSelected] = useState([0]);
    const [selected_item, setselected_item] = useState([]);
    const { id } = useParams();
    const data = {
        name: "",
        ware_id: 0,
        status: 2,
        trash: 1,
        cashAccount_id: 0,
        costcenter_id: 0,
        postingType_id: 0,
        docType_id: 0,
        bank_id: 0,
        invoice_type: 2,
        date: "",
        cheque_number: 0,
        cheque_date: "",
        ref_no: 0,
        doc_no: 0,
        description: "",
        Addrow: [1],
        isWriteable: true,
        allData: [
            {
                id: 1,
                acc_group_id: 0,
                acc_id: 0,
                remarks: "",
                amount: 0,
                setting_id: 0,
                accounts_id: 0,
                selected_item: 0
            }
        ],
        gross_amount: 0
    };

    const [formData, setFormData] = useState(data);

    const handleInput = event => {
        const { name, files, value } = event.target;
        console.log(value);
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };
    const handleWareHouseInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            ware_id: value
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

    const EditPaymentVoucher = async () => {
        const res = await axios.get(
            defaultRouteLink + `/api/edit-paymentvoucher/${id}`
        );
        const AccGroupId = res.data.accountTransec[0].acc_group_id;
        const acc_info = res.data.accountDetails;
        fetchalldata(AccGroupId);
        setFormData(oldState => ({
            ...oldState,
            ware_id: acc_info.ware_id,
            cashAccount_id: acc_info.cash_id,
            bank_id: acc_info.bank_id,
            invoice_type: acc_info.invoice_type,
            date: acc_info.date,
            gross_amount: acc_info.gross_amount,
            costcenter_id: acc_info.cost_center_id,
            cashAccount_id: acc_info.cash_id,
            ref_no: acc_info.ref_no,
            docType_id: acc_info.doctype_id,
            postingType_id: acc_info.posting_type_id,
            doc_no: acc_info.doc_no,
            description: acc_info.description,
            status: acc_info.status,
            cheque_number: res.data.accountTransec[0].cheque_number,
            cheque_date: res.data.accountTransec[0].cheque_date,
            allData: res.data.accountTransec
            // cashAccount_id: acc_info.bank_id
        }));

        // setFormData(res.data.accountDetails);
    };

    const fetchalldata = async AccGroupId => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setwarhouseList(res.data.warehouses);
        setcashList(res.data.cashaccount);
        setcostcenterList(res.data.costcenter);
        setbankList(res.data.bankdetails);
        setdocType(res.data.docType);
        setpostingType(res.data.postingType);
        setLoading(false);
        setSetting(res.data.setting);
        setLedgers(res.data.ledgers);

        var isExist = res.data.setting.find(item => item.id == AccGroupId);
        // var list = [];
        // list.push(isExist);
        // var data_set = JSON.stringify(list);
        setSelected(isExist ? [isExist] : []);
    };

    const warehouse = warhouseList.map(function(item, index) {
        return (
            <option selected={formData.ware_id == item.id} value={item.id}>
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            ware_id: item.id
        }));
    });

    const cashDetails = cashList.map(function(item, index) {
        return (
            <option
                selected={formData.cashAccount_id == item.account_no}
                value={item.account_no}
            >
                {" "}
                {item.cash_name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            cashAccount_id: item.account_no
        }));
    });
    const bankDetails = bankList.map(function(item, index) {
        return (
            <option
                selected={formData.bank_id == item.account_id}
                value={item.account_id}
            >
                {" "}
                {item.bank_name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            bank_id: item.account_id
        }));
    });

    const costCenter = costcenterList.map(function(item, index) {
        return (
            <option
                selected={formData.costcenter_id == item.id}
                value={item.id}
            >
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            costcenter_id: item.id
        }));
    });

    const postingtype = postingType.map(function(item, index) {
        return (
            <option
                selected={formData.postingType_id == item.id}
                value={item.id}
            >
                {" "}
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            postingType_id: item.id
        }));
    });

    const doctype = docType.map(function(item, index) {
        return (
            <option selected={formData.docType_id == item.id} value={item.id}>
                {" "}
                {item.name}
            </option>
        );
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

    // const setting = Setting.map(list => {
    //     return (
    //         <option
    //             selected={formData.allData[0].acc_group_id == list.id}
    //             value={list.id}
    //         >
    //             {list.name}
    //         </option>
    //     );
    // });
    // const account = ledgers.map(list => {
    //     return (
    //         <option
    //             selected={formData.allData[0].acc_id == list.id}
    //             value={list.id}
    //         >
    //             {list.ledger_title}
    //         </option>
    //     );
    // });

    const handleAccountsid = object => {
        //console.log("accId="+object.id);
        setFormData(oldState => ({
            ...oldState,
            accounts_no: object.ledger_title,
            accounts_id: object.id
            // accounts_no: object.ledger_title,
            // accounts_id: object.id
        }));
    };
    const addRow = event => {
        //const row = formData.Addrow;
        //row.push(event.target.value);
        let id = parseInt(event.target.value) + 1;
        const data = {
            id: id,
            acc_group_id: 0,
            acc_id: 0,
            remarks: "",
            amount: 0
        };
        let list = formData.allData.push(data);
        setFormData(oldState => ({
            ...oldState,
            list
        }));
        //const row = formData.Addrow;
        //setFormData({ Addrow: row });
    };
    const removeRow = event => {
        let id = parseInt(event.target.value) - 1;
        if (id < 1) {
            // alert("ok")
        } else {
            const data = {
                id: id,
                acc_group_id: 0,
                acc_id: 0,
                remarks: "",
                amount: 0,
                setting_name: "",
                setting_id: 0,
                accounts_no: "",
                accounts_id: 0
            };
            let list = formData.allData.pop(data);
            setFormData(oldState => ({
                ...oldState,
                list
            }));
        }
    };

    let totalvalue = 0;
    let rowamount = 0;

    const handleDataInput = (event, item_obj, input_name) => {
        if (typeof event.target != "undefined") {
            const { name, files, value } = event.target;
            if (typeof event != "undefined") {
                let rowId = event.target.getAttribute("data-rowId");

                let isExist = formData.allData.find(item => item.id == rowId);
                if (typeof isExist != "undefined") {
                    isExist[name] = value;
                    setFormData(oldState => ({
                        ...oldState,
                        ["allData"]: formData.allData
                    }));
                }
            }
        } else if (typeof event != "undefined") {
            let isExist = formData.allData.find(item => item.id == item_obj.id);
            // console.log("json="+event);

            if (
                typeof isExist != "undefined" &&
                typeof event[0] != "undefined"
            ) {
                //isExist.selected_item=event;
                isExist[input_name] = event[0].id;
                //console.log("idx", (isExist[input_name] = event[0].id));
                setFormData(oldState => ({
                    ...oldState,
                    ["allData"]: formData.allData
                    //isWriteable:false,
                }));
                // setSelected(input_name)
            }
        }
        //    else if(){}

        formData.allData.map(item => {
            return (
                <div>
                    <input
                        type="hidden"
                        value={(rowamount = parseInt(item.amount))}
                    />
                    <input
                        type="hidden"
                        value={
                            (totalvalue =
                                parseInt(rowamount) + parseInt(totalvalue))
                        }
                    />
                </div>
            );
        });
        setFormData(oldState => ({
            ...oldState,
            gross_amount: totalvalue
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

    const updatePaymentVoucher = async event => {
        event.preventDefault();
        if (formData.ware_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "WareHouse Cannot Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.invoice_type == 1 && formData.bank_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Bank Cannot be Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.invoice_type == 2 && formData.cashAccount_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cash  Cannot be Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.date == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Date Cannot Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.description == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Descripton Cannot Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.costcenter_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cost Center Cannot be Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.postingType_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Posting type Cannnot Empty!",
                footer: "Please Enter A Value"
            });
        } else if (formData.doctype_id == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Doctype Cannnot Empty!",
                footer: "Please Enter A Value"
            });
        } else {
            const res = await axios.patch(
                defaultRouteLink + `/api/update-paymentvoucher/${id}`,
                formData
            );
            if (res.data.status === 200) {
                props.history.push(defaultRouteLink + "/manage-paymentvoucher");
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
                    title: "PaymentVoucher Updated Successfully!!"
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    let sl = 0;

    useEffect(() => {
        fetchalldata();
        EditPaymentVoucher();
        // totalGross();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Payment Voucher</h2>
                    <form onSubmit={updatePaymentVoucher}>
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
                                            onChange={handleWareHouseInput}
                                        >
                                            <option selected value="0">
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
                                            checked={formData.invoice_type == 2}
                                            onChange={handleInput}
                                        ></input>
                                        Cash
                                        <input
                                            type="radio"
                                            name="invoice_type"
                                            value="1"
                                            checked={formData.invoice_type == 1}
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
                                            value={formData.date}
                                            className="form-control"
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Amount</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            value={formData.gross_amount}
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
                                            value={formData.description}
                                            onChange={handleInput}
                                            name="description"
                                        />
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
                                            name="costcenter_id"
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
                                            type="number"
                                            value={formData.ref_no}
                                            name="ref_no"
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
                                            name="postingType_id"
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
                                            name="doctype_id"
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
                                            name="doc_no"
                                            value={formData.doc_no}
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
                                        <input
                                            value="1"
                                            name="status"
                                            type="checkbox"
                                            checked={formData.status == 1}
                                            onChange={handleInput}
                                        ></input>
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
                                                    type="number"
                                                    name="cheque_number"
                                                    value={
                                                        formData.cheque_number
                                                    }
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
                                                    value={formData.cheque_date}
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

                                {formData.allData.map(item => {
                                    sl++;
                                    return (
                                        <>
                                            <tbody>
                                                <td></td>
                                                <td>
                                                    <Typeahead
                                                        id="labelkey-example"
                                                        labelKey={Setting =>
                                                            `${Setting.name}`
                                                        }
                                                        key={Setting =>
                                                            `${Setting.id}`
                                                        }
                                                        placeholder="Accounts No"
                                                        name="acc_group_id"
                                                        options={Setting}
                                                        // value={item.id}
                                                        value={
                                                            item.acc_group_id
                                                        }
                                                        data-rowId={item.id}
                                                        // selected={
                                                        //     item.selected_item
                                                        //         ? item.selected_item
                                                        //         : null
                                                        // }
                                                        selected={selected}
                                                        onChange={event =>
                                                            handleDataInput(
                                                                event,
                                                                item,
                                                                "acc_group_id"
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <Typeahead
                                                        id="labelkey-example"
                                                        labelKey={ledgers =>
                                                            `${ledgers.ledger_title}`
                                                        }
                                                        name="acc_id"
                                                        options={ledgers}
                                                        // value={item.id}
                                                        value={item.acc_id}
                                                        data-rowId={item.id}
                                                        onChange={event =>
                                                            handleDataInput(
                                                                event,
                                                                item,
                                                                "acc_id"
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="description"
                                                        name="remarks"
                                                        data-rowId={item.id}
                                                        value={item.remarks}
                                                        required
                                                        onChange={
                                                            handleDataInput
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Amount"
                                                        name="amount"
                                                        value={item.amount}
                                                        data-rowId={item.id}
                                                        required
                                                        onChange={
                                                            handleDataInput
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <button
                                                        value={item.id}
                                                        className="btn btn-primary"
                                                        onClick={addRow}
                                                        data-rowId={item.id}
                                                    >
                                                        Add Row
                                                    </button>

                                                    <button
                                                        value={item.id}
                                                        className="btn btn-danger"
                                                        style={{
                                                            marginLeft: 5
                                                        }}
                                                        onClick={removeRow}
                                                    >
                                                        Remove Row
                                                    </button>
                                                </td>
                                            </tbody>
                                        </>
                                    );
                                })}
                            </table>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2"></label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <button className="btn btn-primary text-center">
                                        Update
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

export default EditPayment;
