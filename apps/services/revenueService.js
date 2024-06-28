const Revenue = require("../models/revenue");

async function getOrdersToday() {
    return new Promise((resolve, reject) => {
        Revenue.getOrdersToday((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function getOrdersThisWeek() {
    return new Promise((resolve, reject) => {
        Revenue.getOrdersThisWeek((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function getOrdersThisMonth() {
    return new Promise((resolve, reject) => {
        Revenue.getOrdersThisMonth((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function getPending() {
    return new Promise((resolve, reject) => {
        Revenue.getPending((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function getCanceled() {
    return new Promise((resolve, reject) => {
        Revenue.getCanceled((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function getSuccess() {
    return new Promise((resolve, reject) => {
        Revenue.getSuccess((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}


async function getDayOnMonth(year, month) {
    const data = await new Promise((resolve, reject) => {
        Revenue.getDayOnMonth(year, month, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    const daysInMonth = getDaysInMonth(year, month);
    const filledData = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const dayString = day.toString();
        const dayData = data.find(d => d.day === dayString);

        filledData.push({
            name: dayString,
            revenue: dayData ? parseFloat(dayData.revenue) : 0.00,
        });
    }
    return filledData;
}

async function getMonthOnYear(year) {
    const data = await new Promise((resolve, reject) => {
        Revenue.getMonthOnYear(year, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    const transformedData = [];

    for (let month = 1; month <= 12; month++) {
        const monthString = month.toString();
        const foundData = data.find(item => item.month === monthString);

        if (foundData) {
            transformedData.push({
                name: foundData.month,
                revenue: parseFloat(foundData.revenue)
            });
        } else {
            transformedData.push({
                name: monthString,
                revenue: 0.0
            });
        }
    }

    return transformedData;
}

module.exports = {
    getOrdersToday,
    getOrdersThisWeek,
    getOrdersThisMonth,
    getPending,
    getCanceled,
    getSuccess,
    getDayOnMonth,
    getMonthOnYear,
}