import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import PropTypes from "prop-types";

// core CreativeTim components
import GridContainer from "components/CreativeTim/Grid/GridContainer";
import GridItem from "components/CreativeTim/Grid/GridItem";

// Models
import Shop from "models/Shop";
import Basket from "models/Basket"

// Services
import DiscountService from "services/DiscountService"

// Components
import DiscountBreakdownCard from "components/Products/DiscountBreakdownCard";
import BasketCard from "components/Products/BasketCard";
import CharacterCards from "components/Products/CharacterCards";
import ProductCard from "components/Products/ProductsCard";



function ShopView(props) {
  const [shop, setShop] = useState(undefined);
  const [basket, setBasket] = useState(new Basket());
  const [priceModifier, setPriceModifier] = useState(1);
  const [character, setCharacter] = useState(undefined)
  const [characters, setCharacters] = useState([])

  async function getInitialProps(context) {
    console.log("context", context)
    return {
      props: {}, // will b  e passed to the page component as props
    }
  }

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

  useEffect(() => {
    Shop.fetch(props.id, setShop)
    }, []
  );

  return (
    <GridContainer>
      <CharacterCards
        characters={characters}
        setActiveCharacter={changeCharacter}
      />
      <GridItem xs={8} sm={8} md={8}>
        <ProductCard
          products={shop && shop.products}
          basket={basket}
          setBasket={setBasket}
        />
      </GridItem>

      <GridItem xs={4} sm={4} md={4}>
        <BasketCard
          discount={priceModifier}
          activeCharacter={character}
          basket={basket}
          setBasket={setBasket}
        />
        <DiscountBreakdownCard
          discount={priceModifier}
          character={character}
        />
      </GridItem>
    </GridContainer>
  )
}

ShopView.getInitialProps = ({query}) => {
  return {
    id: query.id
  }
}

export default ShopView;