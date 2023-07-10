import React from "react"
import { AppBar, Divider, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import DownloadIcon from '@mui/icons-material/Download';

import APP_BARen from "languages/en/appBar";
import APP_BARfr from "languages/fr/appBar";
import LocalizedStrings from "react-localization";
import { Box } from "@mui/system";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...APP_BARen
  },
  fr: {
    ...APP_BARfr
  }
});


const useStyles = makeStyles()(theme => ({
  selected: {
    color: theme.palette.secondary.main,
    padding: 10, 
    fontSize: '1em'
  },
  normal: {
    cursor: 'pointer',
    color: '#FFF',
    padding: 10,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  downloadAction: {
    color: theme.palette.secondary.light,
    '&:hover': {
      color: theme.palette.secondary.main

    }
  }
}));

const AppBarCustom = ({ handleClick, languageSelected }) => {
  const { classes } = useStyles();

  TRANSLATION.setLanguage(languageSelected);

  const handleDownload = () => {

  };

  return (
    <AppBar position="static" style={{ maxHeight: '5vh' }}>
      <Toolbar>
        <Typography
          name='fr'
          onClick={handleClick}
          className={languageSelected === 'fr' ? classes.selected : classes.normal}
          variant='h6'
        >
          Fr
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography
          name='en'
          onClick={handleClick}
          className={languageSelected === 'en' ? classes.selected : classes.normal}
          variant='h6'
        >
          En
        </Typography>
        <Box sx={{ flexGrow: 1 }}/>
        <Tooltip title={TRANSLATION.downloadAction}>
          <IconButton className={classes.downloadAction} onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
export default AppBarCustom;