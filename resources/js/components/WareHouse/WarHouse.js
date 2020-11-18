import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { defaultRouteLink } from "../../common/config";


class WarHouse extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />;
        }

        const {warehouse} = this.props;
        // let {data, current_page, per_page, total} = this.state.warehouses;
        return warehouse.map(warehouse => {
            return (
                <tr>
                    <td>{warehouse.id}</td>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.foreign_name}</td>
                    <td>{warehouse.wh_keeper}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.telephone}</td>
                    <td>{warehouse.sequence}</td>
                    <td>{warehouse.province_no}</td>
                    <td>
                        <Link
                            to={`${defaultRouteLink}/edit-warehouse/${warehouse.id}`}
                            className="btn btn-primary"
                            type="button"
                        >
                            Edit
                        </Link>
                    </td>
                </tr>
            );
        });


    }
}

export default WarHouse;
