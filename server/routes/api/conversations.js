const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText =
        convoJSON.messages[convoJSON.messages.length - 1].text;
      convoJSON.unreadMessageCount = await convo.getUnreadMessageCount(userId);
      conversations[i] = convoJSON;
    }

    // The query currently can only guarantee the order of messages in the conversation
    // is properly ordered. However, it doesn't guarantee the order of the conversation itself
    // thus we need to sort to ensure the conversation is sorted by latest message timestamp
    conversations.sort((conv1, conv2) => {
      const date1 = new Date(
        conv1.messages[conv1.messages.length - 1].createdAt
      );
      const date2 = new Date(
        conv2.messages[conv2.messages.length - 1].createdAt
      );
      if (date1.getTime() > date2.getTime()) {
        return -1;
      } else if (date1.getTime() < date2.getTime()) {
        return 1;
      }
      return 0;
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.patch("/:conversationId/messages/read", async (req, res, next) => {
  try {
    const conversation = await Conversation.findByPk(req.params.conversationId);
    const userId = req.user.id;

    // Check to make sure user has access to the conversation using hasAccess
    if (!conversation.hasAccess(userId)) {
      res
        .status(401)
        .send("Attempted to update messages in unauthorized conversation");
    }
    await conversation.readAllMessage(userId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
