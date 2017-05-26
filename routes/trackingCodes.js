'use strict';

var express = require('express'),
    router = express.Router(),
    restUtils = require('./rest-utils');

var trackingCodes = require('../lib/trackingCodes');

/**
 * @api {put} /trackingcodes/my Returns all the tracking codes.
 * @apiName GetTrackingCodes
 * @apiGroup TrackingCodes
 *
 * @apiSuccess(200) Success.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "_id": "559a447831b7acec185bf513",
 *              "authors": ["someTeacher"]
 *          }
 *      ]
 *
 */
router.put('/my', function (req, res) {
    var username = req.headers['x-gleaner-user'];
    restUtils.processResponse(trackingCodes.my(username), res);
});


/**
 * @api {post} /trackingcodes/:trackingCode Changes the authors array of a tracking code.
 * @apiName PostTrackingCodes
 * @apiGroup TrackingCodes
 *
 * @apiParam {String[]} [authors] Array with the username of the authors that you want to add to the session. Also can be a String
 * @apiParamExample {json} Request-Example:
 *      {
 *          "authors": ["author1", "author2"],
 *      }
 *
 * @apiSuccess(200) Success.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_id": "559a447831b7acec185bf513",
 *          "authors": ["someTeacher"]
 *      }
 */
router.post('/:trackingCode', function (req, res) {
    var username = req.headers['x-gleaner-user'];
    restUtils.processResponse(trackingCodes.create(username, req.body, true), res);
});

/**
 * @api {put} /trackingcodes/:trackingCode Changes the authors array of a tracking code.
 * @apiName PutTrackingCodes
 * @apiGroup TrackingCodes
 *
 * @apiParam {String[]} [authors] Array with the username of the authors that you want to add to the session. Also can be a String
 * @apiParamExample {json} Request-Example:
 *      {
 *          "authors": ["author1", "author2"],
 *      }
 *
 * @apiSuccess(200) Success.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "authors": ["someTeacher", "author1", "author2"]
 *      }
 */
router.put('/:trackingCode', function (req, res) {
    var username = req.headers['x-gleaner-user'];
    restUtils.processResponse(trackingCodes.modify(req.params.trackingCode, username, req.body, true), res);
});

/**
 * @api {put} /trackingcodes/:trackingCode/remove Removes authors from a tracking code.
 * @apiName PutTrackingCodes
 * @apiGroup TrackingCodes
 *
 * @apiParam {String} classId The id of the class.
 * @apiParam {String[]} [authors] Array with the username of the authors that you want to remove from the tracking code. Also can be a String
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "authors": ["author1", "author2"],
 *      }
 *
 * @apiSuccess(200) Success.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_id": "559a447831b76cec185bf511",
 *          "authors": ["someTeacher"]
 *      }
 */
router.put('/:trackingCode/remove', function (req, res) {
    var username = req.headers['x-gleaner-user'];
    restUtils.processResponse(trackingCodes.modify(req.params.trackingCode, username, req.body, false), res);
});


/**
 * @api {delete} /trackingcodes/:classId Deletes a class and all the sessions associated with it
 * @apiName DeleteTrackingCodes
 * @apiGroup TrackingCodes
 *
 * @apiParam {String} classId The id of the session.
 *
 * @apiSuccess(200) Success.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         "message": "Success."
 *      }
 */
router.delete('/:trackingCode', function (req, res) {
    var username = req.headers['x-gleaner-user'];
    restUtils.processResponse(trackingCodes.remove(req.params.trackingCode, username), res);
});

module.exports = router;