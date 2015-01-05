var q = require('q');
var debug = require('debug')('jsnap-server');
var temp = require('temp');
var fs = require('fs');
var aws = require('aws-sdk');

/**
 * Parses a data URL and extracts an image as a Buffer
 * @param {string} dataUrl - A base64 encoded data URL for an image, e.g. "data:image/png;base64,d34db33f"
 * @return {deferred} a hash containing `extension` and `buffer` fields
 */
exports.parseDataUrl = function(dataUrl) {
  var deferred = q.defer();
  var matches = dataUrl.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
  if (matches.length !== 3) {
    deferred.reject(new Error('Invalid data URL or not an image'));
  } else {
    var result = {
      extension: matches[1],
      buffer: new Buffer(matches[2], 'base64')
    };
    debug('parsed data URL', result.extension);
    deferred.resolve(result);
  }
  return deferred.promise;
};

exports.uploadToS3 = function(buffer, filename) {
  var deferred = q.defer();
  // TODO upload to S3
  debug('Uploaded to S3');
  deferred.resolve('OK');
  return deferred.promise;
};

exports.saveToFile = function(buffer, filename) {
  var deferred = q.defer();
  var tmpFilename = temp.path({suffix: filename});
  fs.writeFile(tmpFilename, buffer, function(err) {
    if (err) deferred.reject(err);
    else {
      debug('Saved to file', tmpFilename);
      deferred.resolve(tmpFilename);
    }
  }); 
  return deferred.promise;
};
