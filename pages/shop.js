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
import Products from "components/Products";

import styles from "assets/jss/products.js";
const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();

  return(
    <GridContainer>
      <GridItem xs={9} sm={9} md={9}>
        <Products />
      </GridItem>
      <GridItem xs={3} sm={3} md={3}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}