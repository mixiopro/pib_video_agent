<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
  >
    <div v-if="success" class="w-full max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle class="text-center text-green-600"
            >Reset Email Sent!</CardTitle
          >
        </CardHeader>
        <CardContent class="space-y-4">
          <Alert>
            <AlertDescription>
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </AlertDescription>
          </Alert>
          <div class="text-center">
            <router-link
              to="/auth/login"
              class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to login
            </router-link>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-else class="w-full max-w-sm mx-auto space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Alert v-if="error" variant="destructive">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <div class="space-y-2">
              <Label for="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                placeholder="Enter your email"
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
              Send Reset Email
            </Button>

            <div class="text-center">
              <router-link
                to="/auth/login"
                class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to login
              </router-link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const email = ref("");
const isLoading = ref(false);
const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = "";

  try {
    const { data, error: forgetError } = await authClient.forgetPassword({
      email: email.value,
      redirectTo: "/auth/reset-password",
    });

    if (forgetError) {
      error.value = forgetError.message || "Failed to send reset email";
      return;
    }

    if (data) {
      success.value = true;
    }
  } catch (err) {
    error.value = "An unexpected error occurred";
    console.error("Forgot password error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
