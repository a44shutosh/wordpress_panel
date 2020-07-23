const underscoreOriginal = require("underscore");

underscoreOriginal.mixin({
  has: function(obj, key) {
   // return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

	return (obj!== undefined && underscoreOriginal.isEmpty(obj) ===false && obj[key] !== undefined) ? true: false;
  }
});
export default underscoreOriginal;
