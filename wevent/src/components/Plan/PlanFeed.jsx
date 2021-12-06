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
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {EventForPlanFeed} from '../Event';

export function PlanFeed({plan}) {
    var date = new Date(plan.start * 1000).toString();
    console.log('Plan Feed', plan);
    return (
      <Container maxWidth="80vw">
    <Card sx={{ maxWidth: '70vw' , 'color': 'blue'}}>
      <CardHeader
        title={plan.name}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <PeopleIcon/>{plan.invitees.join(', ')}
        </Typography>
        <Divider light />
        {
          plan.votes.map(vote=>{
            <EventForPlanFeed event={vote.event} numVotes={vote.users.length}/>
          })
        }
        {/* To do: create Get Plans API and display Event details for this plan */}
      </CardContent>
      
    </Card>
    </Container>
  );
}
