const constant    = require(__basePath + '/app/config/constant');
const httpRequest = require(constant.path.app + 'util/httpRequest');
const config      = require(constant.path.app + 'core/configuration');
const baseModel   = require(constant.path.app + 'module/model/system/baseModel');
const utility     = require(constant.path.app + 'util/utility');

class WordPressModel extends baseModel {

    getPosts(body, callback) {

        let offset = body.offset;
        let url ="";

        if(utility.isEmpty(body.category) === false && utility.isEmpty(body.offset) === false){
           url =  config.get('systems:wordPressSystem:apiURL') + `107403796/posts/?number=25&offset=${offset}&category=${body.category}`;
        }else if(utility.isEmpty(body.tag) === false && utility.isEmpty(body.offset) === false){
           url =  config.get('systems:wordPressSystem:apiURL') + `107403796/posts/?number=25&offset=${offset}&tag=${body.tag}`;
        }else if(utility.isEmpty(body.offset) === false){
           url =  config.get('systems:wordPressSystem:apiURL') + `107403796/posts/?number=25&offset=${offset}`
        }else{
           url = config.get('systems:wordPressSystem:apiURL') + `107403796/posts/?number=25&offset=0`
        }

        return this.sendRequest(
            'GET',
            url,
            {},
            {},
            {},
            callback
        );
    }
    
    getCategory(callback) {

        return this.sendRequest(
            'GET',
            config.get('systems:wordPressSystem:apiURL') + `107403796/categories`,
            {},
            {},
            {},
            callback
        );
    }

    getTags(callback) {

        return this.sendRequest(
            'GET',
            config.get('systems:wordPressSystem:apiURL') + `107403796/tags?order_by=count&order=DESC&number=10`,
            {},
            {},
            {},
            callback
        );
    }

    getRelatedPosts(postId, callback) {

        return this.sendRequest(
            'POST',
            config.get('systems:wordPressSystem:apiURL') + `107403796/posts/${postId}/related`,
            {},
            {size:3},
            {},
            callback
        );
    }

    getPostById(postId, callback) {

        return this.sendRequest(
            'GET',
            config.get('systems:wordPressSystem:apiURL') + `107403796/posts/${postId}`,
            {},
            {},
            {},
            callback
        );
    }

    // getSetDeviceInfo(fcmToken, payload, callback) {

    //     return this.sendRequest(
    //         'POST',
    //         config.get('systems:customerManagementSystem:apiURL') + `v1/device/fcm/${fcmToken}`,
    //         {},
    //         payload,
    //         {},
    //         callback
    //     );
    // }

}

module.exports = WordPressModel;
