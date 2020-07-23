import apiConstants from "../constants/apiConstants";
import axios from "axios";
const request = require("request");
const rp = require("request-promise");

const underscore = require("underscore");
const httpRequest = new Object();

/*
 * http external call (GET|POST)
 * @param string method
 * @param string url
 * @param {object} headers
 * @param {object} params
 * @param int timeout
 * @param {object} callback
 * @returns {callback}
 */

httpRequest.getToken = () => {
  if (underscore.has(localStorage, "persist:root")) {
    let tokenObj = JSON.parse(localStorage["persist:root"]);
    if (underscore.has(tokenObj, "environment")) {
      tokenObj = JSON.parse(tokenObj.environment);
      return tokenObj.token;
    }
    return null;
  }
  return null;
};

httpRequest.call = function(
  method = "GET",
  url,
  headers = {},
  params = {},
  options = {},
  callback
) {
  if (url.length == false) {
    return callback("Url is required!");
  }
  //|| underscore.isEmpty(headers) === true

  if (headers.length == false) {
    headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
  }
  headers["x-access-token"] = httpRequest.getToken();


  const requestOptions = {
    url: url,
    method: method,
    headers: headers,
    json: true,
    body:
      underscore.isEmpty(options.type) || options.type === "json"
        ? params
        : null,
    form: options.type && options.type === "form" ? params : null,
    qs: method === "GET" ? params : null,
    timeout: options.timeout || 120000
  };

  return request(requestOptions, function(err, response) {
    if(typeof response.body != "undefined" && response.body.statusCode=='401'){
      alert("This action is not allowed");
    }else
    if (
      typeof response.body != "undefined" &&
      response.body.status === false &&
      response.body.statusMessage == "Authentication Failed"
    ) {
      alert("Session Expired Please Login Again");
    }
    return callback(err, response, response.body);
  });

  //return request(requestOptions, callback);
};

httpRequest.callUploadFileV3 = function(
  url,
  headers = {},
  data = {},
  callback
) {
  if (url.length == false) {
    return callback("Url is required!");
  }

  if (headers.length == false) {
    headers = {
      "Content-Type": "multipart/form-data"
    };
  }
  headers["x-access-token"] = httpRequest.getToken();

  axios
    .post(url, data, { headers: headers })
    .then(res => {
      console.log(res);
      callback(null, res);
    })
    .catch(err => {
      console.log(err);
      callback(err, err.response);
    });
};

httpRequest.callUploadFileV2 = function(
  url,
  headers = {},
  data = {},
  callback
) {
  if (url.length == false) {
    return callback("Url is required!");
  }

  if (headers.length == false) {
    headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  headers["x-access-token"] = httpRequest.getToken();
  console.log("inside Http", headers);

  axios
    .post(url, data, { headers: headers })
    .then(res => {
      console.log(res, "inside Callback");
      callback(null, res);
    })
    .catch(err => {
      console.log(err.response, "inside Http");
      callback(err, err.response);
    });
};

httpRequest.callUploadFile = function(
  method = "POST",
  url,
  headers = {},
  params = {},
  timeout = 60000,
  callback
) {
  if (url.length == false) {
    return callback("Url is required!");
  }

  if (headers.length == false) {
    headers = {
      "Content-Type": "multipart/form-data"
    };
  }
  headers["x-access-token"] = httpRequest.getToken();

  const options = {
    url: url,
    method: method,
    headers: headers,
    json: true,
    formData: params, //JSON.stringify(params),
    timeout: timeout
  };

  return request(options, callback);
};

httpRequest.getOptions = token => {
  return {
    uri: "",
    method: "GET",
    headers: {
      "x-access-token": token || httpRequest.getToken()
    },
    json: true
  };
};

httpRequest.getRuleById = params => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    (options.uri = apiConstants.GET_ELIGIBILITY_RULE.uri(params)),
      rp(options)
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          console.error(`error in fetching rule for card ${error.error}`);
          return reject(error.error);
        });
  });
};

httpRequest.updateRuleById = params => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    (options.uri = apiConstants.UPDATE_ELIGIBILITY_RULE.uri(params)),
      (options.body = params);
    (options.method = apiConstants.UPDATE_ELIGIBILITY_RULE.method),
      rp(options)
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          console.error(`error in updating rules`, error.error);
          return reject(error.error);
        });
  });
};

httpRequest.testEligibilityRule = params => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    options.uri = apiConstants.TEST_ELIGIBILITY_RULE.uri(params);
    options.method = apiConstants.TEST_ELIGIBILITY_RULE.method;
    options.body = params;
    rp(options)
      .then(result => {
        return resolve(result);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.getRewards = endPoint => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    options.uri = apiConstants.GET_REWARDS.uri(endPoint);
    options.method = apiConstants.GET_REWARDS.method;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.getFeatures = endPoint => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    options.uri = apiConstants.GET_FEATURES.uri(endPoint);
    options.method = apiConstants.GET_FEATURES.method;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.getCardSByBandkId = params => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    options.uri = apiConstants.GET_CARDS_BY_BANK_ID.uri(params);
    options.method = apiConstants.GET_CARDS_BY_BANK_ID.method;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.getBankList = token => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions(token);
    options.uri = apiConstants.GET_BANK_LIST.uri();
    options.method = apiConstants.GET_BANK_LIST.method;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.getGenericBankList = token => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions(token);
    options.uri = apiConstants.GET_GENERIC_BANK_LIST.uri();
    options.method = apiConstants.GET_GENERIC_BANK_LIST.method;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};

httpRequest.login = params => {
  return new Promise((resolve, reject) => {
    let options = httpRequest.getOptions();
    options.uri = apiConstants.LOGIN.uri();
    options.method = apiConstants.LOGIN.method;
    options.body = params;
    rp(options)
      .then(result => {
        return resolve(result.response);
      })
      .catch(error => {
        console.error(error.error);
        return reject(error.error);
      });
  });
};
export default httpRequest;
