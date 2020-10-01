import React, { useEffect } from "react";
import {
    BrowserRouter,
    useParams,
    Route,
    Switch,
    IndexRoute
} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./components/Home";
import LoginPage from "./components/Login";
import Header from "./components/Header";
import Orders from "./components/Orders";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { connect } from "react-redux";
import ManageWareHouse from "./Components/WareHouse/ManageWareHouse";
import AddWareHouse from "./Components/WareHouse/addWareHouse";
import EditWareHouse from "./Components/WareHouse/EditWareHouse";
import CreateCustomer from "./components/Customer/CreateCustomer";
import ManageCustomer from "./components/Customer/ManageCustomer";
import EditCustomer from "./components/Customer/EditCustomer";
import CreateInventCategory from "./components/InventoryCategory/CreateInventCategory";
import ManageProduct from "./components/InventoryProduct/ManageProduct";
// for vendor part.....
import CreateVendor from "./Components/Vendor/CreateVendor";
import EditVendor from "./components/Vendor/Edit_vendor";
import ManageVendor from "./Components/Vendor/ManageVendor";
import AddStore from "./components/Store/AddStore";
import ManageStore from "./components/Store/ManageStore";
import EditStore from "./components/Store/EditStore";
import StoreInvoice from "./components/StoreInvoice/AddStoreInvoice";
import {
    defaultRouteLink,
    getAccessTokenName,
    userLogout,
    isLoginExist
} from "./common/config";
import {
    getCookieKeyInfo,
    setCookie,
    removeCookie
} from "./common/CookieService";
import AddProduct from "./components/InventoryProduct/AddProduct";
import EditProduct from "./components/InventoryProduct/EditProduct";

export const Routes = props => {
    let isLoginExit = getCookieKeyInfo(getAccessTokenName);
    useEffect(() => {
        console.log("hoeel");
        isLoginExit = getCookieKeyInfo(getAccessTokenName);
    }, [props]);

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
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-vendor/:id"}
                                render={props => <EditVendor {...props} />}
                            />
                            {/*    route for Customer*/}
                            <Route
                                exact
                                path={defaultRouteLink + "/create-customer"}
                                component={CreateCustomer}
                            />{" "}
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-customer"}
                                component={ManageCustomer}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-customer/:id"}
                                render={props => <EditCustomer {...props} />}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/create-invent-category"
                                }
                                component={CreateInventCategory}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-product"}
                                component={ManageProduct}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-product"}
                                component={AddProduct}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-product/:pe_id"}
                                component={EditProduct}
                            />
                             <Route
                                exact
                                path={defaultRouteLink + "/add-store"}
                                component={AddStore}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-store"}
                                component={ManageStore}
                            />
                           <Route
                                exact
                                path={defaultRouteLink + "/edit-store/:id"}
                                render={props => <EditStore {...props} />}
                            />
                           <Route
                                exact
                                path={defaultRouteLink + "/store-invoice"}
                                component={StoreInvoice}
                            />

                        </Header>
                    ) : (
                        <Route component={NotFound} />
                    )
                }
            />
        </Switch>
    );
};
const mapStateToProps = state => {
    return {
        is_login: state.auth.isAuthenticated
    };
};
export default connect(mapStateToProps, null)(Routes);
