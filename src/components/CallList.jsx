import React from "react";
import CallListItem from "./CallListItem.jsx";

export default function CallList({callLogs}) {

  const eachCall = callLogs.map((call) => {
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
    />
  })

  return (
    <div>
      {eachCall}
    </div>
  );
}