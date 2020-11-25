import React, { useState, useEffect } from 'react';
// @material-ui/core components
import {makeStyles, withStyles} from "@material-ui/core/styles";
// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Button from "components/CreativeTim/CustomButtons/Button.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
import GridContainer from "components/CreativeTim/Grid/GridContainer";
import GridItem from "components/CreativeTim/Grid/GridItem";
import PageChange from "components/CreativeTim/PageChange/PageChange";

// Axios
import axios from "axios";
// Icons
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
//
import Product from "models/Product"
import Price from "models/Price"
import Basket from "models/Basket"

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function Products(props) {
  const [products, setProducts] = useState(undefined);
  const [basket, setBasket] = useState(new Basket());

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
        setProducts(Product.fromObjects(res.data));
      })
      .catch(err => console.log(err));
  };

  const productList = () => {
    return products.map( (product) => {
        return [
          product.name,
          product.price_str,
          product.weight_str,
          <Button
            color='success'
            onClick={() => {
              setBasket(basket.addToBasket(product))
            }}
          >
            <AddShoppingCart/>
          </Button>
        ];
      }
    )
  };

  const basketData = () => {
    return basket.productCountPairs().map( (productAndCount) => {
      const [product, count] = productAndCount
      return [
        `x${count}`,
        product.name,
        product.price_str,
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
      <GridItem xs={8} sm={8} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Products</h4>
          </CardHeader>
          <CardBody>

            { products === undefined ?
                <PageChange />
              :
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Cost", "Weight (lbs)", '']}
                  tableData={productList()}
                />
            }
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={4} sm={4} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Basket</h4>
            <p className={classes.cardCategoryWhite}>Total: {basket.totalPrice().toString()}</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['', "Name", "Cost"]}
              tableData={basketData()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
