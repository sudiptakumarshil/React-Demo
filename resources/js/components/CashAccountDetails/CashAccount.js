import React, { Component } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
class CashAccount extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />; // hold Bank details id from url
        }

        const { cashAccounts } = this.props;
        return cashAccounts.map(cashAccount => {
            return (
                <tr>
                    <td>{cashAccount.id}</td>
                    <td>{cashAccount.cash_name}</td>
                    <td>{cashAccount.cash_no}</td>
                    <td>{cashAccount.remarks}</td>
                    <td>{cashAccount.account_no}</td>
                    <td>
                        <Link
                            to={`/dbBackup/edit-cashaccount/${cashAccount.id}`}
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

export default CashAccount;
