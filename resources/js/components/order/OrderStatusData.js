import React,{ useState,useEffect }  from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';

const OrderStatusData=(props)=>{
    let list=(props.orderStatus.length > 0) ? (
        props.orderStatus.map(row => {
            return(
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header bg-info text-white">
                            <h4>{row.name}</h4>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-center">
                                <span style={{fontSize:'25px',fontWeight:'bold'}}>{row.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    ) : (<h1>Loading.....</h1>)
    return(
        <div className="row">
            {list}
        </div>
    )
}
export default OrderStatusData;