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
        selected_event: null
    }
};

export function plan(state = initialState, action) {

    switch (action.type) {
        case planConstants.GET_PLANS:
            // To be implemented
            return state;
        case planConstants.SELECT_PLAN:
            var plan = state.plans.filter(plan => plan.plan_id === action.plan_id);
            if(plan.length > 0)
            {
                state.activePlan = plan[0];
            }
            return state;
        case planConstants.CHANGE_NAME:
            state.activePlan.name = action.name;
            return state;
        case planConstants.CHANGE_START:
            state.activePlan.start = action.start;
            return state;
        case planConstants.CHANGE_TRIGGER_OPTION:
            state.activePlan.trigger_option = action.trigger_option;
            return state;
        case planConstants.RECEIVE_PLAN_ID:
            state.activePlan.plan_id = action.plan_id;
            return state;
        case planConstants.ADD_INVITEE:
            // plan_id, user_id
            if(!state.activePlan.invitees.includes(action.user_id))
                state.activePlan.invitees.push(action.user_id);
            return state;
        case planConstants.ADD_EVENT:
            //plan_id, event_id
            
            if(state.activePlan.votes.filter(
                vote => vote.event_id === action.event.event_id).length === 0)
            {
                state.activePlan.votes.push({event: action.event, users: []});
            }
            return state;
        case planConstants.VOTE:
            
            if(state.activePlan.votes.filter(
                vote => vote.event_id === action.event.event_id).length === 0)
            {
                state.activePlan.votes = state.activePlan.votes.map(vote =>{
                    if(vote.event_id === action.event_id)
                    {
                        if(!vote.users.includes(action.user_id))
                            vote.users.push(action.user_id);
                    }
                    return vote;
                });
            }
            return state;
        case planConstants.SELECT_EVENT:
            state.activePlan.select_event = action.event_id;
            return state;
        case planConstants.CREATE_PLAN:
            return state;
        default:
            return state;
    }
}