import {eventConstants} from '../constants';
import {apiClient} from '../aws';

export const eventActions = {
    searchEvents,
    selectEvent,
    changeCategory,
    changeStart,
    changeNeighborhood
  };

function searchEvents(start, category, neighborhood)
{
    return (dispatch) => {
        apiClient.searchEvents(neighborhood, start, category)
        .then(result => {
            var events = result.data.results;
            dispatch(searched(events));
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    function searched(events)
    {
        return {
            type: eventConstants.SEARCH_EVENTS,
            events
        }
    }
}

function selectEvent(event_id)
{
    return (dispatch) => {
        dispatch(selected_event());
    }

    function selected_event()
    {
        return {
            type: eventConstants.SELECT_EVENT,
            event_id
        }
    }
}

function changeCategory(category)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_CATEGORY,
            category

        }
    }
}

function changeStart(start)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_START,
            start
        }
    }
}

function changeNeighborhood(neighborhood)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_NEIGHBORHOOD,
            neighborhood
        }
    }
}