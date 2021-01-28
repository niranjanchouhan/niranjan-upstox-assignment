export const convertMillisecondsToDate = (millis) => {
    const date = new Date(millis);
    var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
    // return date;
    // let month = date.getMonth() + 1;
    // let formattedDate = date.getDate()+"-"+month+"-"+date.getFullYear()
    // return formattedDate;
}