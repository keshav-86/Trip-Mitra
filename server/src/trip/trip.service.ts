import Trip from "../models/Trip";
import crypto from "crypto";

export const createTrip = async (
  title: string,
  destination: string,
  description: string,
  startDate: Date,
  endDate: Date,
  budget: number,
  owner: string
) => {
  const inviteCode = crypto.randomBytes(3).toString("hex").toUpperCase();

  const trip = await Trip.create({
    title,
    destination,
    description,
    startDate,
    endDate,
    budget,
    owner,
    members: [owner],
    inviteCode,
  });

  return trip;
};

export const getMyTrips = async (userId: string) => {
  return await Trip.find({
    members: userId,
  })
    .populate("owner", "fullName email")
    .populate("members", "fullName email")
    .sort({ createdAt: -1 });
};

export const getTripById = async (
  tripId: string,
  userId: string
) => {
  const trip = await Trip.findOne({
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
export const updateTrip = async (
  tripId: string,
  userId: string,
  data: {
    title?: string;
    destination?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
  }
) => {
  const trip = await Trip.findById(tripId);

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
export const deleteTrip = async (
  tripId: string,
  userId: string
) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new Error("Trip not found");
  }

  // Only owner can delete the trip
  if (trip.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this trip");
  }

  await Trip.findByIdAndDelete(tripId);

  return {
    message: "Trip deleted successfully",
  };
};
export const joinTrip = async (
  inviteCode: string,
  userId: string
) => {
  const trip = await Trip.findOne({ inviteCode });

  if (!trip) {
    throw new Error("Invalid invite code");
  }

  if (trip.members.some(member => member.toString() === userId)) {
    throw new Error("You are already a member of this trip");
  }

  trip.members.push(userId as any);

  await trip.save();

  return await trip.populate([
    { path: "owner", select: "fullName email" },
    { path: "members", select: "fullName email" },
  ]);
};

export const leaveTrip = async (
  tripId: string,
  userId: string
) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new Error("Trip not found");
  }

  // Owner cannot leave
  if (trip.owner.toString() === userId) {
    throw new Error("Trip owner cannot leave the trip");
  }

  // Check membership
  const isMember = trip.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    throw new Error("You are not a member of this trip");
  }

  // Remove member
  trip.members = trip.members.filter(
    (member) => member.toString() !== userId
  ) as any;

  await trip.save();

  return await trip.populate([
    { path: "owner", select: "fullName email" },
    { path: "members", select: "fullName email" },
  ]);
};
