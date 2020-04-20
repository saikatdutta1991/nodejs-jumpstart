const { v4: uuid } = require("uuid");

const mimeMaps = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
};

const randomFilename = (mimetype) => {
  return `${uuid()}${mimeMaps[mimetype]}`;
};

module.exports = {
  randomFilename,
};
