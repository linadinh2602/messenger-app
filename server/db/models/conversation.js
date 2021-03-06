const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.prototype.hasAccess = function (userId) {
  return this.user1Id === userId || this.user2Id === userId;
};

Conversation.prototype.getUnreadMessageCount = async function (userId) {
  const unreadMessageCount = await Message.count({
    where: {
      [Op.and]: [
        {
          conversationId: {
            [Op.eq]: this.id,
          },
        },
        {
          senderId: {
            [Op.ne]: userId,
          },
        },
        {
          hasRead: {
            [Op.is]: false,
          },
        },
      ],
    },
  });

  return unreadMessageCount;
};

Conversation.prototype.readAllMessage = async function (userId) {
  await Message.update(
    { hasRead: true },
    {
      where: {
        [Op.and]: [
          {
            conversationId: {
              [Op.eq]: this.id,
            },
          },
          {
            senderId: {
              [Op.ne]: userId,
            },
          },
          {
            hasRead: {
              [Op.is]: false,
            },
          },
        ],
      },
    }
  );
};

module.exports = Conversation;
