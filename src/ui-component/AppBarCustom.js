import React from "react"
import { AppBar, Divider, Fab, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import clsx from "clsx";
import LocalizedStrings from "react-localization";

import APP_BARen from "languages/en/appBar";
import APP_BARfr from "languages/fr/appBar";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...APP_BARen
  },
  fr: {
    ...APP_BARfr
  }
});



const useStyles = makeStyles()(theme => {
  return ({
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
    },
    arrowEffect: {
      "@keyframes width-increase": {
        "0%": {
          // opacity: 0,
          transform: 'translateX(0%)',
          height: '2rem',
          width: '2rem',
        },
        "50%": {
          transform: 'translateX(10%)',
          opacity: 1,
          width: '3rem',
        },
        "100%": {
          // opacity: 0,
          transform: 'translateX(0%)',
          height: '2rem',
          width: '2rem',
        }
      },
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "55%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      height: '2rem',
      width: '2rem',
      boxShadow: '0.2rem 1rem 1rem black',
      animation: "width-increase 5s ease infinite",
    },
    arrowEffectExit: {
      "@keyframes disapear": {
        "0%": {
          opacity: 1,
          // transform: 'translateX(0%)',
          // height: '2rem',
          // width: '2rem',
        },
        "100%": {
          opacity: 0,
          // transform: 'translateX(0%)',
          // height: '2rem',
          // width: '2rem',
        }
      },
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "55%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      height: '2rem',
      width: '2rem',
      boxShadow: '0.2rem 1rem 1rem black',
      animation: "disapear 3s ease",
      opacity:0
    },
  }
  )
});

const AppBarCustom = ({ handleClick, languageSelected }) => {
  const { classes } = useStyles();

  TRANSLATION.setLanguage(languageSelected);

  const handleDownload = () => {
    alert('Still working on it should be implemented soon')
  };

  const [arrowEffect, setArrowEffect] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setArrowEffect(false), 15000);
    return () => clearTimeout(id);
  }, []);

  const desactivateArrow = (event) =>  {
    handleClick(event);
    setArrowEffect(false);
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          name='en'
          onClick={desactivateArrow}
          className={languageSelected === 'en' ? classes.selected : classes.normal}
          variant='h6'
        >
          En
        </Typography>
        <Divider orientation="vertical" flexItem  style={{marginTop: '1.2vh' ,marginBottom: '1.2vh'}}/>
        <Typography
          name='fr'
          onClick={desactivateArrow}
          className={languageSelected === 'fr' ? classes.selected : classes.normal}
          variant='h6'
          >
          Fr
        </Typography>
        <Box
          className={arrowEffect ? classes.arrowEffect : classes.arrowEffectExit }
        >
          <KeyboardBackspaceIcon style={{ display: 'flex', flex: 1 }} htmlColor="#FFF" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
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