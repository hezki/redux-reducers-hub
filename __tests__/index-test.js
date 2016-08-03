'use strict';

jest.unmock('../index');
const reducer = require('../index');

describe('ActionsHub', () => {
  it('Hub reducer function', () => {
    expect(reducer(undefined, {})).toEqual({});
    expect(reducer({session: true}), {}).toEqual({session: true});
  });

  it('add(reducers, scope = "general", defaultState = {}): add new reducers', () => {
    var _state = undefined;
    // Add general reducer for all type
    reducer.add({
      all(state, action) {
        if (state === undefined) state = {};
        if (action.global === true) {
          return {global: 1};
        }
        return state;
      }
    });
    _state = reducer(_state, {global: true});
    expect(_state).toEqual({general: {global: 1}});

    // Add for specific scope
    reducer.add({
      ADD(state, action) {
        return {text: action.text};
      },
      EDIT(state, action) {
        return {text: action.text, edit: true}
      }
    }, 'todo');
    _state = reducer(_state, {type: 'ADD', text: 'New'});
    expect(_state).toEqual({general: {global: 1}, todo: {text: 'New'}});

    _state = reducer(_state, {type: 'EDIT', text: 'Neo'});
    expect(_state).toEqual({general: {global: 1}, todo: {text: 'Neo', edit: true}});

    // Change performance
    expect(_state).toBe(reducer(_state, {}));

    // Default state
    reducer.add({
      READ(state, action) {
        return action.list;
      }
    }, 'todos', []);
    _state = reducer(_state, {});
    expect(_state.todos).toEqual([]);
    _state = reducer(_state, {type: 'READ', list: [1]});
    expect(_state.todos).toEqual([1]);
  });

  it('remove(scope = "general", type): remove old reducer', () => {
    reducer.remove('todo', 'ADD');
    expect(reducer(undefined, {type: 'ADD', text: 'New'}).todo).toEqual({});
    reducer.remove();
    expect(reducer(undefined, {global: true}).general).toBeUndefined();
  });

  it('replace(reducers, scope = "general", defaultState = {}): replace reducers for a scope', () => {
    reducer.replace({
      READ(state, action) {
        return action.payload;
      }
    }, 'todos', []);
    expect(reducer(undefined, {type: 'READ', payload: [2]}).todos).toEqual([2]);
  });
});
