<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm mx-auto space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/signup"
            class="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert v-if="message" variant="default" class="mb-6">
            <AlertDescription>{{ message }}</AlertDescription>
          </Alert>

          <form @submit="onSubmit" class="space-y-6">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autocomplete="email"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <div class="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <router-link
                    to="/auth/forgot-password"
                    class="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                  >
                    Forgot your password?
                  </router-link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Alert v-if="error" variant="destructive">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <Button type="button" class="w-full" @click="onSubmit">
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
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const error = ref("");
const message = ref("");

onMounted(() => {
  if (route.query.message) {
    message.value = route.query.message as string;
  }
});

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  error.value = "";

  try {
    const { data, error: signInError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      error.value = signInError.message || "Login failed";
      return;
    }

    if (data) {
      const redirectTo = (route.query.redirectTo as string) || "/";
      router.push(redirectTo);
    }
  } catch (err) {
    error.value = "An unexpected error occurred";
    console.error("Login error:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>
