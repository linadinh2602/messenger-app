import React from "react";
import Chip from "@material-ui/core/Chip";

const ChipStatus = (props) => {
  const { count } = props;
  return (
    <div>
      <Chip size='small' label={count} color='primary' />
    </div>
  );
};

export default ChipStatus;
