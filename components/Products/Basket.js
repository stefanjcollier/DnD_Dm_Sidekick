import React, { useState, useEffect } from 'react';
// @material-ui/core components
import {makeStyles, withStyles} from "@material-ui/core/styles";
// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
// Axios
import axios from "axios";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function Basket(props) {
  const [products, setProducts] = useState([]);

  const productList = () => {
    return products.map( (productObj) => {
        return [
          productObj.name,
          productObj.price_str,
          productObj.weight.toString(),
        ];
      }
    )
  };

  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Products</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="primary"
          tableHead={["Name", "Base Cost"]}
          tableData={productList()}
        />
      </CardBody>
    </Card>
  )
}
