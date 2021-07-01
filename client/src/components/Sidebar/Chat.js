import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setConversationActive } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  chip: {
    marginRight: 20,
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setConversationActive(conversation);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unreadMessage = this.props.conversation.unreadMessageCount;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {unreadMessage > 0 ? (
          <Chip
            size='small'
            label={unreadMessage}
            color='primary'
            className={classes.chip}
          />
        ) : null}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setConversationActive: (conversation) => {
      dispatch(setConversationActive(conversation));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
