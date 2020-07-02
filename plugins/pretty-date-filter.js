import Vue from 'vue'

//import { formatRelative, subDays } from 'date-fns';
var format = require('date-fns/format')
var distanceInWordsToNow = require('date-fns/distance_in_words_to_now')
// Require Esperanto locale
var esLocale = require('date-fns/locale/es')
//import { es } from 'date-fns/esm/locale';

const dateFilterFn = (value,type) =>{
  return testFn(value,type);
};


function testFn(value,type){
	let formatedDate = ''
  if(type == 'toNow')
    formatedDate = 'Hace ' + distanceInWordsToNow(value,{locale:esLocale});
  else if(type == 'words')
    formatedDate = format(value,'dddd DD MMM', {locale:esLocale});
  else if (type == 'full pretty')
    formatedDate = format(value,'DD / MM / YYYY - HH:mm', {locale:esLocale});
  else if (type == 'full')
    formatedDate = format(value,'YYYY-MM-DD HH:mm', {locale:esLocale});
  else
    formatedDate = format(value,'DD MMMM YYYY', {locale:esLocale});
  return formatedDate != 'Invalid Date' ? formatedDate : '-'
}

Vue.filter('dateFilter',dateFilterFn);