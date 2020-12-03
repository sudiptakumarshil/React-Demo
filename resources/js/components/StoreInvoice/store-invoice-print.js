import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Axios from "axios";

export function StoreInvoicePrint(props) {
    const { id } = useParams();
    const data = {
        // ware_name:"",
        // vendor:"",
    };
    const [invoicedata, setinvoicedata] = useState(data);
    const [invtrasection, setinvtrasection] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(
            defaultRouteLink + `/api/invoice-print/${id}`
        );
        setinvoicedata(res.data.invoicePrint);
        setinvtrasection(res.data.invotransec);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-md-12">
                    <table style={{ width: "100%" }}>
                        <tr style={{ borderBottom: "1px solid #000" }}>
                            <td>
                                <h4 style={{ textAlign: "center" }}>E-Store</h4>
                                <p style={{ textAlign: "center" }}>
                                    {invoicedata.ware_address}
                                </p>
                            </td>
                            <button type="button" className="btn btn-primary">
                                Print
                            </button>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="row">
                <div
                    className="col-sm-4"
                    style={{ fontSize: 13, fontWeight: 500 }}
                >
                    <p className="mb-1">Ware: {invoicedata.ware_name}</p>
                    {/* <p className="mb-1">Request No: 1015 </p>
                    <p className="mb-1">Vendor Quotation: </p> */}
                </div>
                <div
                    className="col-sm-4"
                    style={{ fontSize: 13, fontWeight: 500 }}
                >
                    {/* <p className="mb-1">Description: </p> */}
                    <p className="mb-1">
                        {invoicedata.vtype == 1 ? "Vendor" : "Customer"}:{" "}
                        {invoicedata.vendor}
                    </p>
                    {/* <p className="mb-1">Vendor Code: 1001</p> */}
                </div>

                <div
                    className="col-sm-4 right-info"
                    style={{ fontSize: 13, fontWeight: 500 }}
                >
                    {/* <p className="mb-1">Reason: </p> */}
                    <p className="mb-1">Date: {invoicedata.created_at}</p>
                    {/* <p className="mb-1">Vat Reg No: 0</p> */}
                </div>
            </div>

            <div className="table-responsive-sm">
                <table
                    className="grn-table table-bordered table-striped mb-0"
                    style={{ fontSize: 12, width: "100%" }}
                >
                    <thead>
                        <tr>
                            <th className="text-center">Sl</th>
                            <th>Product</th>
                            <th className="text-center">Unit</th>
                            <th className="text-center">Quantity</th>
                            {/* <th className="text-center">Price</th>
                            <th className="text-center">Total Price</th>
                            <th className="text-center">Price Without Vat</th> */}
                            <th className="text-center">Discount(%)</th>
                            <th className="text-center">Vat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invtrasection.map((item, index) => {
                            return (
                                <tr>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="">{item.product_name}</td>
                                    <td className="text-center">
                                        {" "}
                                        {item.unit_name}
                                    </td>
                                    <td className="text-center">
                                        {" "}
                                        {item.quantity}
                                    </td>
                                    {/* <td className="text-center">
                                        {" "}
                                        {item.price}
                                    </td>
                                    <td className="text-right"> 250</td>

                                    <td className="text-right"> 238.1</td> */}

                                    <td className="text-right">
                                        {" "}
                                        {item.discount_percent}
                                    </td>

                                    <td className="text-center">{item.vat}</td>
                                </tr>
                            );
                        })}
                        {/* <tr>
                            <td className="text-center">2</td>
                            <td className="">Light</td>
                            <td className="text-center"> PCS</td>
                            <td className="text-center"> 10</td>
                            <td className="text-center"> 500</td>
                            <td className="text-right"> 5000</td>

                            <td className="text-right"> 4545.45</td>

                            <td className="text-right"> 5%</td>

                            <td className="text-center"> 10%</td>
                        </tr> */}
                        {/* <tr>
                            <td colSpan="8" className="text-right">
                                <b>Amount Total</b>
                            </td>
                            <td className="text-right">
                                <b>4783.55</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Invoice Discount</b>
                            </td>
                            <td className="text-right">
                                <b>239.1775</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Net Amount</b>
                            </td>
                            <td className="text-right">
                                <b>4544.3725</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Total Tax Amount</b>
                            </td>
                            <td className="text-right">
                                <b>443.13</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Sub Total</b>
                            </td>
                            <td className="text-right">
                                <b>4987.5025</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Other Charge</b>
                            </td>
                            <td className="text-right">
                                <b>0</b>
                            </td>
                        </tr>

                     */}
                        <tr>
                            <td colSpan="8" className="text-right">
                                <b>Gross Amount</b>
                            </td>
                            <td className="text-right">
                                <b>{invoicedata.gross_amount}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                className="report-signature"
                style={{
                    display: "none",
                    marginTop: 35,
                    paddingBottom: 35,
                    clear: "both",
                    padding: 0
                }}
            >
                <div
                    className=""
                    style={{
                        float: "left",
                        width: "33.3334%",
                        textAlign: "center"
                    }}
                >
                    <div className="footer-sign-image">
                        {/*<img src="https://purevat.com/erp_dev/assets/img/user_signature/2020-11-07-15-15-46.jpeg"*/}
                        {/*     alt="">*/}
                    </div>
                    <span
                        style={{
                            margin: "0 45",
                            display: "inlineBlock",
                            borderTop: "1 solid #ddd"
                        }}
                    >
                        Purchaser
                    </span>
                </div>
                <div
                    className=""
                    style={{
                        float: "left",
                        width: "33.3334%",
                        textAlign: "center"
                    }}
                >
                    <div className="footer-sign-image">
                        {/*<img src="https://purevat.com/erp_dev/assets/img/user_signature/2020-11-07-15-15-46.jpeg"*/}
                        {/*     alt="">*/}
                    </div>
                    <span
                        style={{
                            margin: "0 45",
                            display: "inlineBlock",
                            borderTop: "1 solid #ddd"
                        }}
                    >
                        Purchase Manager
                    </span>
                </div>
                <div
                    className=""
                    style={{
                        margin: "0 45",
                        display: "inlineBlock",
                        borderTop: "1 solid #ddd"
                    }}
                >
                    <div className="footer-sign-image">
                        {/*<img src="https://purevat.com/erp_dev/assets/img/user_signature/2020-11-07-15-15-46.jpeg"*/}
                        {/*     alt="">*/}
                    </div>
                    <span
                        style={{
                            margin: "0 45",
                            display: "inlineBlock",
                            borderTop: "1 solid #ddd"
                        }}
                    >
                        Finance Controller
                    </span>
                </div>
            </div>
        </div>
    );
}

export function StoreInvoicePrint2(props) {
    return <p></p>;
}
