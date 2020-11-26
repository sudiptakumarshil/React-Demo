import React,{ useState,useEffect }  from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter,Redirect } from "react-router-dom";
import {defaultRouteLink,getApiServerLinkDataApi} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';
import Pusher from 'pusher-js';
import OrderStatusData from './order/OrderStatusData';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const pusher = new Pusher('a9cdb39cd7355f9e1675', {
    cluster: 'ap2',
    encrypted: true
  });

 const Dashboard=(props)=>{
    const [countOrderStatus,setCountOrderStatus]=useState([]);
    const [isNewOrder,setIsNewOrder]=useState(false);


    const channel = pusher.subscribe('channel-order');
    channel.bind('event-order', data => {
        setIsNewOrder(true);
        setCountOrderStatus(data.order_info);

    });
    async function fetchOrderStatusInfo()
    {
        const res = axios.get(getApiServerLinkDataApi+"client/getOrderStatus")
              .then(res =>
                {
                    setCountOrderStatus(res.data.order_info);
                }).catch(function(err)
                {
                    setCountOrderStatus([]);
                })
    }
    useEffect(()=>{
       // fetchOrderStatusInfo();
    },[]);
    let newOrder=(isNewOrder) ? (
        <Alert variant="success">
            <Alert.Heading>New order is placed</Alert.Heading>
        </Alert>
    ) : (<span></span>)
    return(
        <div className="col-12">
             {/* <h1>sdfsfs</h1> */}
        </div>
    )
 }
 export default Dashboard;
