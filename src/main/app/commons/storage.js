const { v4: uuid } = require("uuid");
const multer = require("multer");
const _ = require("lodash");
const Boom = require("@hapi/boom");

const storage = multer.memoryStorage();
const upload = ({ maxSize, mimes }) => {
  return multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (!_.includes(mimes, file.mimetype)) {
        return cb(Boom.badRequest("Invalid image"), false);
      }

      cb(null, true);
    },
  });
};

module.exports = {
  uuid,
  multer,
  storage,
  upload,
};
