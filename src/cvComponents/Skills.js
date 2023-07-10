import React from "react";

import { Chip, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import LocalizedStrings from 'react-localization';
import SKILLSen from "languages/en/skills";
import SKILLSfr from "languages/fr/skills";
import skipTranslationKeys from "utils/skipTranslationKeys";
import TextWithMaxLength from "ui-component/TextWithMaxLength";


const TRANSLATION = new LocalizedStrings({
  en: {
    ...SKILLSen
  },
  fr: {
    ...SKILLSfr
  }
});

const useStyles = makeStyles()(theme => ({
  paper: {
    padding: 10,
    margin: 10,
  },
  skill: {
    padding: 10,
  },
  title: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
}));

const SkillColumn = (props) => {
  const { description, name } = props;
  return (
    <Tooltip title={description}>
      <Typography fontWeight='400' color='secondary' marginTop='10px'>{name}</Typography>
    </Tooltip>
  )
}

const Skills = (props) => {
  const { classes } = useStyles();

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);

  return (
    <>
      <Typography variant='h3'>{TRANSLATION.sectionTitle}</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={1}  display='flex' flexWrap='wrap' alignContent='center' justifyContent='center'>
          <AddCircleIcon color='primary' />
        </Grid>
        <Grid item xs={12} lg={5}>
          {skipTranslationKeys(TRANSLATION.strong.data).map(key => <SkillColumn {...TRANSLATION.strong.data[key]} key={key} />)}
        </Grid>
        <Grid item xs={12} lg={1}  display='flex' flexWrap='wrap' alignContent='center' justifyContent='center'>
          <RemoveCircleIcon color='primary' />
        </Grid>
        <Grid item xs={12} lg={5}>
          {skipTranslationKeys(TRANSLATION.weak.data).map(key => <SkillColumn {...TRANSLATION.weak.data[key]} key={key} />)}

        </Grid>
      </Grid>
    </>
  )
};

export default Skills;
