import appConstants from "../constants/appConstants";

const initialState = {
  height: 0,
  width: 0,
  loader: false
};

const environment = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.WINDOW_RESIZE:
      return {
        ...state,
        height: action.height,
        width: action.width
      };

     // wordpress categories  
     case appConstants.WORDPRESS_POST:
     return {
       ...state,
       wordpressPost: action.wordpressPost
     }; 
   
   case appConstants.WORDPRESS_CATEGORY:
     return {
       ...state,
       wordpressCategory: action.wordpressCategory
     };  
     
   case appConstants.WORDPRESS_TAG:
     return {
       ...state,
       wordpressTag: action.wordpressTag
     }; 
     
   case appConstants.WORDPRESS_VIEW_POST:
     return {
       ...state,
       wordpressViewPost: action.wordpressViewPost
     };  
    
      

    case appConstants.ROUTER_CHANGE:
      return {
        ...state,
        route: action.path
      };

    

    case appConstants.SET_DASHBOARD_SELECTED:
      return {
        ...state,
        dashboard: action.dashboard,
        selectedCard: ""
      };

    

    
    default:
      return state;
  }
};

export default environment;
