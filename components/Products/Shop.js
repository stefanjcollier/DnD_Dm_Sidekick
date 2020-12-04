import React, { useState, useEffect } from 'react';
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Button from "components/CreativeTim/CustomButtons/Button.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
import CardAvatar from "components/CreativeTim/Card/CardAvatar.js";
import GridContainer from "components/CreativeTim/Grid/GridContainer";
import GridItem from "components/CreativeTim/Grid/GridItem";
import PageChange from "components/CreativeTim/PageChange/PageChange";


// Models
import Product from "models/Product"
import Basket from "models/Basket"
import Character from "models/Character";

// Services
import DiscountService from "services/DiscountService"

import styles from "assets/jss/products.js";
import DiscountBreakdownCard from "components/Products/DiscountBreakdownCard";
const useStyles = makeStyles(styles);


export default function Shop(props) {
  const [products, setProducts] = useState(undefined);
  const [basket, setBasket] = useState(new Basket());
  const [priceModifier, setPriceModifier] = useState(1);
  const [character, setCharacter] = useState(undefined)
  const [characters, setCharacters] = useState([])

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


  const fetchPriceModifier = (character) => {
    const service = new DiscountService()
    service.modifier(character.charisma_modifier, character.reputation.id, (newPriceModifier) =>{
      setPriceModifier(newPriceModifier)
    })
  }

  const changeCharacter = (chosenCharacter) => {
    if (character && chosenCharacter.id  === character.id) {
      setCharacter(null)
      setPriceModifier(1)
    } else {
      setCharacter(chosenCharacter)
      fetchPriceModifier(chosenCharacter)
    }
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

      Character.fetchAll(setCharacters)

      // Character.fetchPromise(1)
      //   .then((character) => {
      //     setCharacter(character)
      //     fetchPriceModifier(character)
      //   })

    }, []
  );
  const classes = useStyles();

  const renderCharacters = () => {
    return (characters.map( (character) => {
      return (
        <GridItem key={`Character-${character.id}`} xs={12} sm={5} md={3}>
          <Card>
            <CardHeader stats icon>
              <CardAvatar profile className={classes.clickable} onClick={() => changeCharacter(character)}>
                <img alt={character.name} src={character.imageUrl}/>
              </CardAvatar>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>{character.name}</h3>
              <div className={classes.stats}>
                Reputation: {character.reputation.name}
                <br/>
                Charisma: {character.charismaModifierStr()}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      )}
    ))
  }

  return (
    <GridContainer>
      {renderCharacters()}
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

        <DiscountBreakdownCard
          character={character}
          discount={priceModifier}
        />

      </GridItem>
    </GridContainer>
  )
}
