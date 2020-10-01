import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
class Customer extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />; // hold customer id from url
        }

        const { customer } = this.props;
        return customer.map(customer => {
            return (
                <tr>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.remarks}</td>
                    <td>{customer.wname}</td>
                    <td>{customer.accounts_no}</td>
                    <td>
                        <Link
                            to={`/dbBackup/edit-customer/${customer.id}`}
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

export default Customer;
