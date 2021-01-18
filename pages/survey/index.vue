<template>
<v-container>
    <v-row class="fill-height" row wrap justify="center">
        <v-col cols="12" md="8" class="px-1 pb-2 fill-height">
            <AskPanel></AskPanel>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
import AskPanel from  "~/components/ask/ask";
export default {
  middleware:["auth"],
  
  components: {
      AskPanel
  }
}
</script>
