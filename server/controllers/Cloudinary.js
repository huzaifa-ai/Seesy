var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'eruss',
  api_key: '445832364688451',
  api_secret: '4sQfOHMgSk4CDlLVI8INQ1zwu0o',
});

exports.uploadEmployeerVideo = async (req, res) => {
  console.log(req.body);

  // const { name, size, type } = req.body.credentials;

  // try {
  //   await cloudinary.uploader
  //     .upload(name, {
  //       resource_type: 'video',
  //     })
  //     .then((result) => {
  //       res.json(result);
  //       console.log(('Success', JSON.stringify(result)));
  //     });
  // } catch (err) {
  //   res.json(err);
  // }
};
