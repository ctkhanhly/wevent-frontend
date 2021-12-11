import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {EventSearch, EventFeed} from '../../components/Event';
import { connect } from 'react-redux';
import {eventActions, planActions} from '../../actions';
import { history } from '../../utilities';



function SearchEventsPage({event, addEvents, searchEvents})
{
    const [showFeed, setShowFeed] = useState(false);
    

    var handleAddEvents = function(e){
        addEvents(event.events);
    };

    var handleSearch = function(e){
        setShowFeed(true);
        searchEvents(event.searchEvent.start, event.searchEvent.category, event.searchEvent.neighborhood);
    };

    return(
        <div>
            {
                showFeed? event.events.map(e => (<EventFeed event={e} key={e.event_id}/>)) :
                (<EventSearch searchEvent={event.searchEvent}/>)
            }
            <Button variant="contained" onClick={handleAddEvents} >Add Selected Events</Button>
            <Button variant="contained" onClick={handleSearch} >Search Events</Button>
            {/* <Button variant="contained" onClick={searchEvents(searchEvent.name, searchEvent.category, searchEvent.neighborhood)} >Search</Button> */}
        </div>
        
    )
};

function mapState(state) {
    return {event: state.event, activePlan: state.plan.activePlan};
}
const actionCreators = {
    addEvents: planActions.addEvents,
    searchEvents: eventActions.searchEvents
};

const connectedRoomComponent = connect(mapState, actionCreators)(SearchEventsPage);
export { connectedRoomComponent as SearchEventsFeedPage };