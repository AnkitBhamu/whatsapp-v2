function get_local_time(time) {
  let now = time;
  const localISOTime =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "T" +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0") +
    "." +
    String(now.getMilliseconds()).padStart(3, "0") +
    "Z";

  return localISOTime;
}

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

  if (hour % 12 === 0) {
    hour = 12;
  } else {
    hour = hour % 12;
  }

  hour = hour.toString().padStart(2, "0");

  let minute = dobj.getMinutes().toString().padStart(2, "0");

  // console.log(hour + ":" + minute);
  return hour + ":" + minute + " " + am_pm;
}

function convert_to_date(time) {
  let dobj = new Date(time);
  let date = dobj.getDate().toString().padStart(2, "0");
  let month = (dobj.getMonth() + 1).toString().padStart(2, "0");
  let year = dobj.getFullYear().toString().padStart(2, "0");
  return date + "-" + month + "-" + year;
}

export { beautify_date, convert_to_date, convert_to_time, get_local_time };
