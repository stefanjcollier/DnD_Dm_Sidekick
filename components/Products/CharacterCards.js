import React from "react";
import PropTypes from "prop-types";

import GridItem from "components/CreativeTim/Grid/GridItem";

import CharacterCard from "components/Products/CharacterCard";

import Character from "models/Character";

export default function CharacterCards(props) {
  const renderCharacterCard = (character) => {
    return (
      <GridItem key={`Character-${character.id}`} xs={12} sm={5} md={3}>
        <CharacterCard
          character={character}
          setActiveCharacter={props.setActiveCharacter}
        />
      </GridItem>
    )
  }
  if (props.characters === undefined) {
    return null
  }
  return (
    props.characters.map((character) => { return renderCharacterCard(character)})
  )
}

CharacterCards.propTypes = {
  characters: PropTypes.arrayOf(Character),
  setActiveCharacter: PropTypes.func.isRequired,
}