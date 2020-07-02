<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <label for class="label">Ingresa tu archivo .cer</label>
        <v-card class="elevation-0" style="border:1px solid #c0c1c5">
          <v-card-text style="overflow:auto">
            <input class type="file" @change="onCertChange" id="filexas" accept=".cer" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <label for class="label">Ingresa tu archivo .key</label>
        <v-card class="elevation-0" style="border:1px solid #c0c1c5">
          <v-card-text style="overflow:auto">
            <input class type="file" @change="onKeyChange" id="keyexas" accept=".key" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <label for class="label">Ingresa la contraseña de tu .key</label>
        <v-text-field
          type="password"
          single-line
          hide-details
          solo
          label="Escribe la contraseña del key"
          v-model="keyPass"
        ></v-text-field>
      </v-col>
      <v-col cols="7" class="text-center">
        <v-btn
          block
          class="yellow accent-4"
          :disabled="!certFile || !keyFile || !keyPass"
          :loading="loading"
          @click.native="sign"
        >Firmar documento</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import * as sha256 from "crypto-js/sha256";
import * as aes from "crypto-js/aes";
import * as wordArray from "crypto-js/lib-typedarrays";
import { post, put } from "~/assets/js/helpers";
import parser from "~/assets/js/parsersApi";
export default {
  props: {
    document: {},
    signer: {}
  },
  data() {
    return {
      certFile: "",
      keyFile: "",
      keyPass: "",
      serverFile: "",
      sha256File: "",
      lastVersionFile: {},
      loading: false,
      file: "",
      firma: "",
      certificado: "",
      id_sing: "",
      token: ""
    };
  },
  async mounted() {
    // console.log("mounted",this,)
    if (!this.document.files) {
      //Enviar error de que no hay archivos aunque no debería de pasar
      console.log(
        "Enviar error de que no hay archivos aunque no debería de pasar"
      );

      return;
    }
    if (!this.signer.id) {
      //Enviar error de que no hay signer aunque no debería de pasar
      console.log(
        "Enviar error de que no hay signer aunque no debería de pasar"
      );
      return;
    }

    var file = this.document.files.filter(
      file => file.version == this.document.last_version
    );

    if (!file.length) {
      //Error de que no encontró un documento con la última versión
      return;
    }

    //console.log(file)
    this.lastVersionFile = file[0];

    this.firma = new psfiel.Firma({
      // subDirectory: "/Scripts",
      ajaxAsync: false,
      controller: process.env.API_URL + "/sign" //'https://cincel-api-staging.herokuapp.com/v1/sign'
    });

    this.firma.readCertificate("filexas");

    this.firma.readPrivateKey("keyexas");
  },
  methods: {
    async sign() {
      let objeto = {
        signer_id: this.sign_id,
        // token: this.$store.getters.token
        toke: this.$store.getters["auth/token"]
      };
      this.loading = true;
      var ASSETS_HOST = process.env.ASSETS_HOST;
      //console.log(this);
      if (!this.lastVersionFile.id) {
        //Alerta de que no se encontró un archivo a firmar
        console.log("No existe archivo");
        return;
      }
      var sign_id = this.lastVersionFile.signers.find(
        s => s.user_id == this.signer.id
      );
      console.log("sing");
      console.log(sign_id);
      if (!sign_id) {
        /*try {
          //Nota comentarios
          sign_id = await post(
            this,
            '/files/' + this.lastVersionFile.id + '/signers',
            { user_id: this.signer.id, status: 'unsigned' }
          )
          this.id_sing = sign_id.id
          this.validateParDeLlaves()
        } catch (error) {
          //Alerta de que hubo error en el request
          console.log(error)
          return
        }*/
        this.id_sing = sign_id.id;
        this.validateParDeLlaves();
      }

      try {
        var vueContext = this;
        //this.token = this.$store.getters.token;
        this.token = this.$store.getters["auth/token"];
        //console.log(this.token)
        //console.log('=======TOKEN========')
        //console.log(this.$store.getters.token)
        //console.log('=======TOKEN=2222=======')
        //  this.token = vueContext.$axios.getToken()
        // this.$axios.setToken(false)
        //const doc = await this.$axios.$get(ASSETS_HOST + this.lastVersionFile.url, {responseType: 'blob'})
        //this.$axios.setToken(this.$store.getters.token, "Bearer"); -- comentada para sustituir la linea de abajo
        this.$axios.setToken(this.$store.getters["auth/token"], "Bearer");
        // console.log("tokenVVV")
        //console.log(this.$axios.getToken())
        //const reader = new FileReader();
        //reader.readAsDataURL(doc);
        //reader.onload = async (e) => {
        // this.serverFile = e.target.result;
        //vºr aesSigned = aes.encrypt(this.serverFile, this.signer.id.toString()).toString()
        //data.sing;
        //this.sha256File = sha256(aesSigned).toString()
        try {
          this.id_sing = sign_id.id;
          this.validateParDeLlaves();
          /* console.log('entroa try')
          await put(this, '/signers/' + sign_id.id, {
            signature: this.sha256File,
            status: 'signed',
            signed_at: this.$options.filters.dateFilter(new Date(), 'full')
          })
          this.id_sing = sign_id.id
          this.validateParDeLlaves()
          //Alerta de confirmación de que todo salió bien*/
        } catch (error) {
          console.log(error);

          //Alerta de error de que hubo un error en el request
        } finally {
          this.loading = false;
          this.$emit("reload");
        }
        // }
      } catch (error) {
        console.log(error);
        //Error al hacer el request
        //this.loading = false
        this.$emit("reload");
        return;
      }
    },
    validateParDeLlaves(e) {
      var vueContext = this;
      this.firma.validateKeyPairs(this.keyPass, function(data) {
        console.log(data);
        if (data.state == 0) {
          vueContext.decodeCert();
          vueContext.singPKC();
          console.log("decode");
        } else {
          vueContext.loading = false;
          //console.log("error en validateParDeLlaves")
          vueContext.$store.commit("showErrorNotification", data.description);
          //alert(data.description)
        }
      });
    },
    singPKC(e) {
      var vueContext = this;
      //var vueContext = this
      this.firma.setEvidences(2);

      let objeto = {
        signer_id: this.sign_id,
        // token: this.$store.getters.token
        token: this.$store.getters["auth/token"]
      };

      this.firma.setReferencia(
        JSON.stringify({
          signer_id: this.id_sing,
          //token: "JWT " + this.$store.getters.token
          token: "JWT " + this.$store.getters["auth/token"]
        })
      ); //JSON.stringify({prop1:123123,prop2:213213})
      console.log("antesdepkcs1");
      this.firma.signPKCS1(
        "referenciafirma",
        3,
        2,
        {
          tsa: { name: "NA", algorithm: psfiel.Digest.SHA1 },
          nom: { name: "NA" }
        },
        function(data) {
          //this.firma.signPKCS1("referenciafirma", 3, 3, { tsa: { name: "tsaName", algorithm: psfiel.Digest.SHA1 }, nom: { name: "httptsa" } }, function (data) {
          //this.sha256File = data.description.sing;
          if (data.state == 0) {
            console.log("dentro de state pkcs1");
            vueContext.$store.commit(
              "showSuccessNotification",
              "Se ha firmado con exito el documento"
            );
            setTimeout(() => {
              window.location.reload(true);
            }, 5000);
            vueContext.loading = false;
            //  this.sha256File = data.sing;
          } else {
            console.log("error en signPKCS1, advance signature panel", data);
            vueContext.$store.commit("showErrorNotification", data.description);
            vueContext.loading = false;
            // alert(data.description)
          }
        }
      );
      //
    },
    onCertChange(e) {
      this.onFileChange(e, 1);
    },
    onKeyChange(e) {
      this.onFileChange(e, 2);
    },
    onFileChange(event, type) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      var file = files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = e => {
          switch (type) {
            case 1:
              this.certFile = e.target.result;
              break;
            case 2:
              this.keyFile = e.target.result;

              break;
          }
        };

        reader.readAsDataURL(file);
      }
    },
    decodeCert(e) {
      //console.log('dentro')
      if (this.certFile != null) {
        var selecionado = true;
        let objeto = {
          signer_id: this.sign_id,
          //token: this.$store.getters.token
          token: this.$store.getters["auth/token"]
        };
        // console.log('FERNANDO 333', this.id_sing)
        this.firma.setReferencia(
          JSON.stringify({
            signer_id: this.id_sing,
            // token: "JWT " + this.$store.getters.token
            token: "JWT " + this.$store.getters["auth/token"]
          })
        ); //JSON.stringify({prop1:123123,prop2:213213})
        this.firma.decodeCertificate(
          this.certFile,
          selecionado,
          { tsa: { name: "httptsa", algorithm: psfiel.Digest.SHA1 } },
          function(cert) {
            if (cert.state == 0) {
              var hexSerie = cert.hexSerie;
              var fechaInicio = cert.notBefore;
              var fechaFin = cert.notAfter;
              var subjectNombre = cert.subjectName;
              var subjectCorreo = cert.subjectEmail;
              var subjectOrganizacion = cert.subjectOrganization;
              var subjectDepartamento = cert.subjectDepartament;
              var subjectEstado = cert.subjectState;
              var subjectPais = cert.subjectCountry;
              var subjectRfc = cert.subjectRFC;
              var subjectCurp = cert.subjectCURP;
              var issuerName = cert.issuerName;
              var issuerCorreo = cert.issuerEmail;
              var issuerOrganizacion = cert.issuerOrganization;
              var issuerDepartamento = cert.issuerDepartament;
              var issuerEstado = cert.issuerState;
              var issuerPais = cert.issuerCountry;
              var issuerRfc = cert.issuerRFC;
              var issuerCurp = cert.issuerCURP;
              var llavePublica = cert.publicKey;
            } else {
              alert(cert.description);
            }
          }
        );
      } else {
        alert("Primero seleccione su certificado");
      }
    }
  }
};
</script>
<style lang="scss">
</style>
