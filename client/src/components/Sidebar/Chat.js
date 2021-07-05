import React from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { setConversationActive } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadStatusChip: {
    marginRight: theme.spacing(4),
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { setConversationActive, conversation } = props;
  const otherUser = conversation.otherUser;
  const unreadMessage = conversation.unreadMessageCount;

  const handleClick = async (conversation) => {
    await setConversationActive(conversation);
  };
  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        shouldEmphasize={unreadMessage > 0}
      />
      {unreadMessage > 0 && (
        <Chip
          size="small"
          label={unreadMessage}
          color="primary"
          className={classes.unreadStatusChip}
        />
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConversationActive: (conversation) => {
      dispatch(setConversationActive(conversation));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
