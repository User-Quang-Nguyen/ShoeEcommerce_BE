const RevenueService = require("../services/revenueService");
const jwt = require("../utils/jwt");

async function getOrdersToday(req, res) {
    try {
        const orders = await RevenueService.getOrdersToday();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getOrdersThisWeek(req, res) {
    try {
        const orders = await RevenueService.getOrdersThisWeek();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getOrdersThisMonth(req, res) {
    try {
        const orders = await RevenueService.getOrdersThisMonth();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getPending(req, res) {
    try {
        const orders = await RevenueService.getPending();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getCanceled(req, res) {
    try {
        const orders = await RevenueService.getCanceled();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getSuccess(req, res) {
    try {
        const orders = await RevenueService.getSuccess();
        return res.status(200).json(orders[0]);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getDayOnMonth(req, res) {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const orders = await RevenueService.getDayOnMonth(year, month);
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getMonthOnYear(req, res) {
    try {
        const year = req.query.year;
        const orders = await RevenueService.getMonthOnYear(year);
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
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