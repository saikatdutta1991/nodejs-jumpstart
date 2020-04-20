const firebase = require("../commons/firebase");
const { sendResponse } = require("../commons/api");
const SocialAuth = require("../commons/helpers/socialAuth");
const Boom = require("@hapi/boom");
const jwt = require("../commons/jwt");

/**
 * Authenticate codesuser using google
 *
 * @param {*} req
 * @param {*} res
 */
const googleAuth = async (req, res) => {
  const { id_token: idToken } = req.body;

  // Build Firebase credential with the Google ID token.
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

  try {
    // Sign in with credential from the Google user.
    var authResponse = await firebase.auth().signInWithCredential(credential);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }

  /** extract auth response */
  const {
    user: {
      displayName,
      photoURL,
      providerData: [{ uid, email }],
    },
  } = authResponse;

  const [fname, lname] = displayName.split(" ");

  /** fetch user from db */
  const user = await SocialAuth.findUser(uid, email);

  // insert or update user and social accounts
  const {
    user: updatedUser,
    socialAccount: updatedSocialAccount,
  } = await SocialAuth.createOrUpdateUser(
    {
      id: user ? user.id : null,
      first_name: fname,
      last_name: lname,
      email: email,
      dp_url: photoURL,
    },
    {
      provider: constants.provider.GOOGLE,
      social_id: uid,
    }
  );

  /** generate jwt token */
  const authToken = jwt.sign({
    sub: updatedUser.id,
    role: updatedUser.role,
  });

  return sendResponse(res, codes.OK, "OK", "Authentication successful", {
    authToken,
    updatedUser,
    updatedSocialAccount,
  });
};

/**
 * Authenticate user using facebook
 *
 * @param {*} req
 * @param {*} res
 */
const farebookAuth = async (req, res) => {
  const { access_token: accessToken } = req.body;

  // Build Firebase credential with the Google ID token.
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

  try {
    // Sign in with credential from the Google user.
    var authResponse = await firebase.auth().signInWithCredential(credential);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }

  /** extract auth response */
  const {
    user: {
      providerData: [{ uid, email, displayName, photoURL }],
    },
  } = authResponse;

  const [fname, lname] = displayName.split(" ");

  /** fetch user from db */
  const user = await SocialAuth.findUser(uid, email);

  // insert or update user and social accounts
  const {
    user: updatedUser,
    socialAccount: updatedSocialAccount,
  } = await SocialAuth.createOrUpdateUser(
    {
      id: user ? user.id : null,
      first_name: fname,
      last_name: lname,
      email: email,
      dp_url: photoURL,
    },
    {
      provider: constants.provider.FACEBOOk,
      social_id: uid,
    }
  );

  /** generate jwt token */
  const authToken = jwt.sign({
    sub: updatedUser.id,
    role: updatedUser.role,
  });

  return sendResponse(res, codes.OK, "OK", "Authentication successful", {
    authToken,
    updatedUser,
    updatedSocialAccount,
  });
};

module.exports = { googleAuth, farebookAuth };
