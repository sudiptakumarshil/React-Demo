import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink, getCurrentDate } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Pagination from "react-js-pagination";
const MyBulletListLoader = () => <BulletList />;
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
function ProductReport(props) {
    const [productList, setproductList] = useState([]);
    const [vendorList, setvendorList] = useState([]);
    const [customerList, setcustomerList] = useState([]);
    const [productReportList, setproductReportList] = useState([]);
    const data = {
        product_id: 0,
        start_page: 1,
        start_date: "",
        end_date: "",
        vendor_id: 0,
        customer_id: 0
    };

    const [formData, setFormData] = useState(data);

    const handleInput = event => {
        const { name, files, value } = event.target;
        if (typeof event.target.value != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                [name]: value
            }));
        }
    };

    const productHandleInput = e => {
        if (typeof e[0] != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                product_id: e[0].id
            }));
        }
    };
    const vendorHandleInput = e => {
        if (typeof e[0] != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                vendor_id: e[0].id
            }));
        }
    };
    const customerHandleInput = e => {
        if (typeof e[0] != "undefined") {
            setFormData(oldState => ({
                ...oldState,
                customer_id: e[0].id
            }));
        }
    };

    const fetchalldata = async () => {
        const response = await axios.get(defaultRouteLink + "/api/all-data");
        if (response.data.status === 200) {
            setproductList(response.data.products);
            setvendorList(response.data.vendors);
            setcustomerList(response.data.customer);
        }
    };

    const searchData = async event => {
        event.preventDefault();
        const res = await axios.post(
            defaultRouteLink + "/api/product-report",
            formData
        );
        const data = {
            product_id: 0,
            start_date: "",
            end_date: "",
            vendor_id: 0,
            customer_id: 0
        };
        setproductReportList(res.data.productReport);
    };

    useEffect(() => {
        fetchalldata();
    }, []);

    return (
        <div>
            <div className="col-md-12" style={{ marginTop: 30 }}>
                <form onSubmit={searchData}>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="control-label">Product</label>
                            <Typeahead
                                id="labelkey-example"
                                labelKey={products =>
                                    `${products.product_name}`
                                }
                                key={products => `${products.product_name}`}
                                options={productList}
                                value={formData.product_id}
                                name="product_id"
                                onChange={e => productHandleInput(e)}
                                placeholder="Select your product"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="control-label">Vendor</label>
                            <Typeahead
                                id="labelkey-example"
                                labelKey={vendors => `${vendors.name}`}
                                key={vendors => `${products.name}`}
                                options={vendorList}
                                value={formData.vendor_id}
                                name="vendor_id"
                                onChange={e => vendorHandleInput(e)}
                                placeholder="Select your product"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="control-label">Customer</label>
                            <Typeahead
                                id="labelkey-example"
                                labelKey={customer => `${customer.name}`}
                                options={customerList}
                                value={formData.customer_id}
                                name="customer_id"
                                onChange={e => customerHandleInput(e)}
                                placeholder="Select your product"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="control-label">Start Date</label>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date}
                                        className="form-control"
                                        onChange={handleInput}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label className="control-label">End Date</label>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date}
                                        className="form-control"
                                        onChange={handleInput}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: 30,
                                marginBottom: 40
                            }}
                        >
                            <button type="submit" className="btn btn-danger">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <table className="table table-bordered" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Invoice Number </th>
                        <th>Party Name</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {productReportList.map((item, index) => {
                        let productType = "";
                        if (item.type == 1) {
                            productType = "NEW PURSHASE";
                        } else if (item.type == 2) {
                            productType = "PURSHASE RETURN";
                        } else if (item.type == 3) {
                            productType = "SALE";
                        } else if (item.type == 4) {
                            productType = "SALE RETURN";
                        } else if (item.type == 6) {
                            productType = "Issue";
                        } else if (item.type == 7) {
                            productType = "issue Return";
                        }
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.invoice_number}</td>
                                <td>{item.party_name}</td>
                                <td>{item.created_at}</td>

                                <td>{productType}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <div>
                    {/* <Pagination
                        activePage={formData.activePage}
                        pageRangeDisplayed={10}
                        itemsCountPerPage={formData.limit}
                        totalItemsCount={formData.total_count}
                        onChange={handlePagination}
                    /> */}
                </div>
            </table>
        </div>
    );
}

export default ProductReport;
