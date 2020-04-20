const Boom = require("@hapi/boom");
const ReasonModel = require("../models/reason");
const PhotoModel = require("../models/photo");

/**
 * @api {post} /api/v1/reasons Add new reason
 * @apiname createReason
 *
 * @apiBody {String} text Reason text
 *
 * @apiError {String} Duplicate reason
 */
const createReason = async (req, res) => {
  // Check if reason text duplicate
  const existingReason = await ReasonModel.query().findOne({
    text: req.body.text,
  });

  if (existingReason) {
    throw Boom.badRequest("Reason text already exists");
  }

  const reason = await ReasonModel.query().insertAndFetch({
    text: req.body.text,
  });

  return sendResponse(res, codes.OK, "Ok", "Reason created", { reason });
};

/**
 * @api {get} /api/v1/reasons/:id/photos Request list of photos by reasons id
 * @apiName getReasonPhotos
 *
 * @param {Object} req
 * @param {Object} res
 * @apiParam {String} id Reason table id
 */
const getReasonPhotos = async (req, res) => {
  const photos = await PhotoModel.getByReasonIds([req.params.id]);
  return sendResponse(res, codes.OK, "Ok", "Photos fetched", { photos });
};

/**
 * @api {get} /api/v1/reasons Request list of reasons/tags
 * @apiName getReasons
 *
 * @param {Object} req
 * @param {Object} res
 */
const getReasons = async (req, res) => {
  const reasons = await ReasonModel.query().orderBy("text", "asc");
  return sendResponse(res, codes.OK, "OK", "Reasons fetched", { reasons });
};

module.exports = {
  getReasons,
  getReasonPhotos,
  createReason,
};
