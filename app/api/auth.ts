import { EKCHAN_SERVER } from "../config";

export async function testEndpoint() {
  const res = await fetch(`${EKCHAN_SERVER}/api/users`);
  const response = await res.json();
  console.log(response);
};

export async function login(credentials: { email: string, password: string }) {
  try {
    const res = await fetch(`${EKCHAN_SERVER}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
  } catch (e: unknown) {
    console.error(e);
  }
}
