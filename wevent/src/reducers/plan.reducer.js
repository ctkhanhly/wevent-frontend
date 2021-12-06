import {planConstants} from '../constants';

/*
    state consists of:
    activePlan: either selected for creation or update
    plans: the plans received for plan feed from last load
    Each vote here is (event, users) unlike Plan database
    which is just (event_id, users)
*/

const initialState = {
    plans: [],
    activePlan: {
        plan_id: null,
        name: null,
        trigger_option: null,
        invitees: [],
        votes: [],
        selected_event: null,
        start: null
    }
};

export function plan(state = initialState, action) {
    var newState = {...state};
    // console.log('reduce plan', newState === state);
    switch (action.type) {
        case planConstants.GET_PLANS:
            newState.plans = [...action.plans];
            console.log('GET_PLANS reducer', newState.plans, newState === state, newState.plans === state.plan)
            return newState;
        case planConstants.SELECT_PLAN:
            var plans = state.plans.filter(plan => plan.plan_id === action.plan_id);
            if(plans.length > 0)
            {
                newState.activePlan = plans[0];
            }
            return newState;
        case planConstants.CHANGE_NAME:
            newState.activePlan = {...state.activePlan, name : action.name};
            return newState;
        case planConstants.CHANGE_START:
            newState.activePlan = {...state.activePlan, start : action.start};
            return newState;
        case planConstants.CHANGE_TRIGGER_OPTION:
            newState.activePlan = {...state.activePlan, trigger_option : action.trigger_option};
            return newState;
        case planConstants.RECEIVE_PLAN_ID:
            newState.activePlan = {...state.activePlan, plan_id : action.plan_id};
            return newState;
        case planConstants.ADD_INVITEE:
            // plan_id, user_id
            
            if(!state.activePlan.invitees.includes(action.user_id))
                newState.activePlan.invitees = [ ...newState.activePlan.invitees, action.user_id];
            return newState;
        case planConstants.ADD_EVENT:
            //plan_id, event_id
            if(state.activePlan.votes.filter(
                vote => vote.event_id === action.event.event_id).length === 0)
            {
                newState.activePlan.votes = [...newState.activePlan.votes,{event: action.event, users: []}];
            }
            return newState;
        case planConstants.VOTE:
            
            if(state.activePlan.votes.filter(
                vote => vote.event_id === action.event.event_id).length === 0)
            {
                newState.activePlan.votes = state.activePlan.votes.map(vote =>{
                    if(vote.event_id === action.event_id)
                    {
                        if(!vote.users.includes(action.user_id))
                            vote.users = [...vote.users, action.user_id];
                    }
                    return vote;
                });
            }
            return newState;
        case planConstants.SELECT_EVENT:
            newState.activePlan.select_event = action.event_id;
            return newState;
        case planConstants.CREATE_PLAN:
            return state;
        default:
            return state;
    }
}