<template>
  <div>
      <MobilePanel v-if="false" >
      </MobilePanel>
      <DesktopPanel  title="Api Panel" subtitle="Only devs :)"  >
          <v-row slot="main-content" >
              <v-col cols="12">
                  <FoldersApiLayout></FoldersApiLayout>
              </v-col>
          </v-row>
      </DesktopPanel>
  </div>
</template>

<script>
import MobilePanel from '~/components/ui/MobilePanel'
import DesktopPanel from '~/components/ui/DesktopPanel'
import FoldersApiLayout from '~/components/folders/FoldersApiLayout'
export default {
    middleware:['auth'],
    components:{
        MobilePanel,
        DesktopPanel, 
        FoldersApiLayout
    },
}
</script>

<style>

</style>