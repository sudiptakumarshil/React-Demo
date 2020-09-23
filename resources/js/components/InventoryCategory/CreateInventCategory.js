import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Customer from "../Customer/Customer";
import {defaultRouteLink} from "../../common/config";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { map } from 'jquery';


class CreateInventCategory extends Component {
    state = {
        list: [],
        loading: true
    };
    fetchallinventCategory = async () => {
        const res = await axios.get(defaultRouteLink + "/api/all-inventcategory");
        // if (res.data.status === 200) {


            this.setState({ list: res.data.list });
            this.setState({ loading: false });
        // }
        // console.log(res);
    };
    fetchTreeItemData(event,data){
        console.log(data);
    }
    componentDidMount = () => {
        this.fetchallinventCategory();
    };

     renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => this.renderTree(node)) : null}
        </TreeItem>
      );

      handleNodeData=(event,data)=>{
        console.log(data)
      }

    render() {

        const data = {
            id: 'root',
            name: 'Parent',
            children: [
              {
                id: '1',
                test_data:'dataa',
                name: 'Child - 1',
              },
              {
                id: '3',
                name: 'Child - 3',
                children: [
                  {
                    id: '4',
                    name: 'Child - 4',
                  },
                ],
              },
            ],
          };

        if(this.state.list.length >= 0)
            {


            }
        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="content container-fluid">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h4 className="page-title">Create Inteventory Category</h4>
                                    </div>

                                    {/*<Link*/}
                                    {/*    to="/dbBackup/create-customer"*/}
                                    {/*    type="button"*/}
                                    {/*    className="btn btn-primary"*/}
                                    {/*>*/}
                                    {/*    Create Customer*/}
                                    {/*</Link>*/}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-block">
                                                <h6 className="card-title text-bold"></h6>
                                                <p className="content-group"></p>
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <td>SL</td>
                                                        <td>Name</td>
                                                        <td>Email</td>
                                                        <td>Address</td>
                                                        <td>Phone</td>
                                                        <td>Remarks</td>
                                                        <td>Accounts No</td>
                                                        <td>Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {
                                this.state.list.map(item=>{
                                    return(
                                        <TreeView
                                            onNodeSelect={this.handleNodeData}
                                            defaultCollapseIcon={<ExpandMoreIcon />}
                                            defaultExpanded={['root']}
                                            defaultExpandIcon={<ChevronRightIcon />}>
                                                {this.renderTree(item)}
                                        </TreeView>
                                    )
                                })
                            }

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default CreateInventCategory;
