exports.getDate = function () {
    const today = new Date;

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let date = today.toLocaleDateString("en-US", options);

    return date;
};

exports.getNumericDate = function () {

    const today = new Date();

    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }

    let date = today.toLocaleDateString("en-US", options);

    return date;
};


exports.getDay = function () {

    const today = new Date();

    const options = {
        weekday: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    return day;
};