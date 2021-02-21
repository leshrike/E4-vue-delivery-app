<template>
  <div class="form-group container justify-content-center">
    <h1 class="h1">Sign in</h1>

    <ValidationObserver ref="form">
      <form @submit.prevent="login" novalidate>
        <ValidationProvider
          rules="required|email"
          v-slot="{ error }"
          name="name"
          mode="lazy"
        >
          <div class="form-group mx-sm-3 mb-2">
            <label for="email">Correo electrónico</label>
            <input
              class="form-control"
              type="email"
              name="login"
              v-model="user.login"
              placeholder="ejemplo@example.com"
            />
            <span class="error">{{ error }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          rules="required"
          v-slot="{ error }"
          name="password"
          mode="lazy"
        >
          <div class="form-group mx-sm-3 mb-2">
            <label for="password">Contraseña</label>
            <input
              class="form-control"
              type="password"
              name="password"
              v-model="user.password"
              placeholder="password"
            />
            <span class="error">{{ error }}</span>
          </div>
        </ValidationProvider>
        <input type="submit" value="Log-in" class="btn btn-primary" />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";

import {
  email,
  required,
  alpha_spaces,
  alpha_num,
} from "vee-validate/dist/rules";

import es from "vee-validate/dist/locale/es.json";


//resto de reglas a aplicar para la validación del formulario
extend("email", email);
extend("required", required);
extend("alpha_num", alpha_num);
extend("alpha_spaces", alpha_spaces);
localize("es", es);

export default {
  data() {
    return {
      user: {},
    };
  },

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  methods: {
    login() {
      this.$store.dispatch("login", this.user);
      this.$router.push("/entregas");
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>