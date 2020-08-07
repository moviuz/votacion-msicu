<template>
  <div class="fill-height" :height="panelHeight" style="overflow:auto!important">
    <v-row class no-gutters v-for="(c) in comments" :key="c.id">
      <v-col cols="3" class="text-center" align-center>
        <img :src="default_avatar.image" style="width:70%" />
      </v-col>
      <v-col cols="9">
        <div class="font-weight-bold">{{c.user.name}}</div>
        <div>{{c.text}}</div>
        <div class="caption">{{c.created_at | dateFilter('toNow')}}</div>
      </v-col>
      <v-col cols="12" class="pa-1">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-form @submit.prevent="createComment">
          <v-text-field
            append-icon="mdi-send-outline "
            hide-details
            placeholder="Escribe tu comentario"
            @click:append="createComment"
            v-if="!Bloqueado"
            :rules="[rules.required]"
            outlined
            v-model="comment.text"
            class="grey--text yellow--text"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-if="Bloqueado" no-gutters>
      <v-col cols="12">
        <br />
        <v-card class="grey lighten-3 elevation-1 text-center">
          <v-card-text class="title">No es posible enviar mensajes</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import rules from "~/assets/js/rules";
import userAvatar from "~/data/userAvatar";
export default {
  props: ["comments", "file_id", "user_id", "Bloqueado", "panelHeight"],
  mounted() {
    //console.log(this.comments,this.file_id,this.user_id);
    console.log(userAvatar);
  },
  data() {
    return {
      loading: false,
      valid: false,
      comment: { text: "", user_id: "" },
      rules,
      default_avatar: userAvatar
    };
  },
  methods: {
    async createComment() {
      this.loading = true;
      this.comment.user_id = this.user_id;
      await this.$store
        .dispatch("comments/createComment", {
          comment: this.comment,
          file_id: this.file_id
        })
        .then(comment => {
          //console.log(comment)
          this.$emit("commentCreated", comment);
          this.comment = {};
        });
      this.loading = false;
    }
  }
};
</script>

<style>
</style>