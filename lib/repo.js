var q = require('q');

exports.insertTranslation = function(requestId) {
  return new function(translation) {
    var deferred = q.defer();
    // TODO insert record into DynamoDB
    deferred.resolve({
      requestId: requestId,
      sourceText: translation.sourceText,
      translatedText: translation.translatedText
    });
    return deferred.promise;
  }
};
