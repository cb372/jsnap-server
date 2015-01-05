var q = require('q');

exports.translateJ2E = function(japaneseText) {
  var deferred = q.defer();
  // TODO call Bing translation API
  deferred.resolve({
    sourceText: japaneseText,
    translatedText: 'Hello'
  });
  return deferred.promise;
};
