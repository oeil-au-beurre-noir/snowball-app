import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Box
} from '@material-ui/core';
import styles from './styles/list';
const useStyles = makeStyles(styles);

export default function Title(props) {
  const { fromPage } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Icequeen</h1>
        <div>
          Deposit Snowglobe tokens (sPGL) into IceQueen to receive governance tokens (SNOB)
        </div>
      </Grid>
    </Grid>
  );
}

Title.defaultProps = {
  fromPage: 'page',
};
