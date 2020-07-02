<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="11"
        v-if="formated && formated.length"
        class="hidden-md-and-up"
        style="overflow:auto;height:63vh">
        <v-data-iterator
          :items="formated"
          :search="searchFilter"
          hide-default-footer
          hide-default-header
        >
          <template v-slot:default="props">
            <v-row>
              <v-col v-for=" (contract,$index) in props.items" :key="$index" cols="12" class="py-2">
                <v-card
                  elevation="5"
                  :to="'/documents/'+contract.id+'/show'"
                  class="bordered-card-radius"
                >
                  <v-card-text class="body-1">
                    <v-row
                      no-gutters
                      class="pl-3 bordered-card"
                      :style="{'border-left-color':contract.statusColor+'!important'}"
                    >
                      <v-col cols="12">
                        <strong>{{contract.name}}</strong>
                      </v-col>
                      <v-col cols="12">{{contract.description}}</v-col>
                      <v-col cols="6" sm="9" class="body-1 grey--text accent-4">
                        <span>
                          <v-icon small>mdi-calendar</v-icon>
                          {{ contract.created_at.substr(0,10) }}
                        </span>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="3"
                        class="text-right"
                        style="font-size:13px;"
                      >{{contract.statusLastFile}}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <template v-slot:no-results>
            <v-card>
              <v-card-text class="text-center">No hay resultados</v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col cols="12" v-if="formated && formated.length" class="hidden-sm-and-down">
        <v-data-table
          :headers="headers"
          :items="formated"
          hide-default-header
          :search="searchFilter"
          hide-default-footer
          class="elevation-0"
          :disable-pagination="true"
          style="height:70vh!important; overflow:auto;border: solid 1px #dfe2e6!important; "
        >
          <template v-slot:header="{ props: { headers } }">
            <thead class="tr-bg">
              <tr class="tr-bg">
                <th
                  v-for="header in headers"
                  class="tr-bg"
                  :width="header.width"
                  :key="header.text"
                >{{header.text}}</th>
              </tr>
            </thead>
          </template>

          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td class="td-cincel">{{ item.name }}</td>
                <td class="td-cincel text-xs-left">
                  <v-icon :color="item.statusColor">mdi-circle-medium</v-icon>
                  {{ item.statusLastFile}}
                </td>
                <td class="td-cincel">{{ item.description }}</td>
                <td class="td-cincel">{{ item.created_at.substr(0,10) }}</td>
                <td class="td-cincel text-xs-left">
                  <v-btn icon color="blue accent-4" :to="'/documents/'+item.id+'/show'">
                    <v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-slot:no-results>
            <v-card>
              <v-card-text class="text-center">No hay resultados</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  statusString,
  signersOfLastVersion,
  statusOfFile,
  statusColor
} from "~/assets/js/helpers";
export default {
  props: ["documents", "searchFilter"],
  mounted() {
    let unformated = [...this.documents];
    for (let i = 0; i < unformated.length; i++) {
      let documento = {
        ...unformated[i],
        statusLastFile: statusString(unformated[i].status),
        statusColor: statusColor(unformated[i].status),
        owner: ""
      };
      this.formated.push(documento);
      //console.log(documento);
    }
  },
  data() {
    return {
      formated: [],
      statusString,
      signersOfLastVersion,
      ASSETS_HOST: process.env.ASSETS_HOST,
      headers: [
        { text: "Nombre ", value: "name", sortable: false, width: 300 },
        {
          text: "Estado",
          value: "statusLastFile",
          sortable: false,
          width: 250
        },
        { text: "Descripción", value: "name", sortable: false },
        { text: "Fecha", value: "date", sortable: false, width: 120 },
        { text: "", value: "actions", sortable: false, width: 50 }
      ]
    };
  }
};
</script>
<style lang="css" scoped>
.tr-bg {
  background-color: #f5f6fa !important;
}

.td-cincel {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  height: 70px !important;
}

.bordered-card {
  border-left: solid 5px;
}

.bordered-card-radius {
  border-radius: 15px !important;
}
</style>
