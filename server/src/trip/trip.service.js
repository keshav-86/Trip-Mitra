"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTrip = exports.joinTrip = exports.deleteTrip = exports.updateTrip = exports.getTripById = exports.getMyTrips = exports.createTrip = void 0;
const Trip_1 = __importDefault(require("../models/Trip"));
const crypto_1 = __importDefault(require("crypto"));
const createTrip = async (title, destination, description, startDate, endDate, budget, owner, additionalData) => {
    const inviteCode = crypto_1.default.randomBytes(3).toString("hex").toUpperCase();
    const trip = await Trip_1.default.create({
        title,
        destination,
        description,
        startDate,
        endDate,
        budget,
        owner,
        members: [owner],
        inviteCode,
        ...(additionalData || {}),
    });
    return trip;
};
exports.createTrip = createTrip;
const getMyTrips = async (userId) => {
    return await Trip_1.default.find({
        members: userId,
    })
        .populate("owner", "fullName email")
        .populate("members", "fullName email")
        .sort({ createdAt: -1 });
};
exports.getMyTrips = getMyTrips;
const getTripById = async (tripId, userId) => {
    const trip = await Trip_1.default.findOne({
        _id: tripId,
        members: userId,
    })
        .populate("owner", "fullName email")
        .populate("members", "fullName email");
    if (!trip) {
        throw new Error("Trip not found");
    }
    return trip;
};
exports.getTripById = getTripById;
const updateTrip = async (tripId, userId, data) => {
    const trip = await Trip_1.default.findById(tripId);
    if (!trip) {
        throw new Error("Trip not found");
    }
    // Only owner can update
    if (trip.owner.toString() !== userId) {
        throw new Error("You are not authorized to update this trip");
    }
    Object.assign(trip, data);
    await trip.save();
    return trip;
};
exports.updateTrip = updateTrip;
const deleteTrip = async (tripId, userId) => {
    const trip = await Trip_1.default.findById(tripId);
    if (!trip) {
        throw new Error("Trip not found");
    }
    // Only owner can delete the trip
    if (trip.owner.toString() !== userId) {
        throw new Error("You are not authorized to delete this trip");
    }
    await Trip_1.default.findByIdAndDelete(tripId);
    return {
        message: "Trip deleted successfully",
    };
};
exports.deleteTrip = deleteTrip;
const joinTrip = async (inviteCode, userId) => {
    const trip = await Trip_1.default.findOne({ inviteCode });
    if (!trip) {
        throw new Error("Invalid invite code");
    }
    if (trip.members.some(member => member.toString() === userId)) {
        throw new Error("You are already a member of this trip");
    }
    trip.members.push(userId);
    await trip.save();
    return await trip.populate([
        { path: "owner", select: "fullName email" },
        { path: "members", select: "fullName email" },
    ]);
};
exports.joinTrip = joinTrip;
const leaveTrip = async (tripId, userId) => {
    const trip = await Trip_1.default.findById(tripId);
    if (!trip) {
        throw new Error("Trip not found");
    }
    // Owner cannot leave
    if (trip.owner.toString() === userId) {
        throw new Error("Trip owner cannot leave the trip");
    }
    // Check membership
    const isMember = trip.members.some((member) => member.toString() === userId);
    if (!isMember) {
        throw new Error("You are not a member of this trip");
    }
    // Remove member
    trip.members = trip.members.filter((member) => member.toString() !== userId);
    await trip.save();
    return await trip.populate([
        { path: "owner", select: "fullName email" },
        { path: "members", select: "fullName email" },
    ]);
};
exports.leaveTrip = leaveTrip;
//# sourceMappingURL=trip.service.js.map