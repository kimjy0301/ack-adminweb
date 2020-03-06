function weekCount(dt: Date) {
  const day = 1000 * 60 * 60 * 24;
  var thisDay = dt;
  var theFirstDay = new Date(dt.getFullYear(), 0, 1);
  var theFirstDayOfWeek = theFirstDay.getDay();
  if (theFirstDayOfWeek > 4) {
    theFirstDay.setDate(theFirstDayOfWeek - 4 - 1 + 7);
  } else {
    theFirstDay.setDate(4 - theFirstDayOfWeek + 1);
  }
  var diff = Math.abs(thisDay.getTime() - theFirstDay.getTime()) / day;
  return Math.ceil(diff / 7);
}

export default weekCount;
