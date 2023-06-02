import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Importar a função para obter a instância do Axios
import { getAxiosInstance } from './api';

const app = createApp(App);

// Configurar o Axios globalmente
app.config.globalProperties.$http = getAxiosInstance();

// Registrar a instância do Vuex
app.use(store);

app.mount('#app');