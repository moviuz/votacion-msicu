import Vue from 'vue'


import ImageUploader from 'vue-image-upload-resize'
import AlertCard from '~/components/ui/AlertCard.vue';
import ApiLayout from '~/components/ui/ApiLayout.vue';
import ActionButton from '~/components/ui/buttons/ActionButton.vue';
/*

import MobilePanel from "~/components/ui/MobilePanel"
import UpgradeAlert from "~/components/cincel/auth/UpgradeAccountAlert";
*/

Vue.use(ImageUploader);
Vue.component('AlertCard',AlertCard);
Vue.component('ActionButton',ActionButton)
Vue.component('ApiLayout',ApiLayout)

/*
Vue.component('MobilePanel',MobilePanel);

Vue.component('UpgradeAlert',UpgradeAlert);
*/
