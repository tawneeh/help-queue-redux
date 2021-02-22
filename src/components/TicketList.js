import React from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";

function TicketList(props){
  return (
    <React.Fragment>
      <hr />
      {/* We now need to map over the values of an object, not an array. */}
      {Object.values(props.ticketList).map((ticket) => {
        return <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id}/>
      })}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;