import {eventConstants} from '../constants';

/*
    state will be:
    // selected_events: list of event_ids
    events: all events received back from latest search
    searchEvent: 
*/

const initialState = {
    events: [],
    searchEvent: {
        name: null,
        neighborhood: null,
        category: null
    }
};

export function event(state = initialState, action) {

    switch (action.type) {
        case eventConstants.SEARCH_EVENTS:
            state.events = action.events.map(event=>{
                event.selected = false;
                return event;
            });
            return state;
        case eventConstants.SELECT_EVENT:
            // state.selected_events.push(event_id);
            state = state.events.map(event=> {
                if(event.event_id === action.event_id){
                    event.selected = true;
                }
                return event;
            })
            return state;
        case eventConstants.ADD_EVENTS:
            return state;
        case eventConstants.CHANGE_CATEGORY:
            state.searchEvent.category = action.category;
            return state;
        case eventConstants.CHANGE_START:
            state.searchEvent.start = action.start;
            return state;
        case eventConstants.CHANGE_NEIGHBORHOOD:
            state.searchEvent.neighborhood = action.neighborhood;
            return state;
        default:
            return state;
    }
}