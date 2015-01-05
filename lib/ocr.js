var q = require('q');

exports.extractJapaneseText = function(photoFile) {
  var deferred = q.defer();
  // TODO run Tesseract
  deferred.resolve('こんにちは');
  return deferred.promise;
};
