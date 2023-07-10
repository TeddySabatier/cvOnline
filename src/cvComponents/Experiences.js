
import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Chip,
  Grid,
  Paper, Popover, Tooltip, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LocalizedStrings from 'react-localization';
import EXPERIENCESen from "languages/en/experiences";
import EXPERIENCESfr from "languages/fr/experiences";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { Box } from "@mui/system";
import TextWithMaxLength from "ui-component/TextWithMaxLength";
import { getDateFromEuropeanString, getDurationDiff, getDurationDiffArray, getStringDate } from "utils/dates";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...EXPERIENCESen
  },
  fr: {
    ...EXPERIENCESfr
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
  }
}));

const ChipsFirstDateAndMore = (dates) =>
  <Grid container spacing={1}>
    <Grid item xs={12} sm={12} md={12} lg={6}>
      {ChipsAndDates(dates[dates.length - 1])}
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6}>
      {dates.length > 1 &&
        <Chip label={`+${dates.length - 1} date${dates.length - 1 > 1 ? 's' : ''}`} variant='outlined' />
      }
    </Grid>
  </Grid>



const ChipsFirstDateDuration = (date) => {
  const startDate = getDateFromEuropeanString(date.startDate);
  const endDate = getDateFromEuropeanString(date.endDate);
  const duration = getDurationDiff(startDate, endDate);

  if (!duration.value)
    return null;

  return <Tooltip title={`${getStringDate(startDate)} - ${getStringDate(endDate)}`}>
    <Chip color="primary" label={`${duration.value} ${TRANSLATION[duration.unit]}${TRANSLATION[duration.unit] !== 'mois' && duration.value > 1 ? 's' : ''}`} />
  </Tooltip>
}
const ChipsExperienceDuration = (dates) => {
  const tooltipTitle = dates.reduce((title, date) => [...title, <p>{getStringDate(date.startDate)} - {getStringDate(date.endDate)}</p>], [])
  const duration = getDurationDiffArray(dates);

  if (!duration.value)
    return null;

  return <Tooltip title={tooltipTitle}>
    <Badge color='secondary' badgeContent={dates.length > 1 ? dates.length : undefined}>
      <Chip color="primary" label={`${duration.value} ${TRANSLATION[duration.unit]}${TRANSLATION[duration.unit] !== 'mois' && duration.value > 1 ? 's' : ''}`} />
    </Badge>
  </Tooltip>
}

const ChipsAndDates = (date) => {
  const startDate = getDateFromEuropeanString(date.startDate);
  const endDate = getDateFromEuropeanString(date.endDate);
  const duration = getDurationDiff(startDate, endDate);
  if (duration.unit === 'month')
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Tooltip title={getStringDate(startDate)}>
          <Chip color="primary" label={`${startDate.getMonth() < 10 ? '0' + startDate.getMonth() : startDate.getMonth()}/${getDateFromEuropeanString(date.startDate).getFullYear()}`} />
        </Tooltip>
        <DoubleArrowIcon color='secondary' />
        <Tooltip title={getStringDate(endDate)}>
          <Chip color="primary" label={`${endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()}/${endDate.getFullYear()}`} />
        </Tooltip>
      </div>
    )
  return (
    <Tooltip title={getStringDate(startDate) + ' - ' + getStringDate(endDate)}>
      <Chip color="primary" label={`${startDate.getMonth() < 10 ? '0' + startDate.getMonth() : startDate.getMonth()}/${getDateFromEuropeanString(date.startDate).getFullYear()}`} />
    </Tooltip>
  )
}
const AccordionExperience = (props) => {
  const { company, dates, tasks, description, tasksTitle, dateTitle, descriptionTitle, setIndexOpen, index } = props;

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (toggleToValue = null) => {
    if (toggleToValue === null) { //Not specific state wanted
      setExpanded(s => {
        if (s) { // Going to close
          setIndexOpen(false);
        } else {// Is oppening
          setIndexOpen(index);
        }
        return !s;
      })

    } else {
      if (toggleToValue) { // Going to open
        setIndexOpen(index);
      } else {// GOing to close
        setIndexOpen(false);
      }
      setExpanded(toggleToValue)
    }
  };

  return (
    <Accordion expanded={expanded} onChange={() => toggleExpanded()}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} lg={8} display='flex' flexDirection='row'>
            <Typography variant='h4' color='secondary'> {getDateFromEuropeanString(dates[dates.length - 1].startDate).getFullYear()}</Typography>
            <ApartmentIcon color='primary' />
            <Typography variant='h4'> - {TextWithMaxLength({ text: company, maxLength: 20 })}</Typography>
          </Grid>

          {!expanded &&
            <Grid item xs={12} lg={2}>
              {ChipsExperienceDuration(dates)}
            </Grid>
          }
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Typography variant='h5'>{`${dateTitle}${dates.length > 1 ? 's' : ''}`}</Typography>
            {dates.map((date, index) => <div key={index} style={{ margin: 10 }}>{ChipsAndDates(date)}</div>)}
            <Typography variant='h5'>{`${tasksTitle}${tasks.length > 1 ? 's' : ''}`}</Typography>
            <ul>
              {tasks.map(task =>
                <li key={task} >{task}</li>
              )}
            </ul>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant='h5'>{descriptionTitle}</Typography>
            <Typography variant='p'>{description}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
const Experiences = (props) => {

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);

  const { data, tasksTitle, dateTitle, descriptionTitle, sectionTitle } = TRANSLATION;
  const [indexOpen, setIndexOpen] = useState(false);

  return (
    <Box style={{ heigth: '50vh' }}>
      <Typography variant='h3'>{sectionTitle}</Typography>
      {skipTranslationKeys(data).map((key, index) =>
        (indexOpen === false || indexOpen === index) &&
        <AccordionExperience
          key={key}
          index={index}
          setIndexOpen={setIndexOpen}
          {...TRANSLATION.data[key]}
          tasksTitle={tasksTitle}
          dateTitle={dateTitle}
          descriptionTitle={descriptionTitle}
        />

      )}
    </Box>
  )
};

export default Experiences;
