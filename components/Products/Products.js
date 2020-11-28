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
import Basket from "models/Basket"
import Character from "models/Character";

import DiscountService from "services/DiscountService"
import HostService from "services/HostService"

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);

const host = new HostService().getHost()

export default function Products(props) {
  const [products, setProducts] = useState(undefined);
  const [basket, setBasket] = useState(new Basket());
  const [priceModifier, setPriceModifier] = useState(1);
  const [character, setCharacter] = useState(undefined)

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

  const charisma = () => {
    if (character === undefined)
      return
    return character.charisma_modifier
  }
  const reputation = () => {
    if (character === undefined)
      return
    return  character.reputation.name
  }
  const fetchPriceModifier = (character) => {
    const service = new DiscountService()
    service.modifier(character.charisma_modifier, character.reputation.id, (newPriceModifier) =>{
      setPriceModifier(newPriceModifier)
    })
  }

  const totalsRows = () => {
    const totalPrice = basket.totalPrice()
    const discountedPrice = totalPrice.times(priceModifier)
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
    return basket.productCountPairs().map( (productAndCount) => {
      const [product, count] = productAndCount
      return [
        `x${count}`,
        product.name,
        product.price_str,
        <Button
          justIcon
          round
          size="xs"
          color='danger'
          onClick={() => {
            setBasket(basket.removeFromBasket(product))
          }}
        >
          -
        </Button>
      ];
      }
    ).concat(totalsRows())
  };

  useEffect(() => {
      Product.fetchAll((products) => setProducts(products))

      Character.fetch(1, (character) => {
        setCharacter(character)
        fetchPriceModifier(character)
      })
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
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['', "Name", "Cost", '']}
              tableData={basketData()}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Discount</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableData={[
                [<b>Reputation</b>, reputation()],
                [<b>Charisma</b>,   charisma()],
                [<b>Discount</b>,  priceModifier]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
