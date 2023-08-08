import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApolloProvider } from "@vue/apollo-option";
import { createPinia } from "pinia";
import {
  createApp,
  h,
  provide,
} from "vue";

import { apolloClient } from "./api";

import App from "./app/App.vue";
import router from "./router";

import "./styles/main.css";

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
});

app.use(apolloProvider);
app.use(createPinia());
app.use(router);

app.mount("#app");
