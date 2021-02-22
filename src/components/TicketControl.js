import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux'; // connects to Redux
import PropTypes from "prop-types";
import * as a from './../actions'; // import actions as a for brevity

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      //formVisibleOnPage: false, - commenting out because the Redux store handles this now
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    console.log("did mount"); // this function is called once when we run the application
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000 // 1 minute
    );
  }

  componentDidUpdate() {
    console.log("component updated!"); // not needed in this app but still here for reference 
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick...");
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => { // Note that we use forEach(). Technically, we could use map() and it would work. However, this function only has side effects (updating the store) and map() is supposed to return something without side effects. For that reason, forEach() communicates our intentions here
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime();
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm(); // this is one of our action creators
      dispatch(action);
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
    }
  }

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    // const action = a.addTicket(newTicket);
    // dispatch(action); handled by the Firestore reducer now
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  // handleEditingTicketInList = (ticketToEdit) => {
  //   const { dispatch } = this.props;
  //   const action = a.addTicket(ticketToEdit);
  //   dispatch(action);
  //   this.setState({
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) { // must be this.props not this.state for Redux
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />; // pay attention to this.state and this.props !!!! lesson 13
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;