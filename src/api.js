import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Adaptador de mock Axios para simular as requisições HTTP
const mockAdapter = new MockAdapter(axios);

// Simulando a API de usuários
const users = [
  { id: 1, nome: 'Usuário 1', email: 'usuario1@example.com' },
  { id: 2, nome: 'Usuário 2', email: 'usuario2@example.com' },
  { id: 3, nome: 'Usuário 3', email: 'usuario3@example.com' },
  { id: 4, nome: 'Usuário 4', email: 'usuario4@example.com' },
];

// Rota para listar todos os usuários
mockAdapter.onGet('/users').reply(200, users);

// Rota para criar um novo usuário
mockAdapter.onPost('/users').reply((config) => {
  const novoUsuario = JSON.parse(config.data);
  novoUsuario.id = Date.now();
  users.push(novoUsuario);
  return [201, novoUsuario];
});

// Rota para atualizar um usuário existente
mockAdapter.onPut(/\/users\/\d+/).reply((config) => {
  const usuarioAtualizado = JSON.parse(config.data);
  const id = parseInt(config.url.split('/').pop());
  const index = users.findIndex((user) => user.id === id);
  users[index] = usuarioAtualizado;
  return [200, usuarioAtualizado];
});

// Rota para excluir um usuário
mockAdapter.onDelete(/\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return [204];
});

// Exportar função para obter a instância do Axios
export function getAxiosInstance() {
  return axios;
}
