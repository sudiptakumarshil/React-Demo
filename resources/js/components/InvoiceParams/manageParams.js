import React, { useState, useEffect } from "react";
import { defaultRouteLink } from "../../common/config";
import { Link, useParams } from "react-router-dom";
function manageParams(props) {
    const [paramsList, setparamsList] = useState([]);

    const fetchallParams = async event => {
        const res = await axios.get(defaultRouteLink + "/api/all-params");
        setparamsList(res.data.params);
    };

    useEffect(() => {
        fetchallParams();
    }, []);
    let type = "";
    let discountMethod = "";
    
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr style={{marginTop:3}}>
                                <th>SL</th>
                                <th>Type</th>
                                <th>Discount Method</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paramsList.map(function(item, index) {
                                if (item.type == 1) {
                                    type = "new purshase";
                                } else if (item.type == 2) {
                                    type = "purshase return";
                                } else if (item.type == 3) {
                                    type = "Sale";
                                } else {
                                    type = "Sale return";
                                }
                                if (item.discount_method == 1) {
                                    discountMethod = "invoice wise ";
                                } else {
                                    discountMethod = "product wise ";
                                }
                                return (
                                    <tr>
                                        <td>{item.id}</td>

                                        <td>{type}</td>
                                        <td>{discountMethod}</td>
                                        <td>
                                            <Link
                                                to={`/dbBackup/edit-params/${item.id}`}
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

export default manageParams;
