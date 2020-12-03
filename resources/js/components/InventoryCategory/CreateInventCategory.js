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

const CreateInventCategory = props => {
    // STATE DECLARATION ....
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category_name, setCategory_name] = useState([]);
    const [invent_category, setInvent_category] = useState([]);
    const [root_id, setRoot_id] = useState([]);
    const [root_name, setRoot_name] = useState([]);
    const [id, setid] = useState([]);
    const [status, setStatus] = useState([]);
    const [category_code, setCategory_code] = useState([]);
    const [isBtnSave, setIsBtnSave] = useState(false);

    const handleInput = event => {
        if (event.target.name == "invent_category") {
            setInvent_category(event.target.value);

        } else {
            // setStatus(event.target.value);
            setCategory_code(event.target.value);
        }
    };

    // SAVE FORM DATA METHOD  ....
    const SaveInventCategory = async event => {
        event.preventDefault();

        const data = {
            status: status,
            root_id: root_id,
            category_name: category_name,
            invent_category: invent_category,
            category_code:category_code
        };

        const res = await axios.post(defaultRouteLink+"/api/save-inventcategory", data);
        // UPDATE STATE
        setRoot_id(root_id);
        setInvent_category("");
        fetchallinventCategory();
        setIsBtnSave(false);
    };

    const newInventcategory = async event => {
        event.preventDefault();
        setRoot_name(invent_category);
        setRoot_id(id);

        setInvent_category("");
        setIsBtnSave(true);
    };

    // FORM DATA UPDATE METHOD .....

    const updateInventCategory = async event => {
        event.preventDefault();

        const data = {
            id: id,
            status: status,
            invent_category: invent_category
        };

        const res = await axios.patch(
            defaultRouteLink+`/api/update-inventcategory/${id}`,
            data
        );

        fetchallinventCategory(); // CALLING THIS METHOD FOR DATA REFRESH

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
            title: "Ctaegory Updated  Successfully!!"
        });
    };

    const fetchallinventCategory = async () => {
        const id = props.match.params.id;

        const res = await axios.get(
            defaultRouteLink + "/api/all-inventcategory"
        );
        setList(res.data.list);
        setLoading(false);
    };

    useEffect(() => {
        fetchallinventCategory();
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

                setRoot_id(item.acc_code);
                setInvent_category(item.name);
                setRoot_name(item.root_category);
                setid(item.id);
                // if you want after click do expand/collapse comment this two line
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {item.name}
        </span>
    );

    const handleNodeData = data => {
        console.log("test=" + event);
    };

    if (loading) {
        return (
            <MyBulletListLoader />
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
                                    Category Root :{/*{category_name}*/}
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
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            name="invent_category"
                                            value={
                                                invent_category
                                                // category_name
                                            }
                                            data-id={setid}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                    <br />
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Category Code"
                                            name="category_code"
                                            value={category_code}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>

                                {/* <div className="mt-4">
                                    <select
                                        name="status"
                                        onChange={handleInput}
                                    >
                                        <option disabled>Select Status</option>
                                        <option value="1" selected>
                                            Active
                                        </option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div> */}

                                <div className="mt-4 text-center">
                                    {isBtnSave ? (
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            onClick={SaveInventCategory}
                                            // onClick={newInventcategory}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <div>
                                            <button
                                                className="btn btn-warning"
                                                type="submit"
                                                // onClick={SaveInventCategory}
                                                onClick={newInventcategory}
                                            >
                                                New
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                type="submit"
                                                onClick={updateInventCategory}
                                            >
                                                Update
                                            </button>
                                        </div>
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

export default CreateInventCategory;
