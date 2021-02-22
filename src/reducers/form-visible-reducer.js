import * as c from './../actions/ActionTypes'; // this is correct

export default (state = false, action) => {
  switch (action.type) {
  case c.TOGGLE_FORM:
    return !state;
  default:
    return state;
  }
}

// First, we store our constants in the c variable. We could call this anything but c or constants is standard convention. We are using c for brevity

// Next, we need to update the action type itself. Our action type will now be written as c.TOGGLE_FORM instead of 'TOGGLE_FORM'