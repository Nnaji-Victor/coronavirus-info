export function get_date(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function get_default_date(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}

export function get_analog_date(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  const res = [year, month, day].join("-");
  return `${res}T00:00:00Z`;
}
