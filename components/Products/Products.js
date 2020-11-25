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


export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [host, setHost] = useState(() => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://dm-sidekick-api.herokuapp.com'
    } else {
      return 'http://localhost:8000'
    }
  });

  const refreshList = () => {
    axios
      .get(`${host}/api/products/`)
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  };

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

  useEffect(() => {
      refreshList();
    }, []
  );

  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Products</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="primary"
          tableHead={["Name", "Base Cost", "Weight (lbs)"]}
          tableData={productList()}
        />
      </CardBody>
    </Card>
  )
}
