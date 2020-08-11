<template>
  <div>
    <v-card elevation="0" class="transparent">
      <v-card-text>
        <v-form ref="user_form" v-model="valid" autocomplete="off">
          <div class="form-label">1.Correo</div>
          <v-text-field
            class="field mb-0"
            v-model="newUserInvite.email"
            :rules="[rules.required, rules.email]"
            placeholder="Escribe el correo"
            outlined
            dense
            name="mail_user"
          ></v-text-field>
          <div class="form-label">2.Rol</div>
          <v-select
            v-model="newUserInvite.invite_rol"
            :items="roles"
            outlined
            dense
            hide-details
            :rules="[rules.required]"
            item-text="name"
            item-value="id"
            label="Roles"
            single-line
          ></v-select>
          <v-card-actions>
            <v-btn @clicl="clearForm" text :disabled="!aviableSaving || loading">Limpiar</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" @click="saveItem" text :disabled="!aviableSaving">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import rules from "~/assets/js/rules";
import Roles from "~/data/Roles";
import { getCurrentRol } from "~/assets/js/helpers";
export default {
  props: {
    user: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.clearForm();
  },
  data() {
    return {
      rules,
      newUserInvite: {
        email: null,
        name: null,
        invite_rol: null
      },
      valid: false,
      roles: Roles
    };
  },
  methods: {
    clearForm() {
      if (this.user && this.user.name) {
        this.newUserInvite.email = this.user.email;
        this.newUserInvite.name = this.userRol(this.user);
        if (this.newUserInvite.name === "Admin") {
          this.newUserInvite.invite_rol = 2;
        } else {
          this.newUserInvite.invite_rol = 3;
        }
      } else {
        this.newUserInvite = { email: null, rol: null, invite_rol: null };
      }
      this.$refs.user_form.resetValidation();
    },
    saveItem() {
      this.newUserInvite.permissions = this.getRolPermission(
        this.newUserInvite.invite_rol
      );
      this.$emit("saveItem", this.newUserInvite);
    },
    //expresion regular para un email valido
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    //Metodo que procesa al usuario para definir el tipo de rol de acuerdo a los permisoss que contrae
    userRol(user) {
      let currentRol = getCurrentRol(user.permissions);
      return currentRol.name;
    },
    getRolPermission(idRol) {
      let permissions;
      for (let i in Roles) {
        if (Roles[i].id == idRol) permissions = [...Roles[i].permissions];
      }
      return permissions;
    }
  },
  computed: {
    aviableSaving() {
      let nameRol;
      let idRolControl;

      if (this.user && this.user) {
        nameRol = this.userRol(this.user);
        if (nameRol == "Admin") {
          idRolControl = 2;
        } else {
          idRolControl = 3;
        }
        if (
          this.newUserInvite.email != this.user.email ||
          this.newUserInvite.invite_rol != idRolControl
        ) {
          return true;
        }
      } else {
        if (this.newUserInvite.email && this.newUserInvite.invite_rol) {
          if (this.validEmail(this.newUserInvite.email)) {
            return true;
          }
        }
      }
      return false;
    }
  },
  watch: {
    user: function() {
      this.clearForm();
    }
  }
};
</script>
<style scoped>
</style>