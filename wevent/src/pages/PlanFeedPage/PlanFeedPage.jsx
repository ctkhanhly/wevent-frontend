import React, { useEffect } from "react";
import {PlanFeed} from '../../components/Plan';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import { history } from '../../utilities';


function PlanFeedPage({
                        plan,
                        selectPlan
                        // getPlans
                    })
{
    useEffect(() => {
        // getPlans();
    }, []);
    var handleSelectPlan = function(e)
    {
        selectPlan(e.target.id);
        history.push("/updatePlan");
        history.go(0);
    }

    return (
        <div>
            {
                plan.plans.map(plan=> {
                    <div id={plan.plan_id} onClick={handleSelectPlan} >
                        <PlanFeed plan={plan}/>
                    </div>
                })
            }
        </div>
    )
}

function mapState(state) {
    return {plan: state.plan};
}
const actionCreators = {
    selectPlan: planActions.selectPlan
};

const connectedRoomComponent = connect(mapState, actionCreators)(PlanFeedPage);
export { connectedRoomComponent as PlanFeedPage };