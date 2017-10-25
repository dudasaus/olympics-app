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

function errorResponse(res, statusCode, msg) {
  const error = { status_code: statusCode, message: msg };
  res.status(statusCode);
  res.json(error);
}
module.exports.errorResponse = errorResponse;
