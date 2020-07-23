const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const wordpressModel        = require(constant.path.app + 'module/model/system/wordPressModel');
const async                 = require('async');
const moment                = require('moment');
const {logger}              = require(constant.path.app + 'core/logger');
const underscore            = require('underscore');

const wordpressObj          = new wordpressModel();



/*
 * get posts 
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.getPosts = function (req, res, next) {
    
    logger.info('[%s get Posts] get Assets request with params: %s ', "Admin ",JSON.stringify(req.body));

    let getPosts = function ( callback) {
       
        wordpressObj.getPosts(req.body, function (error, result, body) {

            if (error) {
                return callback(error);
            }
            return callback(null, result);

        });
    }
 
    async.waterfall([
        getPosts
    ], function (error, result) {

        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        logger.info('[%s %s] Returned with status [%s].', "Admin ", 'getPosts', 200);

        return res.status(200).json(response.build('SUCCESS', result));

    });
};

/*
 * get Category 
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */

exports.getCategory = function (req, res, next) {
    
    logger.info('[%s get category] get Assets request with params: %s ', "Admin ",JSON.stringify(req.body));

    let getCategory = function ( callback) {
       
        wordpressObj.getCategory(function (error, result, body) {

            if (error) {
                return callback(error);
            }
            return callback(null, result.body.categories);

        });
    }
 
    async.waterfall([
        getCategory
    ], function (error, result) {

        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        logger.info('[%s %s] Returned with status [%s].', "Admin ", 'getCategory', 200);

        return res.status(200).json(response.build('SUCCESS', result));

    });
};


/*
 * get Tags 
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */

exports.getTags = function (req, res, next) {
    
    logger.info('[%s get Tags] get Assets request with params: %s ', "Admin ",JSON.stringify(req.body));

    let getTags = function ( callback) {
       
        wordpressObj.getTags(function (error, result, body) {

            if (error) {
                return callback(error);
            }
            return callback(null, result.body.tags);

        });
    }
 
    async.waterfall([
        getTags
    ], function (error, result) {

        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        logger.info('[%s %s] Returned with status [%s].', "Admin ", 'getTags', 200);

        return res.status(200).json(response.build('SUCCESS', result));

    });
};

/*
 * get related Posts 
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */

exports.getRelatedPosts = function (req, res, next) {
    
    logger.info('[%s get related posts] get Assets request with params: %s ', "Admin ",JSON.stringify(req.body));
    let postId = req.body.postId;

    let getRelatedPosts = function (callback) {
       
        wordpressObj.getRelatedPosts(postId, function (error, result, body) {

            if (error) {
                return callback(error);
            }
            return callback(null, result);

        });
    }
 
    async.waterfall([
        getRelatedPosts
    ], function (error, result) {

        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        logger.info('[%s %s] Returned with status [%s].', "Admin ", 'related posts', 200);

        return res.status(200).json(response.build('SUCCESS', result));

    });
};


/*
 * get Post by Id 
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */

exports.getPostById = function (req, res, next) {
    
    logger.info('[%s get post By Id] get Assets request with params: %s ', "Admin ",JSON.stringify(req.body));
    let postId = req.body.postId;

    let getPostById = function (callback) {
       
        wordpressObj.getPostById(postId, function (error, result, body) {

            if (error) {
                return callback(error);
            }
            return callback(null, result);

        });
    }
 
    async.waterfall([
        getPostById
    ], function (error, result) {

        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        logger.info('[%s %s] Returned with status [%s].', "Admin ", 'get Post By Id', 200);

        return res.status(200).json(response.build('SUCCESS', result));

    });
};

