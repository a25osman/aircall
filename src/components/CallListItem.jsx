import React from 'react';
import {useState} from 'react';
import { getDate } from '../helpers/dateManager'

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List';

import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import ArchiveIcon from '@mui/icons-material/Archive';
import ExpandLess from '@mui/icons-material/ExpandLess';
import UnarchiveIcon from '@mui/icons-material/Unarchive';



export default function CallListItem({id, created_at, direction, from, to, via, duration, call_type, handleArchive, view}) {
  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem alignItems="center" sx={{display:"flex", flexDirection:"column", alignItems:"unset"}}>
        <ListItemButton onClick={handleExpand} sx={{p:0}}>

         <ListItemAvatar>
            {direction === "outbound" ? <Avatar>{from.slice(0,2)}</Avatar> : <Avatar /> }
          </ListItemAvatar>

          <ListItemText
            primary={from}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'flex', whiteSpace: "pre" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {call_type === "missed" && [<CallMissedOutgoingIcon key={id} color="error" fontSize="small"/>, ` Missed Call | ${getDate(created_at).calendar_date}`]} 
                  {call_type === "answered" && [<CallReceivedIcon key={id} color="success" fontSize="small"/>, ` Answered Call | ${getDate(created_at).calendar_date}`]}
                  {call_type === "voicemail" && [<VoicemailIcon key={id} color="success" fontSize="small"/>, ` Voicemail | ${getDate(created_at).calendar_date}`]}
                </Typography>
              </React.Fragment>
            }
          />

          <IconButton aria-label="archive" onClick={(e) => handleArchive(e, id)}>
            {view === 0 && <ArchiveIcon fontSize="large" color="warning" />}
            {view === 1 && <UnarchiveIcon fontSize="large" color="success" />}
          </IconButton>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleExpand} sx={{ p:0, pl:2, pr:1.5, justifyContent: "space-between", alignItems:"self-end"}}>
              <Stack>
                <Typography variant="body2" sx={{color:"darkgrey", fontWeight:400, fontSize:"0.8rem"}}>
                  {call_type === "missed" && `tried to call ${to}`}
                  {call_type === "answered" && `called ${to}`}
                </Typography>
                <Typography variant="body2" sx={{color:"darkgrey", fontWeight:400, fontSize:"0.8rem"}} >
                  {duration < 60 && `${duration}s via ${via} at ${getDate(created_at).time}`}
                  {duration >= 60 && `${duration / 60}m ${duration % 60}s via ${via} at ${getDate(created_at).time}`}

                </Typography>
              </Stack>
              {open && <ExpandLess color="action" />}
            </ListItemButton>
          </List>
        </Collapse>
        
      </ListItem>

      <Divider variant="middle" component="li" />
    </React.Fragment>
  );
}