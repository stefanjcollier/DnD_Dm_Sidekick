import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

import Card from "components/CreativeTim/Card/Card";
import CardHeader from "components/CreativeTim/Card/CardHeader";
import CardBody from "components/CreativeTim/Card/CardBody";
import Table from "components/CreativeTim/Table/Table";

import Character from "models/Character";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);


export default function  DiscountBreakdownCard(props) {
  const formattedDiscount = () => {
    return `${props.discount.toFixed(2)*100} %`;
  }

  if (!props.character) {
    return null
  }
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Discount for {props.character.name}</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="info"
          tableData={[
            [<b>Reputation</b>, props.character.reputation.name],
            [<b>Charisma</b>,   props.character.charisma_modifier],
            [<b>Discount</b>,   formattedDiscount()]
          ]}
        />
      </CardBody>
    </Card>
  )
}

DiscountBreakdownCard.propTypes = {
  character: PropTypes.instanceOf(Character),
  discount: PropTypes.number.isRequired,
};
