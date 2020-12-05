import React from "react";
import PropTypes from "prop-types";

import {makeStyles} from "@material-ui/core/styles";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

import Card from "components/CreativeTim/Card/Card";
import CardHeader from "components/CreativeTim/Card/CardHeader";
import CardBody from "components/CreativeTim/Card/CardBody";
import PageChange from "components/CreativeTim/PageChange/PageChange";
import Table from "components/CreativeTim/Table/Table";
import Button from "components/CreativeTim/CustomButtons/Button";

import Product from "models/Product";
import Basket from "models/Basket";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function ProductCard(props) {
  const renderAddToBasketButton = (product) => {
    return (
      <Button
        color='success'
        onClick={() => {
          const newBasket = props.basket.addToBasket(product)
          props.setBasket(newBasket)
        }}
      >
        <AddShoppingCart/>
      </Button>
    )
  }

  const renderCardBody = () => {
    if (props.products === undefined) {
      return <PageChange />
    } else {
      return (
        <Table
          tableHeaderColor="primary"
          tableHead={["Name", "Cost", "Weight (lbs)", '']}
          tableData={productList()}
        />
      )
    }
  }

  const productList = () => {
    return props.products.map( (product) => {
        return [
          product.name,
          product.price_str,
          product.weight_str,
          renderAddToBasketButton(product)
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
        {renderCardBody()}
      </CardBody>
    </Card>

  )
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(Product),
  basket: PropTypes.instanceOf(Basket).isRequired,
  setBasket: PropTypes.func.isRequired
};
