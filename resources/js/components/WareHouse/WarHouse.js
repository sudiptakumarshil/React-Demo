import React, { Component } from "react";
import { Link } from "react-router-dom";

class WarHouse extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />;
        }

        const { warehouse } = this.props;
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
                    {/* <td>{warehouse.resign_code}</td>
                    <td>{warehouse.wh_transfer_interface_account}</td>
                    <td>{warehouse.item_activity}</td>
                    <td>{warehouse.default_cc_code}</td>
                    <td>{warehouse.account_name}</td>
                    <td>{warehouse.branch}</td>
                    <td>{warehouse.pricing_level}</td>
                    <td>{warehouse.global_location_no}</td>
                    <td>{warehouse.longitude}</td>
                    <td>{warehouse.latitude}</td>
                    <td>{warehouse.address}</td>
                    <td>{warehouse.foreign_address}</td> */}
                    <td>
                        <Link
                            to={`/dbBackup/edit-warehouse/${warehouse.id}`}
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
