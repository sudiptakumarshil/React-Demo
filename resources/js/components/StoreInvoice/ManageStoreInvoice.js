import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Pagination from "react-js-pagination";

const MyBulletListLoader = () => <BulletList />;

function ManageStoreInvoice(props) {
    // const [StoreInvoiceList, setStoreInvoiceList] = useState([]);
    const [warehouseList, setwarehouseList] = useState([]);
    const [vendorlist, setvendorlist] = useState([]);
    const [customerlist, setcustomerlist] = useState([]);
    const [bankdetailsList, setbankdetailsList] = useState([]);
    const [storelist, setstorelist] = useState([]);
    const [loading, setloading] = useState([]);
    const [isContentLoading, setIsContentLoading] = useState(false);

    const data = {
        invoice_code: 0,
        store_id: 0,
        warehouse_id: 0,
        vendor_id: 0,
        customer_id: 0,
        activePage: 1,
        total_count: 0,
        limit: 10,
        start_page: 1,
        StoreInvoiceList: []
    };
    const [formData, setFormData] = useState(data);

    // FOR GETTING WAREHOUSE WISE STORE
    const get_warhousewiseStore = async wid => {
        let ware_id = wid;
        const response = await axios.get(
            defaultRouteLink + "/api/get-warehouse/" + ware_id
        );
        console.log(response.data.store);
        if (typeof response.data.store != "undefined") {
            setstorelist(response.data.store);
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

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    // for getting warehouse ,store ,product , vendor ,customer,vat....
    const fetchalldata = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");
        if (response.data.status === 200) {
            setwarehouseList(response.data.warehouses),
                setvendorlist(response.data.vendors),
                setcustomerlist(response.data.customer),
                setbankdetailsList(response.data.bankdetails);
            setloading(false);
        }
    };

    const handlePagination = async pageNumber => {
        formData.start_page = pageNumber;
        const res = await axios.post(
            defaultRouteLink + "/api/search-storeInvoice",
            formData
        );
        const data = {
            invoice_code: 0,
            store_id: 0,
            warehouse_id: 0,
            vendor_id: 0,
            customer_id: 0,
            activePage: 1,
            total_count: 0,
            limit: 10,
            start_page: 1,
            StoreInvoiceList: []
        };

        setFormData(data);

        // console.log(pageNumber);
        if (res.data.count >= 0) {
            setFormData(oldState => ({
                ...oldState,
                StoreInvoiceList: res.data.SearchInvoice,
                total_count: res.data.count,
                activePage: pageNumber
            }));
        } else {
            setFormData(oldState => ({
                ...oldState,
                StoreInvoiceList: res.data.SearchInvoice,
                activePage: pageNumber
            }));
        }
        if (res.data.status == 200) {
            setIsContentLoading(false);
        }
    };
    const searchData = async (event, pageNumber = 1) => {
        setIsContentLoading(true);
        event.preventDefault();
        handlePagination(1);

        // if (res.data.status == 200) {
        // setStoreInvoiceList(res.data.SearchInvoice);
        // }
    };
    // FOR DELETE INVOICES
    const deleteInvoice = async e => {
        const removeId = e.target.getAttribute("data-id");
        const response = await axios.get(
            defaultRouteLink + "/api/delete-invoice/" + removeId
        );
        // SUCCESS MESSAGE USING SWEET ALERT
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
                title: "Invoice  Deleted Successfully!!"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "<a href>Why do I have this issue?</a>"
            });
        }
        handlePagination();
        searchData();
    };

    useEffect(() => {
        // fetchallInvoice();
        fetchalldata();
        // deleteInvoice();
    }, []);

    // FETCH ALL WAREHOUSE DATA... LOOP
    let warhouses = warehouseList.map((item, index) => {
        return (
            <option value={item.id} data-tokens="item.name">
                {item.name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            warehouse_id: item.id
        }));
    });
    // FETCH ALL VENDOR DATA... LOOP
    let vendors = vendorlist.map((item, index) => {
        // if (warhouses.length === 0) return 1;

        return (
            <option value={item.id} data-tokens="item.name">
                {" "}
                {item.name}
            </option>
        );

        setFormData(oldState => ({
            ...oldState,
            vendor_id: item.id // UPDATE STATE ..
        }));
    });
    let customers = customerlist.map((item, index) => {
        // if (warhouses.length === 0) return 1;

        return (
            <option value={item.id} data-tokens="item.name">
                {" "}
                {item.name}
            </option>
        );

        setFormData(oldState => ({
            ...oldState,
            customer_id: item.id // UPDATE STATE ..
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
            store_id: parseInt(item.id) // UPDATE STATE ..
        }));
    });

    if (loading) {
        return (
            <MyBulletListLoader />
        );
    }
    if (isContentLoading) {
        return (
            <MyBulletListLoader />
        );
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div style={{ marginTop: 30 }}>
                        <Link
                            to={defaultRouteLink + `/new-purshase/${1}`}
                            type="button"
                            className="btn btn-danger"
                            style={{ marginLeft: 15 }}
                        >
                            New Purshase
                        </Link>
                        <Link
                            to={defaultRouteLink + `/purshase-return/${2}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginLeft: 15 }}
                        >
                            Purshase Return{" "}
                        </Link>
                        <Link
                            to={defaultRouteLink + `/sale/${3}`}
                            type="button"
                            className="btn btn-success"
                            style={{ marginLeft: 15 }}
                        >
                            Sale{" "}
                        </Link>
                        <Link
                            to={defaultRouteLink + `/sale-return/${4}`}
                            type="button"
                            className="btn btn-warning"
                            style={{ marginLeft: 15 }}
                        >
                            Sale Return
                        </Link>
                        <Link
                            to={defaultRouteLink + `/issue/${6}`}
                            type="button"
                            className="btn btn-outline-secondary"
                            style={{ marginLeft: 15 }}
                        >
                            Issue
                        </Link>
                        <Link
                            to={defaultRouteLink + `/issue-return/${7}`}
                            type="button"
                            className="btn btn-outline-primary"
                            style={{ marginLeft: 15 }}
                        >
                            Issue Return
                        </Link>
                    </div>

                    <div className="col-md-12" style={{ marginTop: 30 }}>
                        <form onSubmit={searchData}>
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="control-label">
                                        Invoice Number{" "}
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Invoice Number "
                                                name="invoice_code"
                                                onChange={handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="control-label">
                                        Warehouse
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                data-live-search="true"
                                                data-width="fit"
                                                name="warehouse_id"
                                                onChange={WarehousehandleInput}
                                            >
                                                <option value="0">
                                                    Choose One
                                                </option>
                                                {warhouses}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="control-label">
                                        Vendor
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                data-live-search="true"
                                                name="vendor_id"
                                                onChange={handleInput}
                                            >
                                                <option selected value="0">
                                                    Choose One
                                                </option>
                                                {vendors}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="control-label">
                                        Customer
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                data-live-search="true"
                                                name="customer_id"
                                                onChange={handleInput}
                                            >
                                                <option selected value="0">
                                                    Choose One
                                                </option>
                                                {customers}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="control-label">
                                        Store
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                // className="selectpicker"
                                                data-live-search="true"
                                                // id="exampleFormControlSelect1"
                                                name="store_id"
                                                onChange={handleInput}
                                            >
                                                <option selected value="0">
                                                    Choose One
                                                </option>
                                                {stores}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="control-label">
                                        Start Date
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="date"
                                                name="start_date"
                                                className="form-control"
                                                onChange={handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="control-label">
                                        End Date
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="date"
                                                name="end_date"
                                                className="form-control"
                                                onChange={handleInput}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="control-label">
                                        Type
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                data-live-search="true"
                                                name="type"
                                                onChange={handleInput}
                                            >
                                                <option selected value="0">
                                                    Choose One
                                                </option>

                                                <option value="1">
                                                    New Purshase
                                                </option>
                                                <option value="2">
                                                    Purshase Return
                                                </option>
                                                <option value="3">Sale</option>
                                                <option value="4">
                                                    Sale Return
                                                </option>
                                                <option value="6">Issue</option>
                                                <option value="7">
                                                    Issue Return
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div
                                    style={{
                                        // marginLeft: 600,
                                        marginTop: 30,
                                        marginBottom: 40
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="table-responsive"
                        style={{ overflowX: "auto" }}
                    >
                        <table
                            className="table table-bordered"
                            style={{ marginTop: 30 }}
                        >
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Invoice Number</th>
                                    <th>Type</th>
                                    <th>Vendor/Customer</th>
                                    <th>WareHouse</th>
                                    <th>Date</th>
                                    <th>Store</th>
                                    {/* <th>Gross Amount</th>
                                    <th>Discount Taka</th>
                                    <th>Discount Percent</th>
                                    <th>Cash Amount</th>
                                    <th>Cash</th>
                                    <th>Bank Amount</th>
                                    <th>Bank</th>
                                    <th>Remarks</th>
                                    <th>Total Quantity</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* isContentLoading */}
                                {formData.StoreInvoiceList.map(function(
                                    item,
                                    index
                                ) {
                                    let type = "";
                                    if (item.type == 1) {
                                        type = "New Purshase";
                                    } else if (item.type == 2) {
                                        type = "Purshase Return";
                                    } else if (item.type == 3) {
                                        type = "Sale";
                                    } else if (item.type == 4) {
                                        type = "Sale Return";
                                    } else if (item.type == 6) {
                                        type = "Issue";
                                    } else if (item.type == 7) {
                                        type = "Issue Return ";
                                    }

                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.invoice_number}</td>
                                            <td>{type}</td>

                                            <td>{item.vendor}</td>

                                            <td>{item.ware_name}</td>
                                            <td>{item.date}</td>
                                            <td>{item.store_name}</td>
                                            {/* <td>{item.gross_amount}</td>
                                            <td>{item.discount_taka}</td>
                                            <td>{item.discount_percent}</td>
                                            <td>{item.cash_amount}</td>
                                            <td>{item.cash_name}</td>
                                            <td>{item.bank_amount}</td>
                                            <td>{item.bank_name}</td>
                                            <td>{item.remarks}</td>
                                            <td>{item.total_quantity}</td> */}
                                            <td className="text-nowrap">
                                                {item.type == 6 ||
                                                item.type == 7 ? (
                                                    <>
                                                        <Link
                                                            to={
                                                                defaultRouteLink +
                                                                `/edit-issuestoreinvoice/${item.id}/${item.type}`
                                                            }
                                                            className="btn btn-primary"
                                                            type="button"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Link
                                                            to={
                                                                defaultRouteLink +
                                                                `/issue-store-invoice-print/${item.id}/${item.type}`
                                                            }
                                                            className="btn btn-outline-info"
                                                            type="button"
                                                        >
                                                            Print
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            to={
                                                                defaultRouteLink +
                                                                `/edit-storeinvoice/${item.id}/${item.type}`
                                                            }
                                                            className="btn btn-primary"
                                                            type="button"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Link
                                                            to={
                                                                defaultRouteLink +
                                                                `/store-invoice-print/${item.id}/${item.type}`
                                                            }
                                                            className="btn btn-outline-info"
                                                            type="button"
                                                        >
                                                            Print
                                                        </Link>
                                                    </>
                                                )}

                                                <button
                                                    onClick={deleteInvoice}
                                                    className="btn btn-danger"
                                                    data-id={item.id}
                                                >
                                                    Delete
                                                </button>
                                                {/*
                                            <Link
                                                to={
                                                    defaultRouteLink +
                                                    `/store-invoice-print/${item.id}/${item.type}`
                                                }
                                                className="btn btn-outline-info"
                                                type="button"
                                            >
                                                Print
                                            </Link> */}

                                                {item.type == 6 &&
                                                item.total_quantity >
                                                    item.total_rqty ? (
                                                    <Link
                                                        to={
                                                            defaultRouteLink +
                                                            `/return/${
                                                                item.id
                                                            }/${7}`
                                                        }
                                                        className="btn btn-primary"
                                                        type="button"
                                                    >
                                                        Return{" "}
                                                    </Link>
                                                ) : (
                                                    <td></td>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <div>
                                    <Pagination
                                        activePage={formData.activePage}
                                        pageRangeDisplayed={10}
                                        itemsCountPerPage={formData.limit}
                                        totalItemsCount={formData.total_count}
                                        onChange={handlePagination}
                                    />
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageStoreInvoice;
