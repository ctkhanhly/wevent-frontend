import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Container from '@mui/material/Container';
import {planActions} from '../../actions';
import { connect } from 'react-redux';

function EventForPlanFeed({event, numVotes, plan, vote, selectEvent}) {

    var updateVote = function()
    {
        var user_id = 1;
        vote(plan.plan_id, event.event_id, user_id);// assume current user is 1
    }

    var updateOfficialEvent = function()
    {
        selectEvent(plan.plan_id, event.event_id);
    }

  return (
    <Container maxWidth="80vw">
    <Card sx={{ maxWidth: '70vw' }}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={event.name}
        subheader={event.start}
      />
      <CardMedia
        component="img"
        height="194"
        image={event.imageUrl}
        alt={event.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <AccessTimeIcon/> {event.start} - {event.end}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOnIcon/> {event.full_address}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
        <ThumbUpAltIcon/> {numVotes}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="Vote for this event" onChange={updateVote}>
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton aria-label="Choose this event for this plan" onChange={updateOfficialEvent}>
            <CheckBoxIcon />
          </IconButton>
          
        </CardActions>
      
    </Card>
    </Container>
  );
}


function mapState(state) {

  return {};
}
const actionCreators = {
  vote: planActions.vote,
  selectEvent: planActions.selectEvent
};

const connectedRoomComponent = connect(mapState, actionCreators)(EventForPlanFeed);
export { connectedRoomComponent as EventForPlanFeed };