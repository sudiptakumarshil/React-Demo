import React, { useEffect, useState } from "react";
import { defaultRouteLink } from "../../common/config";
import { Link } from "react-router-dom";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;
function ManagePaymentVoucher(props) {
    const [paymentVoucherlist, setpaymentVoucherlist] = useState([]);
    const [loading,SetLoading] = useState(true)
    const allPaymentVoucher = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/all-paymentvoucher"
        );
        setpaymentVoucherlist(res.data.all);
        SetLoading(false)
    };

    useEffect(() => {
        allPaymentVoucher();
    }, []);

    if (loading) {
        return (
            <MyBulletListLoader />
        );
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Manage Payment Voucher </h2>
                    <Link
                        to={defaultRouteLink + "/paymentvaucher"}
                        type="button"
                        className="btn btn-primary"
                    >
                        Payment Voucher
                    </Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Invoice Type</th>
                                <th>Voucher No</th>
                                <th>Date</th>
                                <th>Gross Amount</th>
                                <th>Cost Center</th>
                                <th>WareHouse</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentVoucherlist.map(function(item, index) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        {item.invoice_type == 1 ? (
                                            <td>Bank</td>
                                        ) : (
                                            <td>Cash</td>
                                        )}

                                        <td>{item.voucher_no}</td>
                                        <td>{item.date}</td>
                                        <td>{item.gross_amount}</td>
                                        <td>{item.cost_name}</td>
                                        <td>{item.ware_name}</td>

                                        {item.status == 1 ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Inactive</td>
                                        )}
                                        <td>
                                            <Link
                                                to={
                                                    defaultRouteLink +
                                                    `/edit-paymentvoucher/${item.id}`
                                                }
                                                className="btn btn-primary"
                                                type="button"
                                            >
                                                Edit
                                            </Link>
                                        </td>
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

export default ManagePaymentVoucher;
