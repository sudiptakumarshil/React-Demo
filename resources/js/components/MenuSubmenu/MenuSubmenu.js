import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";
const MyBulletListLoader = () => <BulletList />;

const MenuSubmenu = props => {
    // STATE DECLARATION ....
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category_name, setCategory_name] = useState();
    const [invent_category, setInvent_category] = useState();
    const [root_id, setRoot_id] = useState(0);
    const [root_name, setRoot_name] = useState();
    const [id, setid] = useState();
    const [status, setStatus] = useState(1);
    const [category_code, setCategory_code] = useState();
    const [link_id, setlink_id] = useState("");
    const [isBtnSave, setIsBtnSave] = useState(false);
    const [type, settype] = useState(1);

    const handleInput = event => {
        if (event.target.name == "invent_category") {
            setInvent_category(event.target.value);
        } else {
            setlink_id(event.target.value);
        }
    };

    const handleStatusInput = event => {
        setStatus(event.target.value);
    };
    const handleTypeInput = event => {
        // setStatus(event.target.value);
        settype(event.target.value);
    };

    // SAVE FORM DATA METHOD  ....
    const SaveInventCategory = async event => {
        event.preventDefault();

        const data = {
            status: status,
            root_id: root_id,
            category_name: category_name,
            invent_category: invent_category,
            link_id: link_id,
            type: type
        };

        const res = await axios.post(defaultRouteLink + "/api/save-menu", data);
        // UPDATE STATE
        setRoot_id(root_id);
        setInvent_category("");
        fetchAllmenuSubmenu();
        setIsBtnSave(false);
    };

    const newInventcategory = async event => {
        event.preventDefault();
        setRoot_name(invent_category);
        setRoot_id(id);

        setInvent_category("");
        setIsBtnSave(true);
    };

    const refreshPage = event => {
        window.location.reload(false);
    };

    // FORM DATA UPDATE METHOD .....

    const updateInventCategory = async event => {
        event.preventDefault();

        const data = {
            id: id,
            invent_category: invent_category,
            link_id: link_id,
            type: type,
            status: status
        };

        const res = await axios.patch(
            defaultRouteLink + `/api/update-menusubmenu/${id}`,
            data
        );

        fetchAllmenuSubmenu(); // CALLING THIS METHOD FOR DATA REFRESH

        // SUCCESS MESSAGE USING SWEET ALERT ...
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: "success",
            title: "Menu Updated  Successfully!!"
        });
    };

    const deleteMenuSubmenu = async event => {
        event.preventDefault();
        const data = {
            id: id,
            invent_category: invent_category,
            link_id: link_id,
            type: type,
            status: status
        };

        const res = await axios.get(
            defaultRouteLink + `/api/delete-menusubmenu/${id}`
        );

        fetchAllmenuSubmenu(); // CALLING THIS METHOD FOR DATA REFRESH
    };

    const fetchAllmenuSubmenu = async () => {
        const id = props.match.params.id;

        const res = await axios.get(defaultRouteLink + "/api/all-menusubmenu");
        setList(res.data.list);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllmenuSubmenu();
    }, []);

    const renderTree = nodes => (
        <TreeItem
            data-id={nodes.id}
            key={nodes.id}
            nodeId={nodes.id}
            label={renderLabel(nodes)}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map(node => renderTree(node))
                : null}
        </TreeItem>
    );

    const renderLabel = item => (
        <span
            onClick={event => {
                // console.log(item.invent_category);
                // console.log(item.id)
                // console.log(item.name)

                // setActiveItemId(item.id);

                setRoot_id(item.root);
                setInvent_category(item.name);
                setRoot_name(item.root_menu);
                settype(item.type);
                setid(item.id);
                // if you want after click do expand/collapse comment this two line
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {item.text}
        </span>
    );

    const handleNodeData = data => {
        console.log("test=" + event);
    };

    if (loading) {
        return (
            <h2 className="text-center mt-3">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <MyBulletListLoader />
            </h2>
        );
    }

    return (
        <div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group">
                                <label className="control-label">
                                    Menu Root :{/*{category_name}*/}
                                </label>
                                <div>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            name="category_name"
                                            value={root_name}
                                            data-id={root_id}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                    <br />
                                    <label className="control-label">
                                        Menu Name
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            name="invent_category"
                                            value={invent_category}
                                            data-id={setid}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                    <br />
                                    {type == 2 ? (
                                        <>
                                            <label className="control-label">
                                                Link
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    name="link_id"
                                                    value={link_id}
                                                    onChange={handleInput}
                                                ></input>
                                            </div>
                                        </>
                                    ) : (
                                        <td></td>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <select
                                        name="type"
                                        onChange={handleTypeInput}
                                    >
                                        <option selected={type == 1} value="1">
                                            Menu
                                        </option>
                                        <option selected={type == 2} value="2">
                                            Submenu
                                        </option>
                                        {/* <option selected={type == 3} value="3">
                                            Module
                                        </option> */}
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <select
                                        name="status"
                                        onChange={handleStatusInput}
                                    >
                                        <option disabled>Select Status</option>
                                        <option value="1" selected>
                                            Active
                                        </option>
                                        <option value="2">Inactive</option>
                                    </select>
                                </div>

                                <div className="mt-4 text-center">
                                    {isBtnSave ? (
                                        <>
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                onClick={SaveInventCategory}
                                                // onClick={newInventcategory}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-success"
                                                type="submit"
                                                onClick={refreshPage}
                                            >
                                                Refresh
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-warning"
                                                type="submit"
                                                style={{ marginRight: 7 }}
                                                // onClick={SaveInventCategory}
                                                onClick={newInventcategory}
                                            >
                                                New
                                            </button>

                                            <button
                                                className="btn btn-success"
                                                type="submit"
                                                onClick={refreshPage}
                                            >
                                                Refresh
                                            </button>
                                        </>
                                    )}

                                    {root_id && isBtnSave == false ? (
                                        <>
                                            <button
                                                className="btn btn-danger"
                                                type="submit"
                                                onClick={updateInventCategory}
                                                style={{ marginRight: 7 }}
                                            >
                                                Update
                                            </button>
                                        </>
                                    ) : (
                                        <td></td>
                                    )}
                                    {id ? (
                                        <>
                                            <button
                                                className="btn btn-danger"
                                                type="submit"
                                                onClick={deleteMenuSubmenu}
                                                style={{ marginRight: 7 }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <td></td>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        {list.map(item => {
                            return (
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpanded={["root"]}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                    {renderTree(item)}
                                </TreeView>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuSubmenu;
