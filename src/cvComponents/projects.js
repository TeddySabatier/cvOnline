
import React from "react";
import { useState } from "react";

import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Grow,
  LinearProgress,
  Paper, Tooltip, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';

import LocalizedStrings from 'react-localization';
import PROJECTSen from "languages/en/projects";
import PROJECTSfr from "languages/fr/projects";
import skipTranslationKeys from "utils/skipTranslationKeys";
import { goToLink } from "utils";
import { Box } from "@mui/system";


const TRANSLATION = new LocalizedStrings({
  en: {
    ...PROJECTSen,
    private:'Private project'
  },
  fr: {
    ...PROJECTSfr,
    private:'Project privé'
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
      "@keyframes opacity-increase": {
        "0%": {
          opacity: 0.5,
        },
        "100%": {
          opacity: 1,
        }
      },
      animation: "opacity-increase 0.5s ease",
      backgroundColor: theme.palette.primary.light
    }
  },
  personal: {
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
                <Box  display='flex'  alignItems='center' flexDirection='row' paddingBottom='5px'>
                  <Typography variant='h4' paddingRight='5px'> {projectOpen.title}</Typography>
                  {projectOpen.githubLink ? 
                      <Chip 
                        className={classes.chip} 
                        color={projectOpen.color} 
                        variant='outlined' 
                        icon={<GitHubIcon />} 
                        label={projectOpen.title} 
                        onClick={(e) => {
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          goToLink(projectOpen.githubLink)();
                        } }
                      />
                      :
                      <Tooltip title={TRANSLATION.private}>
                        <LockIcon/>
                      </Tooltip>
                  }
                </Box>
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
