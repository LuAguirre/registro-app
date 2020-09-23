<template>
  <section class="columns">
    <form class="column mt-3 ">
      <b-field grouped group-multiline label="Personal">
        <b-input type="text" placeholder="Nombre" required v-model="nombre">
        </b-input>
        <b-input type="phone" placeholder="Numero" v-model="numero"> </b-input>
      </b-field>
      <b-field grouped group-multiline label="Puesto">
        <b-input type="text" placeholder="Lugar" required v-model="lugar">
        </b-input>
        <b-input type="text" placeholder="Posicion" required v-model="posicion">
        </b-input>
        <b-input
          type="date"
          placeholder="Fecha Inicio"
          required
          v-model="fechaInicio"
        >
        </b-input>
      </b-field>
      <b-button v-if="!isUpdate" type="is-primary" @click="handleSubmit">
        Agregar nuevo usuario
      </b-button>

      <div v-else class="buttons">
        <b-button type="is-primary" @click="handleConfirmUpdate">
          Actualizar
        </b-button>
        <b-button type="is-danger" @click="handleCancelUpdate">
          Cancelar
        </b-button>
      </div>
    </form>

    <div class="column mt-3">
      <div class="tile is-ancestor is-vertical">
        <div
          v-for="usuario in usuarios"
          :key="usuario._id"
          class="tile expanded is-child notification box is-primary"
        >
          <p class="has-text-weight-bold">
            {{ usuario.nombre }}
          </p>
          <p class="">
            {{ usuario.numero + ' - ' + usuario.posicion}}
          </p>
          <p class="">
            {{ usuario.lugar + ' - ' + usuario.fechaInicio}}
          </p>
          <p class="buttons mt-1">
            <b-button
              @click="handleDelete(usuario._id)"
              size="is-small"
              type="is-danger"
              >Eliminar
            </b-button>
            <b-button
              @click="handleUpdate(usuario)"
              inverted
              size="is-small"
              type="is-info"
              >Actualizar</b-button
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  agregarUsuario,
  actualizarUsuario,
  obtenerUsuarios,
  eliminarUsuario,
} from '../api';
export default {
  name: 'Usuarios Permanentes',
  created() {
    obtenerUsuarios('temporales').then((usuarios) => {
      this.usuarios = usuarios;
    });
  },
  methods: {
    reset() {
      this.nombre = '';
      this.numero = '';
      this.lugar = '';
      this.posicion = '';
      this.fechaInicio = '';
    },
    handleUpdate(usuario) {
      this.id = usuario._id;
      this.nombre = usuario.nombre;
      this.numero = usuario.numero;
      this.lugar = usuario.lugar;
      this.posicion = usuario.posicion;
      this.fechaInicio = usuario.fechaInicio;
      this.isUpdate = true;
    },
    handleCancelUpdate() {
      this.reset();
      this.id = '';
      this.isUpdate = false;
    },
    handleConfirmUpdate() {
      actualizarUsuario(this.id, this.obtenerDatausuario(), 'temporales').then(
        () => {
          obtenerUsuarios('temporales').then((usuarios) => {
            alert('Usuario Actualizado');
            this.usuarios = usuarios;
            this.handleCancelUpdate();
          });
        }
      );
    },
    handleDelete(id) {
      eliminarUsuario(id, 'temporales').then(() => {
        obtenerUsuarios('temporales').then((usuarios) => {
          alert('UsuarioEliminado');
          this.usuarios = usuarios;
          this.reset();
        });
      });
    },
    obtenerDatausuario() {
      return JSON.stringify({
        nombre: this.nombre,
        numero: this.numero,
        lugar: this.lugar,
        posicion: this.posicion,
        fechaInicio: this.fechaInicio,
      });
    },
    handleSubmit() {
      console.log(this.obtenerDatausuario());
      agregarUsuario(this.obtenerDatausuario(), 'temporales').then(() => {
        alert('Usuario Aregado');
        obtenerUsuarios('temporales').then((usuarios) => {
          this.usuarios = usuarios;
          this.reset();
        });
      });
    },
  },
  data() {
    return {
      id: '',
      isUpdate: false,
      usuarios: [],
      nombre: '',
      numero: '',
      lugar: '',
      posicion: '',
      fechaInicio: '',
    };
  },
};
</script>
