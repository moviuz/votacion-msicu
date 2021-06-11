export default {
	min: (min) => (value) => value >= min || "Mínimo " + min,
	max: (max) => (value) => value <= min || "Maximo " + min,
	minMax: (min,max) => (value) => value >= min && value <= max  || "Mínimo " + min + " y máximo " + max,
	required: (value) => value !== null ? (value !== '' || "Requerido") : "Requerido",
  email: (value) => {
    let pattern = /^(([^<>()[\]\\.,;!?·$ºª¿:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || "E-mail inválido"
    },
 spacer: (value) => { 
        let pattern = /^[^\s]+(\s+[^\s]+)*$/
        return pattern.test(value) || "No se permiten espacios en blanco al principio y al final"
    },
  number: (value) => /^\d+$/.test(value) || "No es un número válido",
  minLength: (min,msg) => (value) => value ? value.length >= min || msg ||'Too short' : true,
  maxLength: (max,msg) => (value) => value ? value.length <= max || msg ||'Too long' : true,
}