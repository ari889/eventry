import Event from "@/models/Event";
import User from "@/models/User";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

export async function getAllEvents(query) {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i");
    allEvents = await Event.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await Event.find().lean();
  }
  return replaceMongoIdInArray(allEvents);
}

export async function getEventById(eventId) {
  const event = await Event.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

export async function createUser(user) {
  return await User.create(user);
}

export async function findUserByCredentials(credentials) {
  const user = await User.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

export async function updateInterest(eventId, authId) {
  const event = await Event.findById(eventId);
  if (event) {
    if (event.interested_ids.includes(authId)) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    await event.save();
  }
}

export async function updateGoing(eventId, authId) {
  const event = await Event.findById(eventId);

  if (event) {
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
    event.save();
  }
}
