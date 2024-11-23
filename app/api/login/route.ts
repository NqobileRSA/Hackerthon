import type { NextApiRequest, NextApiResponse } from 'next';

// Define the User type
interface User {
  email: string;
  password: string;
}

// Hardcoded user database
const users: User[] = [
  { email: 'user1@example.com', password: 'password123' },
  { email: 'user2@example.com', password: 'securepassword' },
  { email: 'admin@example.com', password: 'adminpass' },
];

// Define response data type
interface LoginResponse {
  message: string;
  email?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Validate user credentials
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return res
      .status(200)
      .json({ message: 'Login successful', email: user.email });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
}
