var express = require('express');
var router = express.Router();
var debug = require('debug')('jsnap-server');
var uuid = require('node-uuid');
var photo = require('../lib/photo');
var ocr = require('../lib/ocr');
var translation = require('../lib/translation');
var repo = require('../lib/repo');

/* POST image for OCR and translation. */
router.post('/upload', function(req, res) {
  var dataUrl = req.body.photo;

  var requestId = uuid.v4();

  // TODO remove this massive debug log
  debug('uploaded image', dataUrl);

  photo.parseDataUrl(dataUrl)
  .then(function(photoInfo) {
    var filename = requestId + '.' + photoInfo.extension;
    debug('filename', filename);

    // Async upload to S3, but ignore result
    photo.uploadToS3(photoInfo.buffer, filename);

    // Return result of saving to file, i.e. the full file path
    return photo.saveToFile(photoInfo.buffer, filename);
  })
  .then(ocr.extractJapaneseText)
  .then(translation.translateJ2E)
  .then(repo.insert(requestId))
  .then(function(insertedRecord) {
    res.json(insertedRecord);
  })
  .catch(function(error) {
    debug(error);
    res.status(500);
    res.json({error: error});
  });

});

/* POST feedback */
router.post('/feedback/:requestId', function(req, res) {
  /**
   * TODO
   * - parse request
   * - add attributes to Dynamo record
   */
  res.json({success: true});
});

module.exports = router;
