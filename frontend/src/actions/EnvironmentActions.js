import httpRequest from "../utils/httpRequest";
import utility from "../utils/utility";
import underscore from "../utils/Underscore";
import pathRegexp, { compile } from "path-to-regexp";
import appConstants from "../constants/appConstants";
import apiConstants from "../constants/apiConstants";

export const windowResize = (height, width) => ({
  type: appConstants.WINDOW_RESIZE,
  height: height,
  width: width
});


// wordpress related Actions
export const savePostList = (val = null) => ({
  type: appConstants.WORDPRESS_POST,
  wordpressPost: val
});

export const saveCategory = (val = null) => ({
  type: appConstants.WORDPRESS_CATEGORY,
  wordpressCategory: val
});

export const saveTag = (val = null) => ({
  type: appConstants.WORDPRESS_TAG,
  wordpressTag: val
});

export const saveViewPost = (val = null) => ({
  type: appConstants.WORDPRESS_VIEW_POST,
  wordpressViewPost: val
});

// wordpress related actions

export function getWordPressPosts(payload) {
  return (dispatch, getState) => {
    httpRequest.call(
      "POST",
      apiConstants.NEO_SP_API_PATH + "/v1/wordpress/getPosts",
      {},
      payload,
      "",
      function(error, result, body) {
        return dispatch(savePostList(body.response.body.posts));
      }
    );
  };
}

export function saveCategorySelected(category) {
  return (dispatch, getState) => {
    return dispatch(saveCategory(category));
  };
}

export function saveTagSelected(tag) {
  return (dispatch, getState) => {
    return dispatch(saveTag(tag));
  };
}

export function saveViewPostSelected(post) {
  return (dispatch, getState) => {
    return dispatch(saveViewPost(post));
  };
}

const actions = {};

// end wordpress processes




export { actions }