import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../Customer/Customer";
import { defaultRouteLink } from "../../common/config";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { data, map } from "jquery";

function ProductUnit(props) {
    const [warehouselist, setWarehouselist] = useState([]);
    return (
        <div>
            <h2>hello world</h2>
        </div>
    );
}

export default ProductUnit;
