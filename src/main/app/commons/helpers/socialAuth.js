const UserModel = require("../../models/user");
const SocialAccountModel = require("../../models/socialAccount");
const Boom = require("@hapi/boom");
const _ = require("lodash");
const Logger = require("../logger");

/**
 * Find social user
 *
 * It finds user with socialID first,
 * If can't find then try with email
 *
 * @param {*} socialID
 * @param {*} email
 */
const findUser = async (socialID, email) => {
  /** find user using social id */
  const socialAccount = await SocialAccountModel.query()
    .withGraphFetched("[user]")
    .findOne({ social_id: socialID });

  if (socialAccount) {
    return socialAccount.user;
  }

  // find user using email
  return await UserModel.query().findOne({ email: email });
};

/**
 * Create new user
 *
 * Creates new user and social account or update
 *
 * @param {*} provider
 * @param {*} socialID
 * @param {*} userDetails
 */
const createOrUpdateUser = async (user, socialAccount) => {
  const trx = await UserModel.startTransaction();
  const userID = user.id;

  _.omit(user, ["id"]);

  try {
    /** insert or update user */
    if (userID) {
      user = await UserModel.query(trx).patchAndFetchById(userID, user);
    } else {
      user = await UserModel.query(trx).insertAndFetch(user);
    }

    /** insert or update social account */
    const socialrecord = await SocialAccountModel.query().findOne({
      user_id: user.id,
      provider: socialAccount.provider,
    });

    if (socialrecord) {
      socialAccount = await socialrecord
        .$query(trx)
        .patchAndFetch(socialAccount);
    } else {
      _.set(socialAccount, "user_id", user.id);
      socialAccount = await SocialAccountModel.query(trx).insertAndFetch(
        socialAccount
      );
    }

    await trx.commit();
    return { user, socialAccount };
  } catch (err) {
    await trx.rollback();
    Logger.error("createOrUpdateUser", err.message);
    throw Boom.badImplementation("User creation transaction failed");
  }
};

module.exports = {
  findUser,
  createOrUpdateUser,
};
