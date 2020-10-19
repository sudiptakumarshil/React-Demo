import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
class BankDetails extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />; // hold Bank details id from url
        }

        const { bankdetails } = this.props;
        return bankdetails.map(bankdetail => {
            return (
                <tr>
                    <td>{bankdetail.id}</td>
                    <td>{bankdetail.bank_name}</td>
                    <td>{bankdetail.bank_no}</td>
                    <td>{bankdetail.address}</td>
                    <td>{bankdetail.account_number}</td>
                    <td>{bankdetail.branch}</td>
                    <td>{bankdetail.account_id}</td>
                    <td>
                        <Link
                            to={`/dbBackup/edit-bankdetails/${bankdetail.id}`}
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

export default BankDetails;
