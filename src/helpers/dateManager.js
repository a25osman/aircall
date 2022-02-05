export function getDate(timestamp) {
  let date = new Date(timestamp);

  const [year, day] = [date.getFullYear(), date.getDate()];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

  const calendar_date = `${month}. ${day}, ${year}`;

  let digital_hours = hour;

  if (digital_hours === 0) {
    digital_hours += 12;
  } else if (digital_hours > 12) {
    digital_hours -= 12;
  }

  let meridian
  if (hour > 11) {
    meridian = "p.m.";
  } else {
    meridian = "a.m.";
  }

  const time = `${digital_hours}:${minutes} ${meridian}`;

  return {calendar_date, time}
  
}
