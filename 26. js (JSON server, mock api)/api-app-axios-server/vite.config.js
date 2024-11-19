import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        contact: "contact.html",
        register: "register.html",
        login: "login.html",
        favorites: "favorites.html",
        ["add-singer"]: "add-singer.html",
        detail: "detail.html",
      },
    },
  },
});
