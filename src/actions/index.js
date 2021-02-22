import * as c from './ActionTypes'; 

export const deleteTicket = id => ({
  type: c.DELETE_TICKET,
  id
});

// const action = deleteTicket(id); that is how you use it

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const addTicket = (ticket) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = ticket;
  return {
    type: c.ADD_TICKET,
    names: names,
    location: location,
    issue: issue,
    id: id,
    formattedWaitTime,
    timeOpen: timeOpen
  }
};

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id,
  formattedWaitTime
});

// these are action creators. it will be easier to use these actions when they are set up as functions in this way

// https://www.learnhowtoprogram.com/react/react-with-redux/action-creators