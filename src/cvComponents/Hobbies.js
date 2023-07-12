
import React, { useState } from "react";

import {
  Card, CardActionArea,
  CardContent, CardMedia,
  Grid,
  IconButton,
  Paper, Popover, Typography
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import CancelIcon from '@mui/icons-material/Cancel';

import LocalizedStrings from 'react-localization';
import HOBBIESen from "languages/en/hobbies";
import HOBBIESfr from "languages/fr/hobbies";
import images from 'assets/images/images';
import skipTranslationKeys from "utils/skipTranslationKeys";
import { isKeyIncludedInArray } from "utils/translation";
import Carousel from "ui-component/carousel";
import { object } from "prop-types";

const TRANSLATION = new LocalizedStrings({
  en: {
    ...HOBBIESen
  },
  fr: {
    ...HOBBIESfr
  }
});

const PopoverContent = (props) => {
  const { popover, imagesCarousel, setPopover } = props;
  const { title, subparts } = popover;
  return (
    <Grid container padding={1} paddingBottom={4} paddingLeft={4}>
      <Grid item xs={12} display='flex' justifyContent='space-between' flexDirection='row'>
        <Typography variant='h1'>{title}</Typography>
        <IconButton color='secondary' onClick={() => setPopover(p => ({ ...p, anchorEl: null }))}>
          <CancelIcon />
        </IconButton>
      </Grid>
      {imagesCarousel.length > 1 ?
        <Grid container item xs={6} spacing={2}>
          {subparts.map(sub =>
            <Grid item xs={12}>
              <Typography variant='h4'> {sub.subtitle}</Typography>
              <Typography variant='p'> {sub.subcontent}</Typography>
            </Grid>
          )}
        </Grid>
        :
        <Grid container item xs={12} spacing={2}>
          {subparts.map(sub =>
            <Grid item xs={12}>
              <Typography variant='h4'> {sub.subtitle}</Typography>
              <Typography variant='p'> {sub.subcontent}</Typography>
            </Grid>
          )}
        </Grid>
      }
      {imagesCarousel.length > 1 &&
        <Grid item xs={6} alignItems='center' justifyContent='center' display='flex'>
          <Carousel animation duration={4000} images={imagesCarousel} />
        </Grid>
      }
    </Grid>
  )
}

const useStyles = makeStyles()(theme => ({
  paper: {
    padding: 10,

  },
  title: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  card: {
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

const Hobbies = (props) => {
  const { classes } = useStyles();

  const { languageSelected } = props;
  TRANSLATION.setLanguage(languageSelected);

  const [popover, setPopover] = useState({
    anchorEl: null,
    title: '',
    content: '',
  });

  const handleClick = (props) => (event) => {
    setPopover({ ...props, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setPopover(p => ({ ...p, anchorEl: null }));
  };

  const open = Boolean(popover.anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log(popover.keyImage, images.hobbies[popover.keyImage])
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={popover.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        elevation={10}
      >
        <PopoverContent
          imagesCarousel={images.hobbies[popover.keyImage] || []}
          popover={popover}
          setPopover={setPopover}

        />
      </Popover>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3'> {TRANSLATION.sectionTitle}</Typography>
        </Grid>
        {skipTranslationKeys(TRANSLATION.data).map(key =>
          <Grid item xs={12} /* md={6} lg={4} */ key={key}>
            <Card sx={{ maxWidth: 345 }} className={classes.card}>
              <CardActionArea onClick={handleClick(TRANSLATION.data[key])}>
                <CardContent style={{ padding: 15 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {TRANSLATION.data[key].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {TRANSLATION.data[key].description}
                  </Typography>
                </CardContent>
              </CardActionArea >
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  )
};

export default Hobbies;
