import React, { useState, useEffect } from 'react';
// @material-ui/core components
import {makeStyles, withStyles} from "@material-ui/core/styles";
// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Button from "components/CreativeTim/CustomButtons/Button.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
import GridContainer from "../CreativeTim/Grid/GridContainer";
import GridItem from "../CreativeTim/Grid/GridItem";
// Axios
import axios from "axios";
// Icons
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
//
import Basket from "components/Products/Basket";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);

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

  const addProductToBasket = (product) => {
    setBasket(basket.concat([product]))
  };

  const productList = () => {
    return products.map( (productObj) => {
        return [
          productObj.name,
          productObj.price_str,
          productObj.weight.toString(),
          <Button
            color='info'
            onClick={() => {
              addProductToBasket(productObj)
            }}
          >
            <AddShoppingCart/>
          </Button>
        ];
      }
    )
  };

  const basketList = () => {
    return basket.map( (productObj) => {
        return [
          productObj.name,
          productObj.price_str,
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
    <GridContainer>
      <GridItem xs={9} sm={9} md={9}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Products</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Base Cost", "Weight (lbs)", '']}
              tableData={productList()}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={3} sm={3} md={3}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Products</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Base Cost"]}
              tableData={basketList()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
