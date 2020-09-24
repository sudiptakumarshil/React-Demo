import React, { Component } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";

class CreateInventCategory extends Component {
    state = {
        list: [],
        loading: true,
        category_name: [],
        invent_category: [],
        root_id: [],
        status: []
    };

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    SaveInventCategory = async event => {
        event.preventDefault();

        const res = await axios.post(
            "/dbBackup/api/save-inventcategory",
            this.state
        );
        this.setState({
            root_id: "",
            invent_category: ""
        });
        if (res.data.status === 200) {
            // this.props.history.push("/dbBackup/manage-vendor");
        }
    };

    fetchallinventCategory = async () => {
        const res = await axios.get(
            defaultRouteLink + "/api/all-inventcategory"
        );
        // if (res.data.status === 200) {

        this.setState({ list: res.data.list });
        this.setState({ loading: false });
        // }
        // console.log(res);
    };
    fetchTreeItemData(event, data) {}
    componentDidMount = () => {
        this.fetchallinventCategory();
    };

    renderTree = nodes => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map(node => this.renderTree(node))
                : null}
        </TreeItem>
    );

    handleNodeData = (event, data) => {
        console.log("test="+data.category_name);
        this.setState({
            root_id: data.id,
            category_name: data.category_name
        });
    };

    render() {
        if (this.state.list.length >= 0) {
        }
        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.SaveInventCategory}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Category Root :
                                        {this.state.category_name}
                                    </label>
                                    <div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Category Name"
                                                name="invent_category"
                                                value={
                                                    this.state.invent_category
                                                }
                                                data-id={this.state.root_id}
                                                onChange={this.handleInput}
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <select
                                            name="status"
                                            onChange={this.handleInput}
                                        >
                                            <option disabled>
                                                Select Status
                                            </option>
                                            <option value="1" selected>
                                                Active
                                            </option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            {this.state.list.map(item => {
                                return (
                                    <TreeView
                                        onNodeSelect={this.handleNodeData}
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpanded={["root"]}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                    >
                                        {this.renderTree(item)}
                                    </TreeView>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateInventCategory;
