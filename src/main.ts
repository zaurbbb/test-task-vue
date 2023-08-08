import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApolloProvider } from '@vue/apollo-option';
import { createPinia } from 'pinia';
import {
  createApp,
  h,
  provide,
} from 'vue';
import { apolloClient } from "./api";

// @ts-ignore
import App from './App.vue';

import './assets/main.css';
import router from './router';

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

app.mount('#app');
