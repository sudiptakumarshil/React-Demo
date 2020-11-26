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
import AddBankDetails from "./components/BankDetails/AddBankDetails";
import ManageBankDetails from "./components/BankDetails/ManageBankDetails";
import EditBankDetails from "./components/BankDetails/BankDetailsEdit";
import AddCashAccount from "./components/CashAccountDetails/AddCashAccount";
import ManageCashAccount from "./components/CashAccountDetails/ManageCashAccount";
import EditCashAccount from "./components/CashAccountDetails/EditCashAccount";
import ManageStoreInvoice from "./components/StoreInvoice/ManageStoreInvoice";
import ManageInvoiceParams from "./components/InvoiceParams/manageParams";
import EditParams from "./components/InvoiceParams/editParams";
import QuickPurshase from "./components/StoreInvoice/QuickPurshase";
import ProductUnit from "./components/ProductUnit/ProductUnit";
import AddUnit from "./components/productUnit/AddProductUnit";
import EditUnit from "./components/productUnit/EditProductUnit";
import AddAccountInput from "./components/AccountsInput/addAccountsInput";
import ManageAccountInput from "./components/AccountsInput/ManageAccountInput";
import EditAccountInput from "./components/AccountsInput/EditAccountsInput";
import ManageCostCenter from "./components/CostCenter/ManageCostCenter";
import AddCostCenter from "./components/CostCenter/AddCostCenter";
import EditCostCenter from "./components/CostCenter/EditCostCenter";
import PaymentVoucher from "./components/PaymentVoucher/PaymentVoucher";
import Issue from "./components/StoreInvoice/IssueStoreInvoice";
import StockReport from "./components/StockReports/StockReport";
import ManageRole from "./components/RoleManagement/ManageRole";
import IssueReturn from "./components/StoreInvoice/ReturnInvoice";
import ProductReport from "./components/ProductReport/ProductReport";
import IssueStoreInvoicePrint from "./components/StoreInvoice/IssueStoreInvoicePrint";

import CreateSaleMan from "./components/SalesMan/CreateSalesMan";
import ManageSaleMan from "./components/SalesMan/ManageSalesMan";
import EditSalesMan from "./components/SalesMan/EditSalesMan";
import ManageSize from "./components/Size/ManageSize";
import AddSize from "./components/Size/AddSize";
import EditSize from "./components/Size/EditSize";
import SalesReport from "./components/SalesReport/SalesReport";
import ManageMenuSubmenu from "./components/MenuSubmenu/MenuSubmenu";
import ManageModule from "./components/ModuleList/ManageModule";

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
import EditInvoice from "./components/StoreInvoice/EditStoreInvoice";
import EditIssueInvoice from "./components/StoreInvoice/EditissueInvoice";
import {
    StoreInvoicePrint2,
    StoreInvoicePrint
} from "./components/StoreInvoice/store-invoice-print";

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
                            {/* <Route
                                exact
                                path={defaultRouteLink + "/store-invoice"}
                                component={StoreInvoice}
                            /> */}
                            <Route
                                exact
                                path={defaultRouteLink + "/new-purshase/:idx"}
                                render={props => <StoreInvoice {...props} />}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/purshase-return/:idx"
                                }
                                render={props => <StoreInvoice {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/sale-return/:idx"}
                                render={props => <StoreInvoice {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/sale/:idx"}
                                render={props => <StoreInvoice {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/quick-purshase/:idx"}
                                render={props => <QuickPurshase {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/issue/:idx"}
                                render={props => <Issue {...props} />}
                            />
                            {/* <Link to={`/dbBackup/issue-return/${7}`} */}
                            <Route
                                exact
                                path={defaultRouteLink + "/issue-return/:idx"}
                                render={props => <Issue {...props} />}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink +
                                    "/edit-storeinvoice/:id/:idx"
                                }
                                render={props => <EditInvoice {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-bank-details"}
                                component={AddBankDetails}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-bank-details"}
                                component={ManageBankDetails}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/edit-bankdetails/:id"
                                }
                                render={props => <EditBankDetails {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-cash-account"}
                                component={AddCashAccount}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-cash-account"}
                                component={ManageCashAccount}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/edit-cashaccount/:id"
                                }
                                render={props => <EditCashAccount {...props} />}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/manage-store-invoice"
                                }
                                component={ManageStoreInvoice}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink +
                                    "/store-invoice-print/:id/:idx"
                                }
                                render={props => (
                                    <StoreInvoicePrint {...props} />
                                )}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink +
                                    "/issue-store-invoice-print/:id/:idx"
                                }
                                render={props => (
                                    <IssueStoreInvoicePrint {...props} />
                                )}
                            />
                            {/* <Route
                                exact
                                path={
                                    defaultRouteLink + "/store-invoice-print"
                                }
                                component={StoreInvoicePrint}
                            /> */}
                            <Route
                                exact
                                path={
                                    defaultRouteLink +
                                    "/edit-issuestoreinvoice/:id/:idx"
                                }
                                render={props => (
                                    <EditIssueInvoice {...props} />
                                )}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/manage-invoiceparams"
                                }
                                component={ManageInvoiceParams}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-params/:id"}
                                render={props => <EditParams {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-unit"}
                                component={ProductUnit}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-unit"}
                                component={AddUnit}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-unit/:id"}
                                render={props => <EditUnit {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-account-input"}
                                component={AddAccountInput}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/manage-account-input"
                                }
                                component={ManageAccountInput}
                            />
                            <Route
                                exact
                                path={
                                    defaultRouteLink + "/edit-account-input/:id"
                                }
                                render={props => (
                                    <EditAccountInput {...props} />
                                )}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-costcenter"}
                                component={ManageCostCenter}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-costcenter"}
                                component={AddCostCenter}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-costcenter/:id"}
                                render={props => <EditCostCenter {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/paymentvaucher"}
                                component={PaymentVoucher}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/stock-report"}
                                component={StockReport}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-role"}
                                component={ManageRole}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/return/:id/:idx"}
                                render={props => <IssueReturn {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/product-report"}
                                component={ProductReport}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-salesman"}
                                component={CreateSaleMan}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-salesman"}
                                component={ManageSaleMan}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-salesman/:id"}
                                render={props => <EditSalesMan {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-size"}
                                component={ManageSize}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/add-size"}
                                component={AddSize}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/edit-size/:id"}
                                render={props => <EditSize {...props} />}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/sales-report"}
                                component={SalesReport}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/manage-module"}
                                component={ManageModule}
                            />
                            <Route
                                exact
                                path={defaultRouteLink + "/menu-submenu"}
                                component={ManageMenuSubmenu}
                            />
                        </Header>
                    ) : (
                        <Route component={LoginPage} />
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
