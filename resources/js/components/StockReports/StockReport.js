import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultRouteLink,getCurrentDate } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Pagination from "react-js-pagination";
const MyBulletListLoader = () => <BulletList />;

function StockReport(props) {
    const [categoryList, setcategoryList] = useState([]);
    const [stockReportData, setStockReportData] = useState([]);
    const [loading, setloading] = useState([]);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const data = {
        category_id: 0,
        activePage: 1,
        total_count: 0,
        limit: 10,
        start_page: 1,
        start_date:getCurrentDate(),
        end_date:getCurrentDate(),

    };
    //console.log("date 44="+getCurrentDate());
    const [formData, setFormData] = useState(data);
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
    const searchData = async (event, pageNumber = 1) => {
        setIsContentLoading(false);
        //setStockReportData([]);
        //setloading(true);
        event.preventDefault();
        const res = await axios.post(
            defaultRouteLink +"/api/stock-report",
            formData
        );
        setStockReportData(res.data.list)
        setIsContentLoading(true);
    };
    useEffect(() => {
        getCategory();
    }, []);
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
    var sl=0;var tp_qty=0;var tpr_qty=0;var ts_qty=0;
    var tsr_qty=0;var tiq=0;var tirq=0;var t_clo_qty=0; var to_qty=0;
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div style={{ marginTop: 30 }}>
                        <Link
                            to={defaultRouteLink+`/new-purshase/${1}`}
                            type="button"
                            className="btn btn-danger"
                            style={{ marginLeft: 15 }}
                        >
                            New Purshase
                        </Link>
                        <Link
                            to={defaultRouteLink+`/purshase-return/${2}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginLeft: 15 }}
                        >
                            Purshase Return{" "}
                        </Link>
                        <Link
                            to={defaultRouteLink+`/sale/${3}`}
                            type="button"
                            className="btn btn-success"
                            style={{ marginLeft: 15 }}
                        >
                            Sale{" "}
                        </Link>
                        <Link
                            to={defaultRouteLink+`/sale-return/${4}`}
                            type="button"
                            className="btn btn-warning"
                            style={{ marginLeft: 15 }}
                        >
                            Sale Return
                        </Link>
                        <Link
                            to={defaultRouteLink+`/issue/${6}`}
                            type="button"
                            className="btn btn-outline-secondary"
                            style={{ marginLeft: 15 }}
                        >
                            Issue
                        </Link>
                        <Link
                            to={defaultRouteLink+`/issue-return/${7}`}
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
                                                value={formData.start_date}
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
                                    }}>
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
                                <th>Code</th>
                                <th>Name</th>
                                <th>O/Qty</th>
                                <th>P/Qty</th>
                                <th>PR/Qty</th>
                                <th>I/Qty</th>
                                <th>IR/Qty</th>
                                <th>S/Qty</th>
                                <th>SR/Qty</th>
                                <th>C/Qty</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                            (isContentLoading) ? (
                            stockReportData.map(function(item,index) {
                                 sl++;
                                 if(item.pqty === null)
                                    item.pqty=0;
                                if(item.prqty === null)
                                    item.prqty=0;
                                if(item.sq === null)
                                    item.sq=0;
                                if(item.srq === null)
                                    item.srq=0;
                                if(item.iq === null)
                                    item.iq=0;
                                if(item.irq === null)
                                    item.irq=0;
                                if(item.oqty === null)
                                    item.oqty=0;
                                if(item.c_qty === null)
                                    item.c_qty=0;

                                to_qty=parseFloat(to_qty) + parseFloat(item.oqty);
                                t_clo_qty=parseFloat(t_clo_qty) + parseFloat(item.c_qty);


                                tp_qty=parseFloat(tp_qty) + parseFloat(item.pqty);
                                tpr_qty=parseFloat(tpr_qty) + parseFloat(item.prqty);
                                 ts_qty=parseFloat(ts_qty) + parseFloat(item.sq);
                                 tsr_qty=parseFloat(tsr_qty) + parseFloat(item.srq);
                                 tiq=parseFloat(tiq) + parseFloat(item.iq);
                                 tirq=parseFloat(tirq) + parseFloat(item.irq);

                                 //tp_qty=parseFloat(item.pqty) + parseFloat(item.pqty);

                                return (
                                    <tr key={item.id}>
                                        <td>{sl}</td>
                                        <td>{item.product_code}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.oqty}</td>
                                        <td>{item.pqty}</td>
                                        <td>{item.prqty}</td>
                                        <td>{item.iq}</td>
                                        <td>{item.irq}</td>
                                        <td>{item.sq}</td>
                                        <td>{item.srq}</td>

                                        <td>{item.c_qty}</td>
                                    </tr>
                                )}

                                )
                            ) : <tr>
                                    <td colSpan={11} style={{textAlign:'center'}}>
                                        <BulletList/>
                                    </td>
                                </tr>}
                                    <tr>
                                        <td style={{textAlign:'right;'}} colSpan={3}>
                                            <strong>
                                                Total
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {to_qty}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {tp_qty}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {tpr_qty}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {ts_qty}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {tsr_qty}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {tiq}
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                {tirq}
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {t_clo_qty}
                                            </strong>
                                        </td>

                                    </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StockReport;
