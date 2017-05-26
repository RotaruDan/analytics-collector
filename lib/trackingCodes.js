'use strict';

module.exports = (function () {
    var Collection = require('easy-collections');
    var db = require('./db');
    var utils = require('./utils');
    var trackingCodes = new Collection(db, 'trackingcodes');

    trackingCodes.sort = {
        _id: -1
    };

    /**
     * Returns the tracking codes of a given username.
     */
    trackingCodes.my = function (username) {
        if (!username) {
            throw {
                message: 'Username not provided!',
                status: 400
            };
        }
        return trackingCodes.find({authors: username}).then(function (trackingCode) {
            if (!trackingCode) {
                throw {
                    message: 'Tracking code does not exist',
                    status: 404
                };
            }

            return {
                trackingCode: trackingCode._id.toString()
            };
        });
    };

    /**
     * Creates a new tracking code for the given username.
     * @Returns a promise with the tracking code:
     *       {
     *           trackingCode: trackingCode._id.toString()
     *       }
     */
    trackingCodes.create = function (username) {
        return trackingCodes.insert({authors: [username]}).then(function (trackingCode) {
            if (!trackingCode) {
                throw {
                    message: 'Tracking code does not exist',
                    status: 404
                };
            }

            return {
                trackingCode: trackingCode._id.toString()
            };
        });
    };

    trackingCodes.remove = function (id, username) {
        return trackingCodes.findById(id)
            .then(function (trackingCode) {
                if (!trackingCode) {
                    throw {
                        message: 'Tracking code does not exist',
                        status: 404
                    };
                }

                if (!trackingCode.authors || trackingCode.authors.indexOf(username) === -1) {
                    throw {
                        message: 'You don\'t have permission to delete this tracking code.',
                        status: 401
                    };
                }

                return trackingCodes.removeById(id).then(function (result, err) {
                    if (!err) {
                        return {
                            message: 'Success.'
                        };
                    }
                });
            });
    };

    trackingCodes.modify = function (id, username, body, add) {
        return trackingCodes.findById(id)
            .then(function (classRes) {
                if (!classRes) {
                    throw {
                        message: 'Tracking code does not exist',
                        status: 404
                    };
                }

                if (!classRes.authors || classRes.authors.indexOf(username) === -1) {
                    throw {
                        message: 'You don\'t have permission to modify this tracking code.',
                        status: 401
                    };
                }

                if (body._id) {
                    delete body._id;
                }

                var update = {};
                utils.addToArrayHandler(update, body, 'authors', add);

                return trackingCodes.findAndUpdate(id, update);
            });
    };

    trackingCodes.preRemove(function (id, next) {
        // TODO remove kafka topic :))
        next();
    });

    return trackingCodes;
})();