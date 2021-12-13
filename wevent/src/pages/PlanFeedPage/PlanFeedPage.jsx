import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {PlanFeed} from '../../components/Plan';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import { history } from '../../utilities';
import { planConstants } from "../../constants";


class PlanFeedPage extends React.Component{
    constructor(props) {
        super(props);
        this.handleSelectPlan = this.handleSelectPlan.bind(this);
        
        this.state = { plans: this.props.plan.plans};
        let user_email = JSON.parse(localStorage.getItem("user"))?.email;
        this.props.getPlans(user_email);
        // this.plans = [
        //     {plan_id:"123", name:"random", votes : 
        //     [
        //     {event: {  name: "abc", event_id:"123", 
        //     start: new Date().toString(), end: new Date().toString(),
        //     imageUrl: "https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg"
        //     }, users: ["1"]}],
        //     invitees: ["1"],
        //     start: new Date().toString()},

        //     {plan_id:"124", name:"random", votes : 
        //         [
        //         {event: {  name: "abc", event_id:"123", 
        //             start: new Date().toString(), end: new Date().toString(),
        //             imageUrl: "https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg"
        //             }, users: ["2"]}
        //         ],
        //         invitees: ["2"],
        //         start: new Date().toString()}
        // ];
        // this.plans = [];
    }

    componentWillMount() {
        console.log('componentWillMount', this.props.plan.plans);
        this.setState(prevState=>
            ({...prevState, plans: this.props.plan.plans}));
    }

    componentDidUpdate()
    {
        console.log('componentDidUpdate', this.props.plan.plans);
        // this.forceUpdate();
        // this.plans = 
    }

    handleSelectPlan(e)
    {
        this.props.selectPlan(e.target.id);
        history.push("/updatePlan");
        history.go(0);
    };

    render() {
        var THIS = this;
        return (
            <Container maxWidth="80vw">
            {
                this.props.plan.plans.map(p=> 
                    (<div id={p.plan_id} onClick={THIS.handleSelectPlan} >
                        <PlanFeed key={p.plan_id} plan={p}/>
                    </div>)
                )
            }
        </Container>
        )
    }
};

function mapState(state) {
    console.log('mapState', state);
    return {plan: state.plan};
}
const actionCreators = {
    selectPlan: planActions.selectPlan,
    getPlans: planActions.getPlans
};

const connectedRoomComponent = connect(mapState, actionCreators)(PlanFeedPage);
export { connectedRoomComponent as PlanFeedPage };