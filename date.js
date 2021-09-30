

module.exports.getDate = function (){


let today = new Date();
    // var currentDay = today.getDay();
    let options = {
        weekday : "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleDateString("en-US", options);

    return day;

}