const constant = require(__basePath + 'app/config/constant');
const router   = require('express').Router({
    caseSensitive: true,
    strict       : true
});
const wordpressController  = require(constant.path.module + 'assembly/wordpress/wordpressAssembly');
const validation    = require(constant.path.module + 'assembly/wordpress/wordpressValidation');

router.post(
    '/getPosts',
    wordpressController.getPosts
);

router.get(
    '/getCategory',
    wordpressController.getCategory
);

router.get(
    '/getTags',
    wordpressController.getTags
);

router.post(
    '/getRelatedPosts',
    wordpressController.getRelatedPosts
);

router.post(
    '/getPostById',
    wordpressController.getPostById
);



module.exports = {
    router: router
};
