import React, { useEffect, useState } from "react"

import { Box, Grid, Button, Tooltip } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const useStyles = makeStyles()(theme => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCurrent: {
    minHeight: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    backgroundSize: "contain",
    justifyItems: 'space-beween',
    display: 'flex',
    opacity: '0.1',

  },
  imgNext: {
    minHeight: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    transition: 'opacity 1s linear',
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    backgroundSize: "contain",
    justifyItems: 'space-beween',
    display: 'flex',
    opacity: '1',

  },
  button: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(0,0,0, 0.5)',
    }
  },
  invisible: {
    color: 'rgba(0,0,0,0)'
  }

}));

const useCarousel = ({ animation = false, duration = 1000, images, }) => {
  const [indexImg, setIndexImg] = useState({ current: 0, next: 0 });
  const [visible, setVisible] = useState(false);

  const onMouse = {
    enter: () => setVisible(true),
    leave: () => setVisible(false)
  };

  const sourceImg = {
    current: images[indexImg.current],
    next: images[indexImg.next],
  };

  const handleChangeImg = (index) => {
    if (index > images.length - 1)
      return setIndexImg(i => ({ ...i, next: 0 }));
    if (index < 0)
      return setIndexImg(i => ({ ...i, next: images.length - 1 }));
    setIndexImg(i => ({ ...i, next: index }))
  }

  const switchImage = {
    next() {
      return handleChangeImg(indexImg.current + 1);
    },
    previous() {
      return handleChangeImg(indexImg.current - 1);
    },
  };

  useEffect(() => {
    if (animation && !visible) {
      const newCurrent = (indexImg.next + 1) % images.length;
      const id = setTimeout(() => setIndexImg(i => ({ ...i, next: newCurrent })), duration);
      return () => clearTimeout(id);
    }
  }, [indexImg.next, visible]);

  useEffect(() => {
    const id = setTimeout(() => setIndexImg(i => ({ ...i, current: i.next })), 50); // Timeout needed for auto animation
    return () => clearTimeout(id);
  }, [indexImg.next]);

  return { indexImg, sourceImg, switchImage, onMouse, visible };
};

const Carousel = (props) => {
  const {
    animation = false,
    duration = 1000,
    images,
  } = props;

  const { classes } = useStyles();

  const { indexImg, sourceImg, switchImage, onMouse, visible } = useCarousel({ animation, duration, images });

  console.log({ indexImg, sourceImg, switchImage, onMouse, visible })
  if (!images || images.length < 1
    || !sourceImg.current || !sourceImg.current.path || !sourceImg.current.alt
    || !sourceImg.next || !sourceImg.next.path || !sourceImg.next.alt)
    return <></>;

  return (
    <Tooltip title={`${sourceImg.current.alt}${sourceImg.current.link ? ' : ' + sourceImg.current.link : ''}`}>
      <Grid
        container
        component='div'
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + sourceImg.current?.path || ''})` }}
        className={indexImg.current !== indexImg.next ? classes.imgCurrent : classes.imgNext}
        alt={sourceImg.current?.alt || 'alt'}
        onMouseEnter={onMouse.enter}
        onMouseLeave={onMouse.leave}
      >
        <Grid item xs={4} display='flex' justifyContent='flex-start'>
          <Button className={visible ? classes.button : classes.invisible} onClick={() => switchImage.previous(true)}><KeyboardDoubleArrowLeftIcon /></Button>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4} display='flex' justifyContent='flex-end'>
          <Button className={visible ? classes.button : classes.invisible} onClick={() => switchImage.next()}><KeyboardDoubleArrowRightIcon /></Button>
        </Grid>
      </Grid>
    </Tooltip>
  )
}

export default Carousel;