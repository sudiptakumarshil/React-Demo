import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Pagination from "react-js-pagination";
const MyBulletListLoader = () => <BulletList />;

function StockReport2(props) {
    const [categoryList, setcategoryList] = useState([]);
    const [stockReportList, setstockReportList] = useState([]);
    const [loading, setloading] = useState([]);

    const data = {
        category_id: 0,
        activePage: 1,
        total_count: 0,
        limit: 10,
        start_page: 1,
    };
    const [formData, setFormData] = useState(data);

    // FOR GETTING WAREHOUSE WISE STORE
    const getCategory = async wid => {
        const response = await axios.get(
            defaultRouteLink + "/api/all-category"
        );
        if (typeof response.data.category != "undefined") {
            setcategoryList(response.data.category);
            setloading(false);
        } else {
            setcategoryList();
            setloading(false);
        }
    };

    const handleInput = event => {
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    };

    // // for getting warehouse ,store ,product , vendor ,customer,vat....
    // const fetchalldata = async () => {
    //     const response = await axios.get(defaultRouteLink + "/api/all-data");
    //     if (response.data.status === 200) {
    //         setwarehouseList(response.data.warehouses),
    //             setvendorlist(response.data.vendors),
    //             setbankdetailsList(response.data.bankdetails);
    //         setloading(false);
    //     }
    // };

    // const handlePagination = async pageNumber => {
    //     formData.start_page = pageNumber;
    //     const res = await axios.post(
    //         "/dbBackup/api/search-storeInvoice",
    //         formData
    //     );
    //     // console.log(pageNumber);
    //     if (res.data.count >= 0) {
    //         setFormData(oldState => ({
    //             ...oldState,
    //             StoreInvoiceList: res.data.SearchInvoice,
    //             total_count: res.data.count,
    //             activePage: pageNumber
    //         }));
    //     } else {
    //         setFormData(oldState => ({
    //             ...oldState,
    //             StoreInvoiceList: res.data.SearchInvoice,
    //             activePage: pageNumber
    //         }));
    //     }
    // };
    // const searchData = async (event, pageNumber = 1) => {
    //     event.preventDefault();
    //     // handlePagination(1);

    //     // if (res.data.status == 200) {
    //     // setStoreInvoiceList(res.data.SearchInvoice);
    //     // }
    // };
    // };
    const searchData = async (event, pageNumber = 1) => {
        event.preventDefault();
        const res = await axios.post(
            "/dbBackup/api/stock-report",
            formData
        );
        setstockReportList(res.data.StockReport)
    };

    useEffect(() => {
        getCategory();
    }, []);

    // FETCH ALL WAREHOUSE DATA... LOOP
    let categories = categoryList.map((item, index) => {
        return (
            <option value={item.id} data-tokens="item.category_name">
                {item.category_name}
            </option>
        );
        setFormData(oldState => ({
            ...oldState,
            category_id: item.id
        }));
    });

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
                            to={`/dbBackup/sale/${3}`}
                            type="button"
                            className="btn btn-success"
                            style={{ marginLeft: 15 }}
                        >
                            Sale{" "}
                        </Link>
                        <Link
                            to={`/dbBackup/sale-return/${4}`}
                            type="button"
                            className="btn btn-warning"
                            style={{ marginLeft: 15 }}
                        >
                            Sale Return
                        </Link>
                        <Link
                            to={`/dbBackup/issue/${6}`}
                            type="button"
                            className="btn btn-outline-secondary"
                            style={{ marginLeft: 15 }}
                        >
                            Issue
                        </Link>
                        <Link
                            to={`/dbBackup/issue-return/${7}`}
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
                                        Category
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                data-live-search="true"
                                                data-width="fit"
                                                name="category_id"
                                                onChange={handleInput}
                                            >
                                                <option value="0">
                                                    Choose One
                                                </option>
                                                {categories}
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
                                {/* <div className="col-md-3">
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
                                                <option selected value="1">
                                                    New Purshase
                                                </option>
                                                <option selected value="2">
                                                    Purshase Return
                                                </option>
                                                <option selected value="3">
                                                    Sale
                                                </option>
                                                <option selected value="4">
                                                    Sale Return
                                                </option>
                                                <option selected value="6">
                                                    Issue
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
 */}
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

                    <table
                        className="table table-bordered"
                        style={{ marginTop: 30 }}
                    >
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>New Purshase/Qty</th>
                                <th>Purshase Return</th>
                                <th>Issue/Qty</th>
                                <th>Issue Return/Qty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockReportList.map(function(
                                item,
                                index
                            ) {
                                // let type = "";
                                // if (item.type == 1) {
                                //     type = "New Purshase";
                                // } else if (item.type == 2) {
                                //     type = "Purshase Return";
                                // } else if (item.type == 3) {
                                //     type = "Sale";
                                // } else if (item.type == 4) {
                                //     type = "Sale Return";
                                // }

                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.items_id}</td>

                                        <td></td>
                                        <td></td>
                                    </tr>
                                );
                            })}

                            <div>
                                {/* <Pagination
                                    activePage={formData.activePage}
                                    pageRangeDisplayed={10}
                                    itemsCountPerPage={formData.limit}
                                    totalItemsCount={formData.total_count}
                                    onChange={handlePagination}
                                /> */}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StockReport2;
