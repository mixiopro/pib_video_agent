import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  baseURL: "https://studio.mixio.pro",
  fetchOptions: {
    credentials: "include",
  },
});
