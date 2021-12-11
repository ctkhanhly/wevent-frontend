import {planConstants} from '../constants';
import {apiClient} from '../aws';

export const planActions = {
    getPlans,
    changeTriggerOption,
    changeName,
    changeStart,
    selectPlan,
    createPlan,
    vote,
    addEvents,
    addInvitee,
    selectEvent
};

function getPlans(user_id)
{
    return (dispatch) => {
        apiClient.getPlans(user_id)
        .then(result => {
            console.log('create plan Result', result);
            dispatch(gotPlans(result.data.results));
            // return result.data.results;
        })
        .catch(error => {
            console.log('Create plan error', error);
            // return [];
        });
    }

    function gotPlans(plans)
    {
        return {
            type: planConstants.GET_PLANS,
            plans
        }
    }
}

function changeTriggerOption(trigger_option)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: planConstants.CHANGE_TRIGGER_OPTION,
            trigger_option
        }
    }
}

function changeName(name)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: planConstants.CHANGE_NAME,
            name
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
            type: planConstants.CHANGE_START,
            start
        }
    }
}

function selectPlan(plan_id)
{
    return (dispatch) => {
        dispatch(selected_plan());
    }

    function selected_plan()
    {
        return {
            type: planConstants.SELECT_PLAN,
            plan_id
        }
    }
}

function createPlan(name, start, trigger_option, host_id)
{
    return (dispatch) => {
        start = new Date(start).getTime()
        console.log('createPlan', name, start, trigger_option, host_id);
        apiClient.createPlan(name, start, trigger_option, host_id)
        .then(result => {
            console.log('create plan Result', result);
            dispatch(createdPlan(result.data.plan_id));
        })
        .catch(error => {
            console.log('Create plan error', error);
        });
        
    }

    function createdPlan(plan_id)
    {
        return {
            type: planConstants.RECEIVE_PLAN_ID,
            plan_id
        }
    }
}

function vote(plan_id, event_id, user_id)
{
    return (dispatch) => {
        apiClient.updatePlan({
            update_type: 'vote',
            plan_id: plan_id,
            event_id,
            user_id
        });
        dispatch(voted());
    }

    function voted()
    {
        return {
            type: planConstants.VOTE,
            plan_id, event_id, user_id
        }
    }
}

function addEvents(events)
{
    return (dispatch) => {
        events.forEach(event => {
            if(event.selected)
            {
                dispatch(added_event(event));
            }
        });
    }

    function added_event(event)
    {
        return {
            type: planConstants.ADD_EVENT,
            event
        }
    }
}

function addInvitee(plan_id, user_id)
{
    return (dispatch) => {
        apiClient.updatePlan({
            update_type: 'add_friend',
            plan_id: plan_id,
            user_id
        });
        dispatch(added_invitee());
    }

    function added_invitee()
    {
        return {
            type: planConstants.ADD_INVITEE,
            plan_id, user_id
        }
    }
}

function selectEvent(plan_id, event_id)
{
    return (dispatch) => {
        apiClient.updatePlan({
            update_type: 'manual_trigger',
            plan_id: plan_id,
            event_id
        });
        dispatch(selected_event());
    }

    function selected_event()
    {
        return {
            type: planConstants.SELECT_EVENT,
            plan_id, event_id
        }
    }
}