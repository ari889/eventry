"use server";

import { revalidatePath } from "next/cache";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
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
