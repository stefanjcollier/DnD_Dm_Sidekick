// Based on <root>/components/CreativeTim/Footer/Footer.js
/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components/CreativeTim
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components/CreativeTim
import styles from "assets/CreativeTim/jss/nextjs-material-dashboard/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/stefanjcollier/DnD_DM_Sidekick" className={classes.block}>
                Client GH
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/stefanjcollier/DnD_DM_Sidekick_API" className={classes.block}>
                Backend GH
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://demos.creative-tim.com/nextjs-material-dashboard/admin/dashboard" className={classes.block}>
                Template Demo
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://docs.google.com/spreadsheets/d/1GYXhMCjH1nv3nXuM8DExOqck6J9eE4_jVnk77Ifx8J0/edit?usp=sharing" className={classes.block}>
                Inspired By
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
