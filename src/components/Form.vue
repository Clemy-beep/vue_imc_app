/* eslint-disable prettier/prettier */
<template>
  <div id="stats-vue">
    <form @submit.prevent="handleInputs">
      <label for="weight">Poids</label>
      <input
        v-model="user.weight"
        type="number"
        min="0"
        placeholder="Votre poids en kg"
        name="weight"
        required
      />
      <label for="height">Taille</label>
      <input
        id="height"
        v-model="user.height"
        type="number"
        step="0.01"
        min="0"
        placeholder="Votre taille en m"
        required
      />
      <label for="gender">Choisissez votre genre :</label>
      <select id="gender" v-model="user.gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="submit" value="Calculer mon IMC" />
    </form>
    <div v-for="error in errors" id="errors" :key="error">
      <span class="error">{{ error }} </span>
    </div>
    <div v-if="response !== null" id="response">
      <table>
        <caption>
          Résumé et calcul de votre IMC :
        </caption>
        <thead>
          <tr>
            <th>Taille</th>
            <th>Poids</th>
            <th>Indice de Masse Corporelle</th>
            <th>Poids Idéal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ height }}</td>
            <td>{{ weight }}</td>
            <td>{{ response }}</td>
            <td>{{ idealWeight }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { mapState, mapWritableState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormComponent",
  data() {
    return {
      user: {
        weight: Number,
        height: Number,
        gender: String,
      },
      errors: [""],
      response: null,
      height: Number,
      weight: Number,
      gender: String,
      idealWeight: Number,
    };
  },

  computed: {
    ...mapWritableState(useUserStore, {
      setUser: "user",
    }),
    ...mapState(useUserStore, {
      getUser: "user",
    }),
    currentUser() {
      return this.getUser;
    },
  },
  mounted() {
    console.log(this.getUser);
    this.checkUser();
  },
  methods: {
    checkUser() {
      if (this.getUser.height > 0) {
        this.calculateImc(this.getUser);
      }
    },
    handleInputs: function () {
      console.log(this.user);
      if (this.user.height === 0 || this.user.weight === 0) {
        this.errors.push("Merci de remplir tous les champs");
        return this.errors;
      }
      if (this.user.height > 3) {
        this.errors.push("Votre taille doit être exprimée en m");
        return this.errors;
      }
      if (this.user.weight > 1000) {
        this.errors.push("Votre poids doit être exprimé en kg");
        return this.errors;
      }
      this.setUser = this.user;
      console.log(this.getUser);
      this.calculateImc(this.user);
    },
    calculateImc: function (user) {
      let imc = user.weight / (user.height * user.height);
      this.idealWeight =
        user.gender === "male"
          ? user.height * 100 - 100 - (user.height * 100 - 150) / 4
          : user.height * 100 - 100 - (user.height * 100 - 150) / 2.5;
      this.response = imc;
      this.height = user.height;
      this.weight = user.weight;
    },
  },
});
</script>

<style scoped>
label,
input {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

form {
  position: relative;
  margin: 0 auto;
  width: fit-content;
  border: 1px solid #41b883;
  padding: 0.8em;
  border-radius: 8px;
}
label {
  display: block;
}
input {
  display: block;
  height: 40px;
  background-color: transparent;
  border: 1px solid #34495e;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 8px;
  color: rgb(195, 192, 205);
  margin-left: auto;
  margin-right: auto;
}
input[type="submit"] {
  background-color: #41b883;
  color: black;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  margin-top: 1em;
  border: none;
}

form {
  margin-top: 1em;
}

#response {
  margin: 1em;
}

.error {
  color: #ee2020;
}

table {
  margin-left: auto;
  margin-right: auto;
  border-spacing: 0.5em;
}

table,
tr {
  border: 1px solid black;
}
</style>
