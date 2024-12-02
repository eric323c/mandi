import { createUser } from "../firebase/firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, role } = req.body;

  if (!firstName || !lastName || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newUser = await createUser(firstName, lastName, role);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}
