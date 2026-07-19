"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leave = exports.join = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const express_validator_1 = require("express-validator");
const trip_service_1 = require("./trip.service");
const create = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { title, destination, description, startDate, endDate, budget, travelers, itinerary, budgetBreakdown, packingList, localFoods, travelTips, } = req.body;
        const trip = await (0, trip_service_1.createTrip)(title, destination, description, startDate, endDate, budget, req.user.id, {
            travelers,
            itinerary,
            budgetBreakdown,
            packingList,
            localFoods,
            travelTips,
        });
        return res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: trip,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const trips = await (0, trip_service_1.getMyTrips)(req.user.id);
        return res.status(200).json({
            success: true,
            count: trips.length,
            data: trips,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const trip = await (0, trip_service_1.getTripById)(req.params.id, req.user.id);
        return res.status(200).json({
            success: true,
            data: trip,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "Trip not found",
        });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const trip = await (0, trip_service_1.updateTrip)(req.params.id, req.user.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            data: trip,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const result = await (0, trip_service_1.deleteTrip)(req.params.id, req.user.id);
        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.remove = remove;
const join = async (req, res) => {
    try {
        const { inviteCode } = req.body;
        const trip = await (0, trip_service_1.joinTrip)(inviteCode, req.user.id);
        return res.status(200).json({
            success: true,
            message: "Joined trip successfully",
            data: trip,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.join = join;
const leave = async (req, res) => {
    try {
        const trip = await (0, trip_service_1.leaveTrip)(req.params.id, req.user.id);
        return res.status(200).json({
            success: true,
            message: "Left trip successfully",
            data: trip,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.leave = leave;
//# sourceMappingURL=trip.controller.js.map