import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components/CreativeTim
import PropTypes from "prop-types";
// @material-ui/core components/CreativeTim
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components/CreativeTim

import styles from "assets/CreativeTim/jss/nextjs-material-dashboard/components/CreativeTim/cardAvatarStyle.js";

const useStyles = makeStyles(styles);

export default function CardAvatar(props) {
  const classes = useStyles();
  const { children, className, plain, profile, ...rest } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined,
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
};
