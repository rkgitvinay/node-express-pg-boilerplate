const httpStatus = require('http-status');

/**
 * This class is used to send success responses.
 * @class SuccessResponse
 * @description This class contains methods to send success responses in a consistent format.
 */

class SuccessResponse {
  /**
   * This method is used to send a success response.
   * @param {*} res
   * @param {*} code
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static send(res, { code = httpStatus.status.OK, message = 'Success', data = {} }) {
    return res.status(code).json({ status: true, code, message, data });
  }

  /**
   * Created - 201
   * This response code indicates that the request has succeeded and
   * a new resource has been created as a result.
   * @param {*} res
   * @param {*} data
   * @param {*} message
   * @returns
   */
  static created(res, data, message = 'Resource created') {
    return this.send(res, { code: httpStatus.status.CREATED, message, data });
  }

  /**
   * OK - 200
   * This response code indicates that the request has succeeded.
   * @param {*} res
   * @param {*} data
   * @param {*} message
   * @returns
   */
  static ok(res, data, message = 'Success') {
    return this.send(res, { code: httpStatus.status.OK, message, data });
  }

  /**
   * No Content - 204
   * This response code indicates that the server successfully
   * processed the request and is not returning any content as 204 omits the body.
   * @param {*} res
   * @param {*} message
   * @returns
   */
  static noContent(res, message = 'No Content') {
    return this.send(res, { code: httpStatus.status.NO_CONTENT, message });
  }

  /**
   * Accepted - 202
   * This response code indicates that the request has been accepted for async processing,
   * but the processing has not been completed.
   * @param {*} res
   * @param {*} data
   * @param {*} message
   * @returns
   */
  static accepted(res, data, message = 'Request accepted') {
    return this.send(res, { code: httpStatus.status.ACCEPTED, message, data });
  }
}

module.exports = SuccessResponse;
