
import React, { Component, useState,useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import {defaultRouteLink} from '../../common/config';
import ContentLoader, { Facebook,BulletList  } from 'react-content-loader'
const MyBulletListLoader = () => <BulletList />


const ModalAccountsLedgerList=(props)=> {

    const [show, setShow] = useState(false);
    const [ledgers, setLedgers] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchalllledger_copy = async () => {
        const res = await axios.get(defaultRouteLink+"/api/all-ledger");
        if (res.data.status === 200) {
            setLedgers(res.data.ledgers);
        }
    };
    const handleModalWithValue=(obj)=>{
        setShow(false);
        props.handleAccountsid(obj);
    }

    useEffect(()=>{
        if(show && ledgers.length <= 0){
            fetchalllledger_copy();
        }
        $(document).ready(function() {
            $('#example').DataTable();
        } );
    },[show,ledgers])

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
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-12" style={{maxHeight:'300px',overflow:"auto"}}>
                            {
                                (ledgers.length <= 0) ? (
                                    <MyBulletListLoader/>
                                ) :(
                                    <table
                                        id="example"
                                        className="table table-striped table-bordered nowrap table_witdh">
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Title</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                ledgers.map(ledger=>{
                                                    return (
                                                        <tr onClick={()=>handleModalWithValue(ledger)}>
                                                            <td>{ledger.id}</td>
                                                            <td>{ledger.ledger_title}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            )
                        }
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
    }

export default ModalAccountsLedgerList;
