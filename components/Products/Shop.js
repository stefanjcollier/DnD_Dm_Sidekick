import React, { useState, useEffect } from 'react';

// core CreativeTim components
import GridContainer from "components/CreativeTim/Grid/GridContainer";
import GridItem from "components/CreativeTim/Grid/GridItem";


// Models
import Product from "models/Product"
import Basket from "models/Basket"
import Character from "models/Character";

// Services
import DiscountService from "services/DiscountService"

// Components
import DiscountBreakdownCard from "components/Products/DiscountBreakdownCard";
import BasketCard from "components/Products/BasketCard";
import CharacterCards from "components/Products/CharacterCards";
import ProductCard from "components/Products/ProductsCard";


export default function Shop(props) {
  const [products, setProducts] = useState(undefined);
  const [basket, setBasket] = useState(new Basket());
  const [priceModifier, setPriceModifier] = useState(1);
  const [character, setCharacter] = useState(undefined)
  const [characters, setCharacters] = useState([])

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
      Product.fetchAll(setProducts)
      Character.fetchAll(setCharacters)

      // Character.fetchPromise(1)
      //   .then((character) => {
      //     setCharacter(character)
      //     fetchPriceModifier(character)
      //   })

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
          products={products}
          basket={basket}
          setBasket={setBasket}
        />
      </GridItem>

      <GridItem xs={4} sm={4} md={4}>
        <BasketCard
          discount={priceModifier}
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
