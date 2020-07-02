import Vue from 'vue'


import ImageUploader from 'vue-image-upload-resize'
import AlertCard from '~/components/ui/AlertCard.vue';
/*

import MobilePanel from "~/components/ui/MobilePanel"
import UpgradeAlert from "~/components/cincel/auth/UpgradeAccountAlert";
*/

Vue.use(ImageUploader);
Vue.component('AlertCard',AlertCard);

/*
Vue.component('MobilePanel',MobilePanel);

Vue.component('UpgradeAlert',UpgradeAlert);
*/
