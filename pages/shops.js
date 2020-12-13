import React, { useState, useEffect } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'

// Creative Tim
import Card from "components/CreativeTim/Card/Card";
import CardHeader from "components/CreativeTim/Card/CardHeader";
import CardFooter from "components/CreativeTim/Card/CardFooter";
import Button from "components/CreativeTim/CustomButtons/Button";

// Models
import Shop from "models/Shop";

import styles from "assets/jss/shops";
const useStyles = makeStyles(styles);


export default function Shops(props) {
  const classes = useStyles()
  const [shops, setShops] = useState([])

  useEffect(() => {
    Shop.fetchAll(setShops)
  },[])

  const renderShopDetailsCard = (shop) => {
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{shop.name}</h4>
          {shop.description}
        </CardHeader>
        {/*<CardBody>*/}
        {/*</CardBody>*/}
        <CardFooter stats>
          <div className={classes.stats}>
            <Link passHref href={`/shop/${encodeURIComponent(shop.id)}`} >
              <Button color="info">
                Go
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return(
    shops.map(renderShopDetailsCard)
  );
}