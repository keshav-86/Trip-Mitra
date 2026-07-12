import Trip from "../models/Trip";

export const createTrip = async (
  title: string,
  destination: string,
  description: string,
  startDate: Date,
  endDate: Date,
  budget: number,
  owner: string
) => {
  const trip = await Trip.create({
    title,
    destination,
    description,
    startDate,
    endDate,
    budget,
    owner,
    members: [owner],
  });

  return trip;
};