// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core CreativeTim components
import GridItem from "components/CreativeTim/Grid/GridItem.js";
import GridContainer from "components/CreativeTim/Grid/GridContainer.js";
import Table from "components/CreativeTim/Table/Table.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
// components
import AllProducts from "components/Products/AllProducts";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();

  return(<AllProducts />);
}