<template>
  <div class="hello-world">
    <div class="form-container">
      <h2>Usuários</h2>

      <!-- Formulário para criar ou atualizar um usuário -->
      <form @submit.prevent="salvarUsuario">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" v-model="usuario.nome" id="nome">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="usuario.email" id="email">
        </div>
        <div class="form-group">
          <label for="foto">Foto:</label>
          <input type="file" @change="handleFotoUpload" id="foto">
        </div>
        <div class="form-group">
          <button type="submit">{{ modoEdicao ? 'Atualizar' : 'Criar' }}</button>
          <button type="button" @click="limparFormulario">Limpar</button>
        </div>
      </form>
    </div>

    <!-- Listagem dos últimos usuários cadastrados -->
    <div class="usuarios-container">
      <h3>Últimos usuários cadastrados:</h3>
      <div class="usuarios-list">
        <div v-for="usuario in ultimosUsuarios" :key="usuario.id" class="usuario-card">
          <div class="usuario-avatar">
            <img :src="usuario.foto" alt="Imagem do usuário">
          </div>
          <div class="usuario-info">
            <h4>{{ usuario.nome }}</h4>
            <p>{{ usuario.email }}</p>
            <button @click="excluirUsuario(usuario.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
        foto: ''
      },
      modoEdicao: false,
      ultimosUsuarios: []
    };
  },

  methods: {
    salvarUsuario() {
      this.ultimosUsuarios.push({
        id: this.ultimosUsuarios.length + 1,
        nome: this.usuario.nome,
        email: this.usuario.email,
        foto: this.usuario.foto
      });

      this.limparFormulario();
    },

    handleFotoUpload(event) {
      const file = event.target.files[0];
      const fotoURL = URL.createObjectURL(file);

      this.usuario.foto = fotoURL;
    },

    limparFormulario() {
      this.usuario.nome = '';
      this.usuario.email = '';
      this.usuario.foto = '';
    },

    excluirUsuario(usuarioId) {
      this.ultimosUsuarios = this.ultimosUsuarios.filter((usuario) => usuario.id !== usuarioId);
    }
  }
};
</script>

<style scoped>
.hello-world {
  display: flex;
  justify-content: center;
}

.form-container {
  width: 300px;
  margin-right: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

button {
  padding: 10px 20px;
}

.usuarios-container {
  flex-grow: 1;
}

.usuarios-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.usuario-card {
  width: 200px;
  padding: 20px;
  margin: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.usuario-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.usuario-info h4 {
  margin-top: 0;
}

.usuario-info p {
  margin-bottom: 0;
}
</style>