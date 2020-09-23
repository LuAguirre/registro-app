<template>
  <section class="columns">
    <form class="column mt-3 ">
      <b-field grouped group-multiline label="Nombre">
        <b-input type="text" placeholder="Nombre" required v-model="nombre">
        </b-input>
        <b-input
          type="text"
          placeholder="Segundo Nombre"
          v-model="segundoNombre"
        >
        </b-input>
        <b-input
          type="text"
          placeholder="Apellido "
          required
          v-model="apellido"
        >
        </b-input>
        <b-input
          type="text"
          placeholder="Segundo Apellido "
          v-model="segundoApellido"
        >
        </b-input>
      </b-field>
      <b-field grouped label="Documentos">
        <b-input type="number" placeholder="DPI" required v-model="dpi">
        </b-input>
        <b-input type="number" placeholder="NIT" v-model="nit"> </b-input>
      </b-field>
      <b-field grouped group-multiline label="Contacto">
        <b-input
          type="email"
          placeholder="Email Personal"
          required
          v-model="emailPersonal"
        >
        </b-input>
        <b-input
          type="email"
          placeholder="Email Institucional"
          required
          v-model="emailInstitucional"
        >
        </b-input>
        <b-input
          type="number"
          placeholder="Numero Personal"
          required
          v-model="numeroPersonal"
        >
        </b-input>
        <b-input type="number" placeholder="Numero Casa" v-model="numeroCasa">
        </b-input>
      </b-field>
      <b-field grouped group-multiline label="Puesto">
        <b-input
          type="text"
          placeholder="Posicion Funcional"
          required
          v-model="posicionFuncional"
        >
        </b-input>
        <b-input
          type="text"
          placeholder="Posicion Nominal"
          required
          v-model="posicionNominal"
        >
        </b-input>
        <b-input
          type="text"
          placeholder="Departamento Laboral"
          required
          v-model="departamentoLaboral"
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
            {{ usuario.nombre + ' ' + usuario.apellido }}
          </p>
          <p class="">
            {{ usuario.numeroPersonal + ' - ' + usuario.emailPersonal }}
          </p>
          <p class="">
            {{ usuario.departamentoLaboral + ' - ' + usuario.posicionNominal }}
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
    obtenerUsuarios('permanentes').then((usuarios) => {
      this.usuarios = usuarios;
    });
  },
  methods: {
    reset() {
      this.nombre = '';
      this.segundoNombre = '';
      this.apellido = '';
      this.segundoApellido = '';
      this.dpi = '';
      this.nit = '';
      this.emailPersonal = '';
      this.emailInstitucional = '';
      this.numeroPersonal - '';
      this.numeroCasa = '';
      this.posicionFuncional = '';
      this.posicionNominal = '';
      this.departamentoLaboral = '';
    },
    handleUpdate(usuario) {
      this.id = usuario._id;
      this.nombre = usuario.nombre;
      this.segundoNombre = usuario.segundoNombre;
      this.apellido = usuario.apellido;
      this.segundoApellido = usuario.segundoApellido;
      this.dpi = usuario.dpi;
      this.nit = usuario.nit;
      this.emailPersonal = usuario.emailPersonal;
      this.emailInstitucional = usuario.emailInstitucional;
      this.numeroPersonal - usuario.numeroPersonal;
      this.numeroCasa = usuario.numeroCasa;
      this.posicionFuncional = usuario.posicionFuncional;
      this.posicionNominal = usuario.posicionNominal;
      this.departamentoLaboral = usuario.departamentoLaboral;
      this.isUpdate = true;
    },
    handleCancelUpdate() {
      this.reset();
      this.id = '';
      this.isUpdate = false;
    },
    handleConfirmUpdate() {
      actualizarUsuario(this.id, this.obtenerDatausuario(), 'permanentes').then(
        () => {
          obtenerUsuarios('permanentes').then((usuarios) => {
            alert('Usuario Actualizado');
            this.usuarios = usuarios;
            this.handleCancelUpdate();
          });
        }
      );
    },
    handleDelete(id) {
      eliminarUsuario(id, 'permanentes').then(() => {
        obtenerUsuarios('permanentes').then((usuarios) => {
          alert('UsuarioEliminado');
          this.usuarios = usuarios;
          this.reset();
        });
      });
    },
    obtenerDatausuario() {
      return JSON.stringify({
        nombre: this.nombre,
        segundoNombre: this.segundoNombre,
        apellido: this.apellido,
        segundoApellido: this.segundoApellido,
        dpi: this.dpi,
        nit: this.nit,
        emailPersonal: this.emailPersonal,
        emailInstitucional: this.emailInstitucional,
        numeroPersonal: this.numeroPersonal,
        numeroCasa: this.numeroCasa,
        posicionFuncional: this.posicionFuncional,
        posicionNominal: this.posicionFuncional,
        departamentoLaboral: this.departamentoLaboral,
      });
    },
    handleSubmit() {
      agregarUsuario(this.obtenerDatausuario(), 'permanentes').then(() => {
        obtenerUsuarios('permanentes').then((usuarios) => {
          alert('Usuario Aregado');
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
      segundoNombre: '',
      apellido: '',
      segundoApellido: '',
      dpi: '',
      nit: '',
      emailPersonal: '',
      emailInstitucional: '',
      numeroPersonal: '',
      numeroCasa: '',
      posicionFuncional: '',
      posicionNominal: '',
      departamentoLaboral: '',
    };
  },
};
</script>
