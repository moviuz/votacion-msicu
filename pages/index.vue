<template>
  <div>hola</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware:["auth"],
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
