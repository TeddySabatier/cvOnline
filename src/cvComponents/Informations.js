
import React, { useState } from "react";

import { Chip, Paper, Tooltip, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GitHubIcon from '@mui/icons-material/GitHub';

import LocalizedStrings from 'react-localization';
import INFORMATIONen from "languages/en/information";
import INFORMATIONfr from "languages/fr/information";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { Box } from "@mui/system";
import { goToLink } from "utils";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...INFORMATIONen
  },
  fr: {
    ...INFORMATIONfr
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
  },
  centeredTooltip: {
    display:'flex',
    alignContent: 'center',
  },
  chip: {
    margin:2,
    cursor: 'pointer',
    "&:hover":{
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const Informations = (props) => {
  const { classes } = useStyles();

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);
  
  const copyPhoneNumber = () => {
    setTooltipTitles(t => ({...t, phone: <Box backgroundColor='#FFF' borderRadius='50%' alignContent='center' display='flex'><CheckCircleIcon htmlColor="green"/></Box>}))
    navigator.clipboard.writeText('+33781779937');    
    setTimeout(() => setTooltipTitles(t => ({...t, phone:  TRANSLATION['phoneAction'] }) ), 3000);//Time out 3s
  }
  
  const [tooltipTitles, setTooltipTitles] = useState({
    phone: TRANSLATION['phoneAction'],
    mail: TRANSLATION['mailAction'],
    linkedin: TRANSLATION['linkedinAction'],
    github: TRANSLATION['githubAction'],
  })
  
  return (
    <>
      <Typography variant='h3'>{TRANSLATION.sectionTitle}</Typography>
      <Tooltip title={tooltipTitles.phone}>
        <Chip className={classes.chip} color ='primary' icon={<PhoneIcon />} label='+33 7 81 77 99 37' onClick={copyPhoneNumber}/>
      </Tooltip>
      <Tooltip title={tooltipTitles.github}>
        <Chip className={classes.chip} color ='primary' icon={<GitHubIcon />} label='Teddy Sabatier' onClick={goToLink(TRANSLATION.githubLink)} />
      </Tooltip>
      <Tooltip title={tooltipTitles.mail}>
        <Chip className={classes.chip} color ='primary' icon={<AlternateEmailIcon />} component='a' href='mailto:sabatier.teddy@gmail.com' label='sabatier.teddy@gmail.com' />
      </Tooltip>
      <Tooltip title={tooltipTitles.linkedin}>
        <Chip className={classes.chip} color ='primary' icon={<LinkedInIcon />} label='Teddy Sabatier' onClick={goToLink(TRANSLATION.linkedinLink)} />
      </Tooltip>
    </>
  )
};

export default Informations;
