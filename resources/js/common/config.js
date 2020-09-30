//export const getApiServerLinkDataApi="http://localhost:8080/vendor_panel/api/";
//export const getApiServerLink="http://localhost:8080/vendor_panel/";
//export const getApiServerDashboard="http://localhost:8080/vendor_panel/admin_dashboad/";

/*
export const getApiServerLinkDataApi="http://supporta2z.com/vendor_panel/api/";
export const getApiServerLink="http://supporta2z.com/vendor_panel/";
export const getApiServerDashboard="http://supporta2z.com/vendor_panel/admin_dashboad/";
export const defaultRouteLink="/vendor_panel";

*/

export const getApiServerLinkDataApi = "http://localhost/dbBackup/api/";
export const getApiServerLink = "http://localhost/dbBackup/";
export const getApiServerDashboard =
    "http://localhost/dbBackup/admin_dashboad/";
export const defaultRouteLink = "/dbBackup";

export const getAccessTokenName = "userId";
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
