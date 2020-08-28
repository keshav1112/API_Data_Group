const Redux = {
  store: {},
  createStore: function (store) {
    this.store = { ...store };
  },
  reducer: (state, action) => {
    switch (action.type) {
      case Actions.ADD_STUDENT:
        return { ...state, students: state.students.concat([action.payload]) };
      case Actions.ADD_STUDENTS:
        return { ...state, students: state.students.concat(action.payload) };
      case Actions.REMOVE_STUDENT:
        return {
          ...state,
          students: state.students.filter(
            (s) => s.rollNumber !== action.payload.rollNumber
          )
        };
      default:
        return state;
    }
  },
  listeners: [],
  subscribe: function (fn) {
    this.listeners.push(fn);
  },
  dispatch: function (action) {
    const newStore = this.reducer(this.store, action);
    if (this.store !== newStore) {
      this.store = newStore;
      this.listeners.forEach((listener) => {
        listener(this.store);
      });
    }
  }
};

const Actions = {
  ADD_STUDENT: "ADD_STUDENT",
  ADD_STUDENTS: "ADD_STUDENTS",
  REMOVE_STUDENT: "REMOVE_STUDENT"
};

const ActionCreator = {
  addStudent: (payload) => {
    return {
      type: Actions.ADD_STUDENT,
      payload: payload
    };
  },
  addStudents: (payload) => {
    return {
      type: Actions.ADD_STUDENTS,
      payload: payload
    };
  },
  removeStudent: (payload) => {
    return {
      type: Actions.REMOVE_STUDENT,
      payload: payload
    };
  }
};

export { Redux, ActionCreator };
