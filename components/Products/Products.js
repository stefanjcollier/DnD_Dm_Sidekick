import React, {Component} from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";

import styles from "assets/jss/products.js";

const static_products = [
  {name: 'Plate mail', price: 1500},
  {name: 'Spyglass', price: 1000},
  {name: 'Half plate', price: 750},
  {name: 'Breastplate', price: 400},
]

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: static_products
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    this.setState({ products: static_products })
  };

  productList = () => {
    return this.state.products.map( (productObj) => {
        return [productObj.name, productObj.price];
      }
    )
  };


  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Products</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Name", "Base Cost", "Weight (lbs)", ""]}
            tableData={this.productList()}
          />
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(styles)(Products);