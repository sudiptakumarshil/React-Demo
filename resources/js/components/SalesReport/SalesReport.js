import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink, getCurrentDate } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Pagination from "react-js-pagination";
const MyBulletListLoader = () => <BulletList />;
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

function SalesReport(props) {
    const [allSize, setallSize] = useState([]);
    const [SaleReport, setSaleReport] = useState([]);
    const data = {
        size_id: 0,
        start_date: "",
        end_date: ""
    };

    const getSize = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-data");
        setallSize(res.data.allSize);
    };

    const [formData, setFormData] = useState(data);

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    const searchData = async () => {
        event.preventDefault();
        const res = await axios.post(
            defaultRouteLink + "/api/sales-report",
            formData
        );
        if (res.data.status == 200) {
            setSaleReport(res.data.report);
        }
        const data = {
            size_id: 0,
            start_date: "",
            end_date: ""
        };
        setFormData(data);
    };
    useEffect(() => {
        getSize();
    }, []);

    const Size = allSize.map((item, index) => {
        return <option value={item.id}>{item.name}</option>;
        setFormData(oldState => ({
            ...oldState,
            size_id: item.id
        }));
    });

    return (
        <div>
            <div className="col-md-12" style={{ marginTop: 30 }}>
                <form onSubmit={searchData}>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="control-label">ALL Size</label>
                            <select
                                name="size_id"
                                className="form-control"
                                onChange={handleInput}
                            >
                                <option value="0">Choose One</option>
                                {Size}
                            </select>
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
                        <th>Date</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        {/* <th>Ammount</th>
                        <th>S.Person</th>
                        <th>T.Discount</th>
                        <th>Mobile Number</th>
                        <th>C.Name</th> */}
                    </tr>
                </thead>
                <tbody>
                    {SaleReport.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.created_at}</td>
                                <td>{item.product_code}</td>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesReport;
