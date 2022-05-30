import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(
                null,
                'images/origin/' +
                    Date.now() +
                    '.' +
                    file.originalname.split('.').pop()
            );
        },
    }),
});

export { upload };
