'use strict';

var _reducers = {};

// Reducers Hub
module.exports = function (state, action) {
  if (state === undefined) state = {};
  return state;
}

// Methods
function add(reducers, scope, defaultState) {
  if (scope === undefined) scope = "general";
}

function remove(scope, type) {
  if (scope === undefined) scope = "general";
}

function replace(reducers, scope, defaultState) {
  remove(scope);
  add(reducers, scope, defaultState);
}

module.exports.add = add;
module.exports.remove = remove;
module.exports.replace = replace;
