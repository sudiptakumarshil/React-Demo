//export const getApiServerLinkDataApi="http://localhost:8080/vendor_panel/api/";
//export const getApiServerLink="http://localhost:8080/vendor_panel/";
//export const getApiServerDashboard="http://localhost:8080/vendor_panel/admin_dashboad/";

/*
export const getApiServerLinkDataApi="http://supporta2z.com/vendor_panel/api/";
export const getApiServerLink="http://supporta2z.com/vendor_panel/";
export const getApiServerDashboard="http://supporta2z.com/vendor_panel/admin_dashboad/";
export const defaultRouteLink="/vendor_panel";

*/
import moment from "moment";

export function getCurrentDate(separator = "") {
    //let date= moment().format("DD-MM-YYYY hh:mm:ss");

    let date = moment().format("YYYY-MM-DD");
    console.log("date=" + date);
    return date;
}

// export const getApiServerLinkDataApi = "https://tecn.gov.bd/e-store/api/";
// export const getApiServerLink = "https://tecn.gov.bd/e-store/";
// export const getApiServerDashboard ="https://tecn.gov.bd/e-store/admin_dashboad/";

export const getApiServerLinkDataApi = "http://localhost/estores/api/";
export const getApiServerLink = "http://localhost/estores/";
export const getApiServerDashboard =
    "http://localhost/estores/admin_dashboard/";

export const defaultRouteLink = "/estores";

export const getAccessTokenName = "userId";
export const getAccessTokenNameInfo = "userInfo";
import { getCookieKeyInfo, setCookie, removeCookie } from "./CookieService";
import {
    SET_CURRENT_USER,
    SET_CURRENT_USER_EXIST,
    SET_CURRENT_USER_NOT_FOUND
} from "../actions/user_types";

export const userLogout = props => {
    removeCookie(getAccessTokenName);
    props.history.push(defaultRouteLink + "/admin_login");
};
export const isLoginExist = (props, key) => {
    let isLoginExit = getCookieKeyInfo(key);
    if (typeof isLoginExit != "undefined" && isLoginExit != null)
        props.history.push(defaultRouteLink + "/admin_dashboard");
    else props.history.push(defaultRouteLink + "/admin_login");
};

export const dispatchLoginAction = info => {
    return {
        type: SET_CURRENT_USER,
        user: info
    };
};

// export const dispatchEditAction =  => {
//     return {
//         type: SET_REFRESH_STORETRANSECTION,
//         Edit:
//     };
// };
