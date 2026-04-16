const ADMIN_USERS_KEY = "adminUsers";
const ADMIN_TOKEN_KEY = "adminToken";

export function getStoredAdmins() {
  try {
    const users = JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export function registerAdmin({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredAdmins();

  const alreadyExists = users.some((user) => user.email === normalizedEmail);

  if (alreadyExists) {
    throw new Error("Admin already registered with this email.");
  }

  const nextUsers = [
    ...users,
    {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    },
  ];

  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(nextUsers));
}

export function loginAdmin({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredAdmins();

  const user = users.find(
    (item) => item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const token = `admin-${user.id}`;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  return token;
}
