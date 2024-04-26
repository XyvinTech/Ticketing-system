require("dotenv").config();
const AWS = require("aws-sdk");
const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadFilesToS3 = async (files) => {
  const uploadPromises = files.map((file) => {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.originalname,
      ContentType: file.mimetype,
      Body: file.buffer,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({ filename: file.originalname, url: data.Location });
        }
      });
    });
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);
    return { status: true, results: uploadResults };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

module.exports = uploadFilesToS3;
