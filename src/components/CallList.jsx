import React from "react";
import CallListItem from "./CallListItem.jsx";
import List from '@mui/material/List';



export default function CallList({callLogs, handleArchive, view}) {

  const eachCall = callLogs.map((call) => {
    if (view === 1? !call.is_archived : call.is_archived) {
      return <CallListItem
        key={call.id}
        id={call.id}
        created_at={call.created_at}
        direction={call.direction} 
        from={call.from} 
        to={call.to} 
        via={call.via}
        duration={call.duration}
        is_archived={call.is_archived}
        call_type={call.call_type}
        handleArchive={handleArchive}
        view={view}
      />
    }
  })

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: "flex", flexDirection:"column" }}>
      {eachCall}
    </List>
  );
}