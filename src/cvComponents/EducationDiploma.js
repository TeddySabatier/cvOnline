
import React, { useState } from "react";

import {
  Card, CardActionArea,
  CardContent,
  Chip,
  Grid,
  Paper, Popover, Slide, Tooltip, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import LocalizedStrings from 'react-localization';
import EDUCATIONen from "languages/en/educationDiploma";
import EDUCATIONfr from "languages/fr/educationDiploma";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { isKeyIncludedInArray } from "utils/translation";
import { useRef } from "react";
import { Box } from "@mui/system";
import { goToLink } from "utils";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...EDUCATIONen
  },
  fr: {
    ...EDUCATIONfr
  }
});

const useStyles = makeStyles()(theme => ({
  paper: {
    padding: 10
  },
  title: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  wrapper:{
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },

    '&:hover':{
      overflow:'auto',
      overflowY: 'auto'
    },
    
  }
}));

const EducationDiplomaCard = (props) => {
  const { description, link, degree, institution, endDate, startDate, goToLink, actionOnClick } = props;
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  return (
    <Tooltip title={actionOnClick}>
      <Card ref={containerRef}>
        <CardActionArea
          onClick={goToLink(link)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CardContent style={{padding: 10}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h4'> {degree}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle2' color='primary'>{institution}</Typography>
              </Grid>
              {endDate !== "" &&
                <Grid item xs={12} md={6} display='flex' flexDirection='row' alignContent='center'>
                  <Chip label={endDate} icon={<AssignmentTurnedInIcon color="primary" />} />
                </Grid>
              }
              {startDate !== "" &&
                <Grid item xs={12} md={6} display='flex' flexDirection='row' alignContent='center'>
                  <Chip label={startDate} icon={<ManageHistoryIcon color="primary" />} />
                </Grid>
              }
              {hovered &&
                <Grid item xs={12}>
                  <Slide direction="up" in={hovered} container={containerRef.current}>
                    <Typography variant='subtitle1'>{description}</Typography>
                  </Slide>
                </Grid>
              }
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  )
}
const EducationDiploma = (props) => {

  const { classes } = useStyles();

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);
  

  return (
    <Box className={classes.wrapper}>
      <Typography variant='h3'> {TRANSLATION.sectionTitle} </Typography>
      {skipTranslationKeys(TRANSLATION.data).map(key =>
        <EducationDiplomaCard key={key} {...TRANSLATION.data[key]} actionOnClick={TRANSLATION.actionOnClick} goToLink={goToLink} />

      )}
    </Box>
  )
};

export default EducationDiploma;
