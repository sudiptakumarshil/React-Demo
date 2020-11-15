import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import CheckBoxRole from "../../common/CheckBoxRole";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;


function ManageRole(props) {
    const [menuList, setMenuList] = useState([]);
    const [submenuList, setsubmenuList] = useState([]);
    const [loading, setLoading] = useState([]);
    const [submenu, setsubmenu] = useState([]);

    const data = {
        submenu: []
    };
    const [formData, setformData] = useState(data);

    const fetchAllmenu = async () => {
        const res = await axios.get(defaultRouteLink + "/api/get-menu-submenu");
        // console.log(res.data.submenu);
        setMenuList(res.data.list.list);
        setLoading(false);
    };

    const handleAllChecked = event => {

        let newDataSet = menuList;

        newDataSet.forEach( item => {



            if(item.id == event.target.value)
                {
                    //item.isChecked =  event.target.checked
                }
                item.sub_menu.map(sub =>
                    {
                        if (sub.root_id == event.target.value)
                            {

                                sub.isChecked =  event.target.checked;
                                console.log("id44="+sub.id+","+sub.root_id+","+event.target.value+"-"+JSON.stringify(item));
                            }
                    });
            });
            console.log("test3===");
            //callback(newDataSet);
            setMenuList(newDataSet);
    };

    const updateAllChq=(callback)=>{



    }

    const handleCheckChieldElement = event => {

        let newDataSet = menuList;

        newDataSet.forEach( item => {
            item.sub_menu.map(sub =>
            {
               // console.log("id="+sub.id+","+event.target.value)
                if (sub.id == event.target.value)
                    {
                        //console.log("data checked="+event.target.checked);
                        sub.isChecked =  event.target.checked

                    }
            }
            )}
        );
        //console.log("data set="+JSON.stringify(newDataSet));
        setMenuList(newDataSet);

    };

    const saveProductUnit = async event => {
        const res = await axios.post(defaultRouteLink +"/api/save-menu", formData);
    };

    useEffect(() => {
        fetchAllmenu();
    }, []);

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <h2>Role Management</h2>
                    {/* <Link
                        to="/dbBackup/add-unit"
                        type="button"
                        className="btn btn-primary"
                    ></Link> */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Submenu Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuList.map(function(item, index) {
                                if(typeof item.isChecked == 'undefined')
                                    item.isChecked=false;
                                return (

                                        <tr>
                                            <td>{item.id}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    key={item.id}
                                                    onClick={handleAllChecked}
                                                    value={item.id}
                                                    checked={item.isChecked}
                                                />
                                                {item.name}
                                            </td>
                                            <td>
                                                <div className="row">
                                                    {item.sub_menu.map(sub => {
                                                        //if(typeof sub.isChecked != 'undefined' && sub.isChecked)
                                                         console.log("test5="+sub.isChecked+","+""+sub.id+"-"+sub.name);

                                                        return (<CheckBoxRole handleCheckChieldElement={handleCheckChieldElement}  {...sub} />)
                                                    }
                                                        )
                                                }
                                                </div>
                                            </td>
                                        </tr>

                                );
                            })}

                            <button
                                className="btn btn-primary"
                                onClick={saveProductUnit}
                            >
                                Submit
                            </button>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageRole;
