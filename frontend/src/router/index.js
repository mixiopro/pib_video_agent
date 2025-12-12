import { createRouter, createWebHistory } from "vue-router";
import DefaultView from "../views/DefaultView.vue";
import { authClient } from "@/auth-client";

const ROUTE_CONFIG = {
  public: {
    exact: [],
    prefixes: ["/auth/"],
  },

  system: {
    exact: ["/favicon.ico", "/robots.txt", "/sitemap.xml"],
    prefixes: ["/_next/", "/api/"],
  },

  // Dashboard protected routes
  protected: {
    exact: ["/", "/profile"],
    prefixes: [],
  },
};

/**
 * Check if pathname matches route configuration
 */
function matchesConfig(pathname, config) {
  // Check exact matches
  if (config.exact.includes(pathname)) return true;

  // Check prefix matches
  if (config.prefixes.some((prefix) => pathname.startsWith(prefix))) return true;

  // Check regex patterns if provided
  if (config.patterns?.some((pattern) => pattern.test(pathname))) return true;

  return false;
}

/**
 * Determine route access level and context
 */
function getRouteAccess(pathname) {
  if (matchesConfig(pathname, ROUTE_CONFIG.system)) return "system";
  if (matchesConfig(pathname, ROUTE_CONFIG.public)) return "public";
  if (matchesConfig(pathname, ROUTE_CONFIG.protected)) return "protected";

  // Default: treat unknown routes as protected (dashboard app)
  return "protected";
}

const routes = [
  {
    path: "/",
    name: "Default",
    component: DefaultView,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: () => import("../views/auth/Signup.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/auth/ForgotPassword.vue"),
  },
  {
    path: "/auth/reset-password",
    name: "ResetPassword",
    component: () => import("../views/auth/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const pathname = to.path;
  const access = getRouteAccess(pathname);

  // System routes always pass through
  if (access === "system") {
    return next();
  }

  // Check authentication status
  let isAuthed = false;
  try {
    // authClient.getSession() returns { data: session, error }
    const { data: session } = await authClient.getSession();
    isAuthed = !!session;
  } catch (error) {
    console.warn("Failed to check session:", error);
    isAuthed = false;
  }

  // Handle root path
  if (pathname === "/") {
    if (isAuthed) {
      return next(); // Just allow access, no redirect
    } else {
      return next("/auth/login");
    }
  }

  // Handle auth pages - redirect authenticated users to dashboard
  if (access === "public" && pathname.startsWith("/auth/")) {
    if (isAuthed) {
      return next("/");
    } else {
      return next();
    }
  }

  // Handle other public routes
  if (access === "public") {
    return next();
  }

  // Protected routes need authentication
  if (access === "protected") {
    if (isAuthed) {
      return next();
    } else {
      const returnUrl = to.fullPath;
      const loginUrl = {
        path: "/auth/login",
        query: returnUrl !== "/" ? { redirectTo: returnUrl } : undefined,
      };
      return next(loginUrl);
    }
  }

  next();
});

export default router;
