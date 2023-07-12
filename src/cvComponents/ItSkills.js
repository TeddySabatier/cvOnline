
import React, { useState } from "react";

import {
  Button,
  Card, CardActionArea,
  CardContent,
  Chip,
  Fade,
  Grid,
  List,
  ListItem,
  Paper, Popover, Tooltip, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import LocalizedStrings from 'react-localization';
import IT_SKILLSSen from "languages/en/itSkills";
import IT_SKILLSSfr from "languages/fr/itSkills";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { isKeyIncludedInArray } from "utils/translation";
import TextWithMaxLength from "ui-component/TextWithMaxLength";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...IT_SKILLSSen
  },
  fr: {
    ...IT_SKILLSSfr
  }
});

const useStyles = makeStyles()(theme => ({
  cursorGridItemHover: {
    cursor: 'pointer',
    padding: 5,
    borderRadius: '5%',
    '&:hover': {
      "@keyframes opacity-increase": {
        "0%": {
          opacity: 0.5,
        },
        "100%": {
          opacity: 1,
        }
      },
      animation: "opacity-increase 0.5s ease",
      backgroundColor: theme.palette.secondary.light
    }
  },
  cursorGridItem: {
    padding:10,
    cursor: 'pointer',
  }
}));

const ItSkill = (props) => {
  const { language, grade10 } = props;

  return (
    <>
      <Typography variant='subtitle1'> {TextWithMaxLength({ text: language, maxLength: 10 })}</Typography>
      <Typography variant='subtitle2' color='secondary.dark'> {grade10}/10</Typography>
    </>
  )
}
const ItSkills = (props) => {
  const { classes } = useStyles();
  
  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);

  const [indexChosen, setIndexChosen] = useState(false);
  return (
    <Paper className={classes.paper}>
      <Typography variant='h3'>{TRANSLATION.sectionTitle}</Typography>
      <Grid container>
        {indexChosen !== false &&
          <Grid  className={classes.cursorGridItem} item xs={12} onMouseLeave={() => setIndexChosen(false)} onClick={() => setIndexChosen(false)}>
              <ItSkill {...TRANSLATION.data[indexChosen]} />
              <Fade in={Boolean(indexChosen !== false)}>
                <Typography variant='p'>{TRANSLATION.data[indexChosen].description}</Typography>
              </Fade>
          </Grid>
        }
      {skipTranslationKeys(TRANSLATION.data).map((key, index) =>
        (indexChosen === false) &&
        <Grid
          className={classes.cursorGridItemHover}
          item
          xs={6}
          lg={3}
          onClick={() => setIndexChosen(index)}
          key={key}
        >
          <ItSkill {...TRANSLATION.data[key]} />
        </Grid>

      )}
    </Grid>
    </Paper >
  )
};

export default ItSkills;
