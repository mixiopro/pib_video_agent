<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
  >
    <div v-if="success" class="w-full max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle class="text-center text-green-600"
            >Account Created!</CardTitle
          >
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please check your email to verify your account before signing in.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <div v-else class="w-full max-w-sm mx-auto space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/login"
            class="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Alert v-if="error" variant="destructive">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <div class="space-y-2">
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                v-model="formData.name"
                placeholder="Enter your full name"
              />
            </div>

            <div class="space-y-2">
              <Label for="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="formData.email"
                placeholder="Enter your email"
              />
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                v-model="formData.password"
                placeholder="Enter your password"
              />
              <p class="text-sm text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                v-model="formData.confirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" :disabled="isLoading" class="w-full">
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const router = useRouter();
const route = useRoute();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = "";

  if (formData.password !== formData.confirmPassword) {
    error.value = "Passwords do not match";
    isLoading.value = false;
    return;
  }

  if (formData.password.length < 8) {
    error.value = "Password must be at least 8 characters long";
    isLoading.value = false;
    return;
  }

  try {
    const { data, error: signUpError } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      error.value = signUpError.message || "Signup failed";
      return;
    }

    if (data) {
      success.value = true;
      const redirectTo = route.query.redirectTo as string;
      const loginUrl = redirectTo
        ? `/auth/login?message=Please check your email to verify your account&redirectTo=${encodeURIComponent(
            redirectTo
          )}`
        : "/auth/login?message=Please check your email to verify your account";

      setTimeout(() => {
        router.push(loginUrl);
      }, 2000);
    }
  } catch (err) {
    error.value = "An unexpected error occurred";
    console.error("Signup error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
