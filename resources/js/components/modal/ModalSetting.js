import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import { defaultRouteLink } from "../../common/config";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
import Datatable from "react-bs-datatable"; // Import this package
import "bootstrap/dist/css/bootstrap.css";
const MyBulletListLoader = () => <BulletList />;

const ModalSetting = props => {
    const [show, setShow] = useState(false);
    const [Setting, setSetting] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetch_All_Setting = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-setting");
        if (res.data.status === 200) {
            setSetting(res.data.setting);
        }
    };
    const handleModalWithValue = obj => {
        setShow(false);
        props.handleSettingsid(obj);
    };

    useEffect(() => {
        if (show && Setting.length <= 0) {
            fetch_All_Setting();
        }
        $(document).ready(function() {
            $('#example').DataTable();
        } );
    }, [show, Setting]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="fa fa-download" aria-hidden="true"></i>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="dialog_accounts_ledger"
                aria-labelledby="example-custom-modal-styling-title"
                style={{ opacity: 1 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Setting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="col-12"
                        style={{ maxHeight: "300px", overflow: "auto" }}
                    >
                        {Setting.length <= 0 ? (
                            <MyBulletListLoader />
                        ) : (
                            <table
                                id="example"
                                className="table table-striped table-bordered nowrap table_witdh"
                            >
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Setting.map(setting => {
                                        return (
                                            <tr
                                                onClick={() =>
                                                    handleModalWithValue(
                                                        setting
                                                    )
                                                }
                                            >
                                                <td>{setting.id}</td>
                                                <td>{setting.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSetting;
