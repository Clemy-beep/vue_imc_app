<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Calculateur d'IMC</h1>
    <p>
      Cette application sert à calculer votre IMC, c'est à dire votre Indice de
      Masse Corporelle. Chez l'adulte, un IMC compris entre 18,5 et 24,9 est
      considéré comme normal. En dessous d'un IMC de 18,5, on parle de maigreur.
      Au-dessus de 24,9, on parle de surcharge pondérale. Quant à l'obésité, son
      seuil est fixé à 30 et trois stades sont distingués : l'obésité modérée,
      sévère et très sévère (encore appelée massive ou morbide).
    </p>
    <FormComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormComponent from "../components/Form.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    FormComponent,
  },
});
</script>

<style scoped>
p {
  margin: 0 20%;
  text-align: center;
}
</style>
