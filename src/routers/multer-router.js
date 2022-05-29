const { Router } = require('express');
const multerRouter = Router();
import { upload } from '../middlewares';

multerRouter.post(
    '/single',
    upload.single('uploadedImage'),
    async (req, res, next) => {}
);
export { multerRouter };

//const upload = multer({ dest: 'uploads/' });

//'images/origin/' + '.' + file.originalname.split('.').pop()
//'images/origin/' + Date.now() + '.' + file.originalname.split('.').pop()

// const image = req.file.location;
// res.send({
//     imageUrl: image,
//     file: req.file,
// });

//aws.config.loadFromPath(__dirname + '/../config/s3.json');

// aws.config.update({
//     region: '',
//     credentials: new aws.CognitoIdentityCredentials({
//         IdentityPoolId: '',
//     }),
// });

//const s3 = new aws.S3();
//const REGION = ''; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
//const s3 = new S3Client({ region: REGION });

// import { PutObjectCommand } from '@aws-sdk/client-s3';
// import { S3Client } from '@aws-sdk/client-s3';
// import { path } from 'path';
// import { fs } from 'fs';
// // Set the AWS Region.
// const REGION = ''; //e.g. "us-east-1"
// // Create an Amazon S3 service client object.
// const s3Client = new S3Client({ region: REGION });
// //export { s3Client };
// const file = '../uploads/agoal.jpg';
// //const fileStream = fs.createReadStream(file);
// // Set the parameters.
// export const uploadParams = {
//     Bucket: '',
//     // Specify the name of the new object. For example, 'index.html'.
//     // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
//     Key: file,
//     // Content of the new object.
//     Body: 'test',
// };

// multerRouter.post('/single', async (req, res) => {
//     try {
//         const data = await s3Client.send(new PutObjectCommand(uploadParams));
//         console.log('Success', data);
//         return data;
//     } catch (error) {
//         console.log('Error', error);
//     }
// });

// multerRouter.post(
//     '/single',
//     upload.array('uploadedImage'),
//     (req, res, next) => {
//         const image = req.file.location;
//     res.send({
//         imageUrl: image,
//         file: req.file,
//     });
// const promise = upload.promise();
//     promise.then((data) => {
//         console.log('업로드 성공');
//     }),
//         (err) => {
//             console.log('오류' + err.message);
//         };

// const s3 = new aws.S3();
// const upload = new aws.S3.ManagedUpload({
//     params: {
//         Bucket: '',
//         Key: 'filename2.jpg',
//         Body: 'test',
//     },
// });
// const uploaded = multer({
//     storage: multerS3({
//         s3,
//         bucket: '',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, `uploads/${Date.now()}_${file.originalname}`);
//         },
//     }),
// });

// AWS.config.update({
//     region: bucketRegion,
//     credentials: new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: IdentityPoolId,
//     }),
// });
// const upload = new AWS.S3.ManagedUpload({
//     params: {
//         Bucket: '',
//         Key: '',
//         Body: file,
//     },
// });

// const promise = upload.promise();

// promise.then((data) => console.log('이미지 업로드에 성공했습니다.'));
