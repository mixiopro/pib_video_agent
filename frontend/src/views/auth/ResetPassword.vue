<template>
  <div
    v-if="!token && !error"
    class="min-h-screen w-full flex items-center justify-center bg-gray-50"
  >
    <div class="text-center">
      <svg
        class="animate-spin h-8 w-8 text-primary mx-auto"
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
      <p class="mt-2 text-gray-600">Loading...</p>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm mx-auto space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Set new password
        </h2>
        <p class="mt-2 text-sm text-gray-600">Enter your new password below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Alert v-if="error" variant="destructive">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <div class="space-y-2">
              <Label for="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                v-model="formData.password"
                placeholder="Enter your new password"
              />
              <p class="text-sm text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                v-model="formData.confirmPassword"
                placeholder="Confirm your new password"
              />
            </div>

            <Button
              type="submit"
              :disabled="isLoading || !token"
              class="w-full"
            >
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
              Reset Password
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
import { ref, reactive, onMounted } from "vue";
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
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const error = ref("");
const token = ref("");

onMounted(() => {
  const tokenParam = route.query.token as string;
  if (!tokenParam) {
    error.value = "Invalid or missing reset token";
  } else {
    token.value = tokenParam;
  }
});

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

  if (!token.value) {
    error.value = "Invalid or missing reset token";
    isLoading.value = false;
    return;
  }

  try {
    const { data, error: resetError } = await authClient.resetPassword({
      newPassword: formData.password,
      token: token.value,
    });

    if (resetError) {
      error.value = resetError.message || "Failed to reset password";
      return;
    }

    if (data) {
      router.push(
        "/auth/login?message=Password reset successfully. Please sign in with your new password."
      );
    }
  } catch (err) {
    error.value = "An unexpected error occurred";
    console.error("Reset password error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
