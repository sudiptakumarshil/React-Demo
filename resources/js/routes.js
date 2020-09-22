import React,{useEffect} from 'react';
import { BrowserRouter, Route, Switch, IndexRoute } from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './components/Home';
import LoginPage from './components/Login';
import Header from './components/Header';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { connect } from 'react-redux'
import ManageWareHouse from './Components/WareHouse/ManageWareHouse'
import AddWareHouse from './Components/WareHouse/addWareHouse';
import EditWareHouse from './Components/WareHouse/EditWareHouse';
// for vendor part.....
import CreateVendor from './Components/Vendor/CreateVendor';
import ManageVendor from './Components/Vendor/ManageVendor'

import {defaultRouteLink,getAccessTokenName,userLogout,isLoginExist} from './common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from './common/CookieService'

export const Routes=(props)=> {

  let isLoginExit=getCookieKeyInfo(getAccessTokenName);
  useEffect(()=>{
    console.log("hoeel");
     isLoginExit=getCookieKeyInfo(getAccessTokenName);
  },[props]);

  return (
      <Switch>
          <Route
              exact
              path={defaultRouteLink + "/admin_login"}
              component={LoginPage}
          />
          <Route
              exact
              path="*"
              render={() =>
                  isLoginExit ? (
                      <Header>
                          <Route
                              exact
                              path={defaultRouteLink + "/admin_dashboard"}
                              component={Dashboard}
                          />
                          <Route
                              exact
                              path={defaultRouteLink + "/order"}
                              component={Orders}
                          />
                          {/* Route for Warhouse */}
                          <Route
                              exact
                              path={defaultRouteLink + "/add-warehouse"}
                              component={AddWareHouse}
                          />

                          <Route
                              exact
                              path={defaultRouteLink + "/manage-warehouse"}
                              component={ManageWareHouse}
                          />

                          <Route
                              exact
                              path={defaultRouteLink + "/edit-warehouse/:id"}
                              render={props => <EditWareHouse {...props} />}
                          />

                          {/* route for Vendor creation */}
                          <Route
                              exact
                              path={defaultRouteLink + "/create-vendor"}
                              component={CreateVendor}
                          />
                          <Route
                              exact
                              path={defaultRouteLink + "/manage-vendor"}
                              component={ManageVendor}
                          />
                      </Header>
                  ) : (
                      <Route component={NotFound} />
                  )
              }
          />
      </Switch>
  );
  }
  const mapStateToProps = (state)=>{
    return{
        is_login: state.auth.isAuthenticated,
    }
}
export default connect(mapStateToProps,null)(Routes)
