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

  let options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // This will use 12-hour format and add AM/PM
  };

  // Convert the UTC time to the local time based on the user's timezone
  let localTime = dobj.toLocaleTimeString("en-US", options);

  return localTime;
}

function convert_to_date(time) {
  let dobj = new Date(time);
  let date = dobj.getDate().toString().padStart(2, "0");
  let month = (dobj.getMonth() + 1).toString().padStart(2, "0");
  let year = dobj.getFullYear().toString().padStart(2, "0");
  return date + "-" + month + "-" + year;
}

export { beautify_date, convert_to_date, convert_to_time, get_local_time };
