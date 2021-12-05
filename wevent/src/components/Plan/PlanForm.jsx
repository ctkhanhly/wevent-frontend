import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {EventForPlanFeed} from '../Event';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import { history } from '../../utilities';

// name, start, trigger_option, host_id

function Plan({ activePlan,
                changeTriggerOption,
                changeName,
                changeStart,
                createPlan
}) {

  var handleCreatePlan = function (){
    createPlan(
      activePlan.name, 
      activePlan.start,
      activePlan.trigger_option,
      activePlan.host_id);
  };

  var handleChangeTriggerOption = function (e){
    changeTriggerOption(e.target.value);
  };
  var handleChangeName = function (e){
    changeName(e.target.value);
  };
  var handleChangeStart = function (e){
    changeStart(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue=""
          onChange={handleChangeName}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="start"
          defaultValue=""
          onChange={handleChangeStart}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="trigger_option"
          defaultValue=""
          onChange={handleChangeTriggerOption}
        />

        {
          activePlan.votes.map(vote=>
            <EventForPlanFeed event={vote.event}/>
          )
        }

      <Button variant="contained" onClick={()=>history.push("/searchEvents")} >Add Event</Button>
      <Button variant="contained" onClick={handleCreatePlan} >Create Plan</Button>

      </div>
      
    </Box>
  );
}

function mapState(state) {
  return {activePlan: state.plan.activePlan};
 }


 const actionCreators = {
  createPlan: planActions.createPlan,
  changeTriggerOption: planActions.changeTriggerOption,
  changeName: planActions.changeName,
  changeStart: planActions.changeStart
 };
 
 const connectedRoomComponent = connect(mapState, actionCreators)(Plan);
 export { connectedRoomComponent as PlanForm };