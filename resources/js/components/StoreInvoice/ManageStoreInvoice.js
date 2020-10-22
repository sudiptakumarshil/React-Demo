import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;

function ManageStoreInvoice(props) {
    const [StoreInvoiceList, setStoreInvoiceList] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetchallInvoice();
    }, []);

    // GET ALL STORE INVOICE ---
    const fetchallInvoice = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-storeInvoice");
        setStoreInvoiceList(res.data.store_invoices);
        setLoading(false);
        // console.log(res.data.store_invoices);
    };

    if (loading) {
        return (
            <h2 className="text-center mt-3">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <MyBulletListLoader />
            </h2>
        );
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div style={{ marginTop: 30 }}>
                        <Link
                            to={`/dbBackup/new-purshase/${1}`}
                            type="button"
                            className="btn btn-danger"
                            style={{ marginLeft: 15 }}
                        >
                            New Purshase
                        </Link>
                        <Link
                            to={`/dbBackup/purshase-return/${2}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginLeft: 15 }}
                        >
                            Purshase Return{" "}
                        </Link>
                        <Link
                            to={`/dbBackup/sale-return/${3}`}
                            type="button"
                            className="btn btn-success"
                            style={{ marginLeft: 15 }}
                        >
                            Sale Return{" "}
                        </Link>
                        <Link
                            to={`/dbBackup/sale/${4}`}
                            type="button"
                            className="btn btn-warning"
                            style={{ marginLeft: 15 }}
                        >
                            Sale
                        </Link>
                    </div>
                    <table
                        className="table table-bordered"
                        style={{ marginTop: 30 }}
                    >
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Invoice Number</th>
                                <th>Vendor Name</th>
                                <th>WareHouse</th>
                                <th>Date</th>
                                <th>Store</th>
                                <th>Gross Amount</th>
                                <th>Discount Taka</th>
                                <th>Discount Percent</th>
                                <th>Cash Amount</th>
                                <th>Cash</th>
                                <th>Bank Amount</th>
                                <th>Bank</th>
                                <th>Remarks</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {StoreInvoiceList.map(function(item, index) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.invoice_number}</td>
                                        <td>{item.vendor}</td>
                                        <td>{item.ware_name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.store_name}</td>
                                        <td>{item.gross_amount}</td>
                                        <td>{item.discount_taka}</td>
                                        <td>{item.discount_percent}</td>
                                        <td>{item.cash_amount}</td>
                                        <td>{item.cash_name}</td>
                                        <td>{item.bank_amount}</td>
                                        <td>{item.bank_name}</td>
                                        <td>{item.remarks}</td>
                                        {/* <td>
                                            <Link
                                                to={`/dbBackup/edit-product/${item.id}`}
                                                className="btn btn-primary"
                                                type="button"
                                            >
                                                Edit
                                            </Link>
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageStoreInvoice;
