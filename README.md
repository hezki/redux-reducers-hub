# redux-reducers-hub
[![Build Status](https://travis-ci.org/apentle/redux-reducers-hub.svg?branch=master)](https://travis-ci.org/apentle/redux-reducers-hub) [![Coverage Status](https://coveralls.io/repos/github/apentle/redux-reducers-hub/badge.svg?branch=master)](https://coveralls.io/github/apentle/redux-reducers-hub?branch=master) [![npm version](https://badge.fury.io/js/redux-reducers-hub.svg)](https://badge.fury.io/js/redux-reducers-hub)

Flexible Redux Reducers

## Installation
```bash
npm i --save redux-reducers-hub
```

## Usage
**Add reducers**
```javascript
import reducer from 'redux-reducers-hub';

reducer.add({
  ADD(state, action) {
    return {text: action.text};
  },
  EDIT(state, action) {
    return {text: action.text, edit: true}
  },
}, 'todo');
// state look like {todo: {...}}

```

**Use with store**
```javascript
var {createStore} = require('redux');
var reducer = require('redux-reducers-hub');

// create store with registered reducer
const store = createStore(reducer);

```

## API
1. **add(reducers, scope = "general", defaultState = {})** add new reducers to hub
2. **remove(scope = "general", ?type)** Remove old reducer from hub
3. **replace(reducers, scope = "general", defaultState = {})** Replace reducers for a scope
4. **reset()** Reset all reducer data
