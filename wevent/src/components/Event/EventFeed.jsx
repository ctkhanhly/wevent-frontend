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
import Container from '@mui/material/Container';

export default function EventFeed({event}) {

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
        
      </CardContent>
      
    </Card>
    </Container>
  );
}

export { EventFeed };