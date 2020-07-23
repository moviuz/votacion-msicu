<template>
  <div>
    <v-row no-gutters class row wrap>
      <v-col cols="12" class="custom-list-header">
        <v-row no-gutters>
          <v-col cols="7">Users</v-col>
          <v-col cols="5" class="text-right">
            <v-btn color icon small>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn small text>Nuevo</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="custom-list">
        <v-row no-gutters v-for="user in users" :key="user.id" class="custom-list-item">
          <v-col cols="7">
            <v-icon class="pr-1">mdi-account-check</v-icon>
            {{user.mail}}
          </v-col>
          <v-col cols="5" class="text-right">
            <ActionButton small text="Editar"></ActionButton>
            <ActionButton small text="Borrar"></ActionButton>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => {
        [];
      }
    }
  }
};
</script>
<style scoped>
.custom-list-header {
  /* border: solid 1px #373b3f63!important; */
  border: solid 1px #dfe2e6 !important;
  display: block;
  padding: 6px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #f5f6fa !important;
  line-height: 27px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase !important;
  font-family: "Montserrat";
}

.custom-list {
  height: 200px;
  display: block;
  /* border: solid 1px #373b3f63!important; */
  border: solid 1px #dfe2e6 !important;
  border-top: none !important;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: auto;
  background: #fff;
}
.custom-list-item {
  /* border-bottom: solid 1px #dfe2e6!important;  */
  border-bottom: solid 1px #dfe2e6 !important;
  padding: 7px;
  padding-left: 6px;
  padding-right: 5px;
  font-size: 15px;
  line-height: 26px;
}
.custom-list-item:hover {
  background: #dfe2e66b !important;
  border-bottom: solid 1px #dfe2e66b !important;
}

.custom-list-item:last-child {
  border-bottom: solid 1px #dfe2e6 !important;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
</style>