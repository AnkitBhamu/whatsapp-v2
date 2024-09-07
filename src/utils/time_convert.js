function beautify_date(time) {
  let dobj = new Date(time);
  let date = dobj.getDate();

  if (date === new Date().getDate()) {
    return convert_to_time(time);
  } else {
    let day = dobj.getDay().toString().padStart(2, "0");
    let month = dobj.getMonth().toString().padStart(2, "0");
    let year = dobj.getFullYear().toString().padStart(2, "0");
    return day + "-" + month + "-" + year;
  }
}

function convert_to_time(time) {
  let dobj = new Date(time);

  let am_pm;
  let hour = dobj.getHours();

  if (hour >= 0 && hour < 12) {
    am_pm = "AM";
  } else {
    am_pm = "PM";
  }

  hour = hour % 12;

  hour = hour.toString().padStart(2, "0");

  let minute = dobj.getMinutes().toString().padStart(2, "0");

  // console.log(hour + ":" + minute);
  return hour + ":" + minute + " " + am_pm;
}

function convert_to_date(time) {
  let dobj = new Date(time);
  console.log(dobj);
  let date = dobj.getDate().toString().padStart(2, "0");
  let month = (dobj.getMonth() + 1).toString().padStart(2, "0");
  let year = dobj.getFullYear().toString().padStart(2, "0");
  return date + "-" + month + "-" + year;
}

export { beautify_date, convert_to_date, convert_to_time };
