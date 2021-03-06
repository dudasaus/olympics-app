const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Returns false if any values in the array are null or undefined
function noNullValues(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === null || arr[i] === undefined) {
      return false;
    }
  }
  return true;
}
module.exports.noNullValues = noNullValues;

// Send an error response
function errorResponse(res, statusCode, msg) {
  const error = { status_code: statusCode, message: msg };
  res.status(statusCode);
  res.json(error);
}
module.exports.errorResponse = errorResponse;

// Returns a sha256 hash (unsalted) of msg
function hash(msg) {
  const hasher = crypto.createHash('sha256');
  hasher.update(msg);
  return hasher.digest('hex');
}
module.exports.hash = hash;

// Check if a request has write permissions
const apiKeys = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'apiKeys.json')));
function writePermission(req) {
  const { key } = req.query;
  return (key && apiKeys[hash(key)]);
}
module.exports.writePermission = writePermission;
