import React, {Component} from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core CreativeTim components
import Table from "components/CreativeTim/Table/Table.js";
import Card from "components/CreativeTim/Card/Card.js";
import CardHeader from "components/CreativeTim/Card/CardHeader.js";
import CardBody from "components/CreativeTim/Card/CardBody.js";
// Axios
import axios from "axios";

import styles from "assets/jss/products.js";


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    console.log(process.env.NODE_ENV)
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/products/")
      .then(res => {
        console.log(res.data);
        this.setState({ products: res.data})
      })
      .catch(err => console.log(err));
  };

  productList = () => {
    return this.state.products.map( (productObj) => {
        return [
          productObj.name,
          productObj.price_str,
          productObj.weight.toString(),
        ];
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
            tableHead={["Name", "Base Cost", "Weight (lbs)"]}
            tableData={this.productList()}
          />
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(styles)(Products);