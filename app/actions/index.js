"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
  getEventById,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

/**
 * register user
 * @param {FormData} formData
 */
export async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);

  redirect("/login");
}

export async function performLogin(formData) {
  try {
    const credentials = {};
    credentials.email = formData.get("email");
    credentials.password = formData.get("password");
    const user = await findUserByCredentials(credentials);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

export async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}

export async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear, ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you.`;
    const sent = await resend.emails.send({
      from: "ontikdev.2@gmail.com",
      to: user?.email,
      subject: "Successfully registered for the event",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
}
