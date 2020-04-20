const AppConfig = require("../../config/app");
const Aws = require("aws-sdk");

Aws.config.update({
  accessKeyId: AppConfig.awsAccessKeyId,
  secretAccessKey: AppConfig.awsSecretAccessKey,
});

const s3 = new Aws.S3();

const uplaodImage = async ({ filename, file, contentType }) => {
  params = {
    Bucket: AppConfig.awsS3Bucket,
    Key: filename,
    Body: file,
    ACL: "public-read",
    contentType,
  };

  return s3.upload(params).promise();
};

module.exports = {
  uplaodImage,
};
