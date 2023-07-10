
import React, { useState } from "react";

import {
  Chip,
  Tooltip, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';

import LocalizedStrings from 'react-localization';
import LANGUAGESSen from "languages/en/languages";
import LANGUAGESSfr from "languages/fr/languages";
import skipTranslationKeys from "utils/skipTranslationKeys";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...LANGUAGESSen
  },
  fr: {
    ...LANGUAGESSfr
  }
});

const useStyles = makeStyles()(theme => ({
  paper: {
    padding: 10,
    margin: 10,
  },
  title: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
}));

const Languages = (props) => {

  const { classes } = useStyles();
  
  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);
  
  return (
    <>
      <Typography variant='h3'>{TRANSLATION.sectionTitle}</Typography>
      {skipTranslationKeys(TRANSLATION.data).map( key =>
        <Tooltip key={key} title={TRANSLATION.data[key].description}>
          <Chip style={{margin: 2}} color='primary' variant='outlined' label={TRANSLATION.data[key].language + ' - ' + TRANSLATION.data[key].level }/>
        </Tooltip>
      ) }
    </>
  )
};

export default Languages;
