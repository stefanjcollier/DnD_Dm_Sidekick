import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

import CardBody from "components/CreativeTim/Card/CardBody";
import Card from "components/CreativeTim/Card/Card";
import CardHeader from "components/CreativeTim/Card/CardHeader";
import Table from "components/CreativeTim/Table/Table";
import Button from "components/CreativeTim/CustomButtons/Button";

import Basket from "models/Basket";


import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);

export default function BasketCard(props) {
  const totalsRows = () => {
    const totalPrice = props.basket.totalPrice()
    const discountedPrice = totalPrice.times(props.discount)
    return [
      [
        "",
        <b>Total</b>,
        <b>{totalPrice.toString()}</b>
      ],
      [
        "",
        <b>Discounted Total</b>,
        <b>{discountedPrice.toString()}</b>
      ],
    ]
  }

  const basketData = () => {
    return props.basket.productCountPairs().map( (productAndCount) => {
        const [product, count] = productAndCount
        return [
          `x${count}`,
          product.name,
          product.price_str,
          renderRemoveButton(product)
        ];
      }
    ).concat(totalsRows())
  };

  const renderRemoveButton = (product) => {
    return (
      <Button
        justIcon
        round
        size="xs"
        color='danger'
        onClick={() => {
          const newBasket = props.basket.removeFromBasket(product)
          console.log(props.setBasket)
          props.setBasket(newBasket)
        }}
      >
        -
      </Button>
    )
  }

  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Basket</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="primary"
          tableHead={['', "Name", "Cost", '']}
          tableData={basketData()}
        />
      </CardBody>
    </Card>

  )
}

BasketCard.propTypes = {
  basket: PropTypes.instanceOf(Basket).isRequired,
  discount: PropTypes.number.isRequired,
  setBasket: PropTypes.func.isRequired
};
