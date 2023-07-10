import { Tooltip } from '@mui/material';
import React from 'react';

const TextWithMaxLength = ({ text = "", maxLength = 35, noTooltip = false }) => {
  // console.log("Rendering TextWithMaxLength for text=",text);

  if (!text || typeof text !== 'string') {
    console.log(">> Err weird or missing text : ", text);
    return null;
  }


  if (text.length < maxLength + 3) // 3 dots
    return text;

  const TextSliced = (
    <span>
      { text.slice(0,maxLength) }...
    </span>
  );

  return (
    noTooltip
    ? TextSliced 
    : <Tooltip title={text}>
      { TextSliced }
    </Tooltip>
  );
}

export default TextWithMaxLength;