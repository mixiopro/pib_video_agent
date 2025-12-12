<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ChatInterface } from "@videodb/chat-vue";
import "@videodb/chat-vue/dist/style.css";
import { authClient } from "@/auth-client";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const chatInterfaceRef = ref(null);
const router = useRouter();

const handleLogout = async () => {
  try {
    await authClient.signOut();
    router.push("/auth/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const injectLogoutButton = () => {
  // Wait for chat interface to fully render
  nextTick(() => {
    setTimeout(() => {
      // Find the sidebar footer element with specific classes
      const sidebarFooter = document.querySelector(
        ".vdb-c-mt-auto.vdb-c-flex.vdb-c-flex-col"
      );

      if (sidebarFooter) {
        // Clear existing content
        sidebarFooter.innerHTML = "";

        // Create logout button
        const logoutBtn = document.createElement("button");
        logoutBtn.className =
          "vdb-c-flex vdb-c-items-center vdb-c-gap-3 vdb-c-w-full vdb-c-px-3 vdb-c-py-2 vdb-c-text-sm vdb-c-text-gray-600 hover:vdb-c-bg-gray-100 vdb-c-rounded-md vdb-c-transition-colors flex gap-3 hover:bg-primary/80 !p-2 cursor-pointer";
        logoutBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        `;
        logoutBtn.onclick = handleLogout;

        // Append to footer
        sidebarFooter.appendChild(logoutBtn);
      }
    }, 500); // Give the chat interface time to render
  });
};

const handleKeyDown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    chatInterfaceRef.value.createNewSession();
    chatInterfaceRef.value.chatInputRef.focus();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  injectLogoutButton();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <main>
    <chat-interface
      ref="chatInterfaceRef"
      :chat-hook-config="{
        socketUrl: `${BACKEND_URL}/chat`,
        httpUrl: `${BACKEND_URL}`,
        debug: true,
      }"
    />
  </main>
</template>

<style>
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 8px;
  --popper-theme-padding: 4px 8px;
  --popper-theme-box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.08);
}

.template {
  height: 100vh;
  width: 100vw;
}

main {
  overflow: scroll;
  height: 100%;
}
html {
  overflow: hidden;
}

/* For WebKit-based browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background of the scrollbar track */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* Scrollbar thumb color */
  border-radius: 6px; /* Rounded corners */
  border: 3px solid #f1f1f1; /* Space around the thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Thumb color on hover */
}

/* For Mozilla Firefox */
* {
  scrollbar-width: thin; /* Makes the scrollbar narrower */
  scrollbar-color: #888 #f1f1f1; /* Thumb and track colors */
}
</style>
