
import isEmpty from 'lodash/isEmpty';
import {SET_REFRESH_STORETRANSECTION, SET_CURRENT_USER , SET_CURRENT_USER_EXIST,SET_CURRENT_USER_NOT_FOUND} from '../actions/user_types';
const initialState = {
    isAuthenticated: false,
    isUserLogin: {},
    userStatusType : {},
    invoicetransectionList:[],
}

export default (state = initialState, action = {}) =>
{
    switch(action.type)
    {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: true,
                isUserLogin: action.user,
                userStatusType : action.type
            };

        case SET_CURRENT_USER_EXIST:
            return {
                isAuthenticated: false,
                isUserLogin: action.user,
                userStatusType : action.type
            };
        case SET_CURRENT_USER_NOT_FOUND:
            return {
                isAuthenticated: false,
                isUserLogin: action.user,
                userStatusType : action.type
            };

            case SET_REFRESH_STORETRANSECTION:
                let tqty=0;
                action.updateinvoiceTransection.map((item, index) => {
                    tqty=parseFloat(tqty) + parseFloat(item.quantity);
                });
                return {
                    ...state,
                    invoicetransectionList:action.updateinvoiceTransection,
                    tqty:tqty,
                };
        default: return state;
    }


}
