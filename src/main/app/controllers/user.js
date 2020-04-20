const Joi = require("@hapi/joi");
const validator = require("../commons/validator");
const isAuthorized = require("../middlewares/isAuthorized");
const { upload } = require("../commons/storage");
const _ = require("lodash");
const { uplaodImage } = require("../commons/s3Bucket");
const imageHelper = require("../commons/helpers/image");
const UserModel = require("../models/user");
const ReasonModel = require("../models/reason");
const ReasonSubmissionModel = require("../models/reasonSubmission");
const PhotoModel = require("../models/photo");
const SubmissionModel = require("../models/submission");
const Boom = require("@hapi/boom");
const Logger = require("../commons/logger");
const DB = require("../commons/db");

const submitResonseValidators = () => {
  return [
    isAuthorized,
    upload({
      maxSize: 5 * 1024 * 1024,
      mimes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    }).array("photo"),
    validator.body(
      Joi.object({
        reason_ids: Joi.array()
          .required()
          .min(1)
          .label("Reasons")
          .items(Joi.number().required()),
      })
    ),
  ];
};

/**
 * @api {post} /api/v1/users/:id/reasons
 * @apiName submitReasons
 *
 * @apiParam {String} id User primary key id
 * @apiBody {Array} reason_ids Array of valid reason ids
 * @apiBody {Array[Object]} photo Array of images
 *
 */
const submitReasons = async (req, res) => {
  // Check reason ids are valid
  const reasons = await ReasonModel.query()
    .select("id")
    .whereIn("id", req.body.reason_ids);

  if (reasons.length !== req.body.reason_ids.length) {
    throw Boom.badRequest("One of the reason is invalid");
  }

  /** upload photos */
  const uploadedPhotos = await Promise.all(
    _.map(req.files, (item) => {
      return uplaodImage({
        filename: imageHelper.randomFilename(item.mimetype),
        file: item.buffer,
        contentTtype: item.mimetype,
      });
    })
  );

  const trx = await SubmissionModel.startTransaction();

  try {
    const submission = await SubmissionModel.query(trx).insertAndFetch({
      user_id: req.auth.id,
    });

    const reasonSubmssionObjs = _.map(reasons, (r) => {
      return { submission_id: submission.id, reason_id: r.id };
    });

    const photosObjs = _.map(uploadedPhotos, (photo) => {
      return {
        submission_id: submission.id,
        url: photo.Location,
        storage: "s3",
        bucket: photo.Bucket,
      };
    });

    await Promise.all([
      DB.bulkInsert("reason_submissions", reasonSubmssionObjs, trx),
      DB.bulkInsert("photos", photosObjs, trx),
    ]);

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    Logger.error("submitReasons", err);
    throw Boom.badImplementation("Submit reasons failed");
  }

  sendResponse(res, codes.OK, "Ok", "Reasons submitted successfully.");
};

/**
 * @api {get} /api/v1/users/:id Request user information
 * @apiName getUser
 *
 * @param {Object} req
 * @param {Object} res
 * @apiParam {String} id User primary key id
 */
const getUser = async (req, res) => {
  const user = await UserModel.query().findOne({ id: req.params.id });
  return sendResponse(res, codes.OK, "Ok", "User fetched", { user });
};

module.exports = {
  getUser,
  submitReasons,
  submitResonseValidators,
};
