import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

import Card from "components/CreativeTim/Card/Card";
import CardHeader from "components/CreativeTim/Card/CardHeader";
import CardAvatar from "components/CreativeTim/Card/CardAvatar";
import CardBody from "components/CreativeTim/Card/CardBody";

import Character from "models/Character";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function CharacterCard(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader stats icon>
        <CardAvatar profile className={classes.clickable} onClick={props.setActiveCharacter(props.character)}>
          <img alt={props.character.name} src={props.character.imageUrl}/>
        </CardAvatar>
      </CardHeader>
      <CardBody>
        <h3 className={classes.cardTitle}>{props.character.name}</h3>
        <div className={classes.stats}>
          Reputation: {props.character.reputation.name}
          <br/>
          Charisma: {props.character.charismaModifierStr()}
        </div>
      </CardBody>
    </Card>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.instanceOf(Character),
  setActiveCharacter: PropTypes.func.isRequired,
}