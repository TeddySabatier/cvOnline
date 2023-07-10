import React, { useEffect, useState } from 'react';
import { AppBar, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MenuIcon from '@mui/icons-material/Menu';


import Skills from 'cvComponents/Skills';
import Hobbies from 'cvComponents/Hobbies';
import Informations from 'cvComponents/Informations';
import EducationDiploma from 'cvComponents/EducationDiploma';
import Experiences from 'cvComponents/Experiences';
import Languages from 'cvComponents/Languages';
import Projects from 'cvComponents/projects';
import ItSkills from 'cvComponents/ItSkills';
import AppBarCustom from 'ui-component/AppBarCustom';

const useStyles = makeStyles()(theme => ({
  paper: {
    backgroundColor: theme.palette.primary.main
  },
  mainTopContainer: {
    maxHeight: '50vh',
    minHeight: '50vh',
    overflow: 'hidden',
    scrollbarColor: theme.palette.primary.dark,
    '&:hover': {
      overflow: 'auto'
    }
  },
  mainBottomContainer: {
    maxHeight: '43vh',
    minHeight: '43vh',
    overflow: 'hidden',
    '&:hover': {
      overflow: 'auto'
    }
  },
  leftContainer: {
    maxHeight: '93vh',
    overflow: 'hidden',
    paddingLeft: 15,
    paddingRight: 10,
    '&:hover': {
      overflowY: 'auto'
    }
  }
}))
const CV = () => {
  const { classes } = useStyles();
  const [languageSelected, setLanguageSelected] = useState('en');
  useEffect(() => {
    localStorage.setItem('languageSelectedCv', 'en');
  }, []);
  const handleClickAppBarLanguages = (event) => {
    localStorage.setItem('languageSelectedCv', event.target.getAttribute('name'));
    setLanguageSelected(event.target.getAttribute('name'));
  }

  return (
    <Grid container space={1} style={{ maxHeight: '100vh' }}>
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        <AppBarCustom languageSelected={languageSelected} handleClick={handleClickAppBarLanguages} />
      </Grid>
      <Grid
        item xs={12}
        md={3}
        className={classes.leftContainer}
        container
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography variant='h2'>Teddy Sabatier</Typography>
        </Grid>
        <Grid item xs={12}>
          <Informations languageSelected={languageSelected} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Languages languageSelected={languageSelected} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <ItSkills languageSelected={languageSelected} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Skills languageSelected={languageSelected} />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={7} >
        <Grid item xs={12} md={4} className={classes.mainTopContainer}>
          <EducationDiploma languageSelected={languageSelected} />
        </Grid>
        <Grid item xs={12} md={8} className={classes.mainTopContainer}>
          <Experiences languageSelected={languageSelected} />
        </Grid>
        <Grid item xs={12} className={classes.mainBottomContainer}>
          <Projects languageSelected={languageSelected} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={2} style={{ maxHeight: '93vh' }}>
        <Hobbies languageSelected={languageSelected} />
      </Grid>
    </Grid>
  );
};

export default CV;
