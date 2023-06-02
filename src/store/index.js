import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      usuarios: [],
    };
  },
  mutations: {
    SET_USUARIOS(state, usuarios) {
      state.usuarios = usuarios;
    },
    ADICIONAR_USUARIO(state, usuario) {
      state.usuarios.push(usuario);
    },
    ATUALIZAR_USUARIO(state, usuarioAtualizado) {
      const index = state.usuarios.findIndex((user) => user.id === usuarioAtualizado.id);
      if (index !== -1) {
        state.usuarios[index] = usuarioAtualizado;
      }
    },
    EXCLUIR_USUARIO(state, usuarioId) {
      state.usuarios = state.usuarios.filter((user) => user.id !== usuarioId);
    },
  },
  actions: {
    async carregarUsuarios({ commit }) {
      try {
        // Simular a chamada à API para obter a lista de usuários
        const response = await this._vm.$http.get('/users');
        const usuarios = response.data;
        commit('SET_USUARIOS', usuarios);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    },
    async criarUsuario({ commit }, novoUsuario) {
      try {
        // Simular a chamada à API para criar um novo usuário
        const response = await this._vm.$http.post('/users', novoUsuario);
        const usuario = response.data;
        commit('ADICIONAR_USUARIO', usuario);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    },
    async atualizarUsuario({ commit }, usuarioAtualizado) {
      try {
        // Simular a chamada à API para atualizar um usuário existente
        const response = await this._vm.$http.put(`/users/${usuarioAtualizado.id}`, usuarioAtualizado);
        const usuario = response.data;
        commit('ATUALIZAR_USUARIO', usuario);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    },
    async excluirUsuario({ commit }, usuarioId) {
      try {
        // Simular a chamada à API para excluir um usuário
        await this._vm.$http.delete(`/users/${usuarioId}`);
        commit('EXCLUIR_USUARIO', usuarioId);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    },
  },
});
