
import React from "react";

import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Grow,
  LinearProgress,
  Paper, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';

import LocalizedStrings from 'react-localization';
import PROJECTSen from "languages/en/projects";
import PROJECTSfr from "languages/fr/projects";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { useState } from "react";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...PROJECTSen
  },
  fr: {
    ...PROJECTSfr
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
  schoolRelated: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  personal: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}));
const ProjectSection = (props) => {
  const { data, setProjectOpen, color, className } = props;

  return (
    <>
      {skipTranslationKeys(data).map(key =>
        <Card key={key} className={className}>
          <CardActionArea onClick={() => setProjectOpen({ ...data[key], color })}>
            <CardContent>
              <Typography variant='h4'> {data[key].title}</Typography>
              <LinearProgress variant="determinate" value={data[key].completion} color={color} />
            </CardContent>
          </CardActionArea>
        </Card>

      )}
    </>
  )

};
const Projects = (props) => {
  const { classes } = useStyles();

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);

  const [projectOpen, setProjectOpen] = useState(false);
  return (
    <>
      <Typography variant='h3'>{TRANSLATION.sectionTitle}</Typography>
      <Paper>
        {projectOpen !== false &&
          <Card>
            <CardActionArea onClick={() => setProjectOpen(false)}>
              <CardContent>
                <Typography variant='h4'> {projectOpen.title}</Typography>
                <Grow
                  in={Boolean(projectOpen)}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(Boolean(projectOpen) ? { timeout: 1000 } : {})}
                >
                  <LinearProgress variant="determinate" value={projectOpen.completion} color={projectOpen.color} />
                </Grow>
                <br />
                <Typography> {projectOpen.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        }
        <Grid container>
          {projectOpen === false &&
            <Grid item xs={12} lg={6}>
              <Badge color='primary' badgeContent={TRANSLATION.school.data.length}>
                <Typography variant='h4' style={{ paddingTop: 3, paddingRight: 4 }}>{TRANSLATION.school.title}</Typography>
              </Badge>
              <ProjectSection className={classes.schoolRelated} {...TRANSLATION.school} setProjectOpen={setProjectOpen} color='primary' />
            </Grid>
          }
          {projectOpen === false &&
            <Grid item xs={12} lg={6}>
              <Badge 
                slotProps={{ badge: { style: { color: '#FFF' } } }} 
                color='secondary' 
                badgeContent={TRANSLATION.personal.data.length
              }>
                <Typography variant='h4' style={{ paddingTop: 3, paddingRight: 4 }}>{TRANSLATION.personal.title}</Typography>
              </Badge>
              <ProjectSection className={classes.personal} {...TRANSLATION.personal} setProjectOpen={setProjectOpen} color='secondary' />
            </Grid>
          }
        </Grid>
      </Paper>
    </>
  )
};

export default Projects;
