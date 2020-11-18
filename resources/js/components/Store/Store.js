import React, { Component } from "react";
import { Link } from "react-router-dom";
import { defaultRouteLink } from "../../common/config";
class Store extends Component {
    render() {
        {
            props => <PageStart {...props} key={this.props.location.key} />; // hold customer id from url
        }

        const { store } = this.props;
        return store.map(store => {
            return (
                <tr>
                    <td>{store.id}</td>
                    <td>{store.store_name}</td>
                    <td>{store.remarks}</td>
                    <td>{store.wname}</td>
                    {store.status == 1 ? <td sty>Active</td> : <td>Inactive</td>}
                    <td>
                        <Link
                            to={defaultRouteLink+`/edit-store/${store.id}`}
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

export default Store;
