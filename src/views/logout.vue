<template>

  <p> {{ logout() }} </p>

</template>

<script>
import apiService from "../apiService";

export default {
  methods: {
    logout() {
      return new Promise((resolve) => {
        this.$store.commit("logout");
        localStorage.removeItem("user.token");

        //eliminar la cabecera de axios

        delete apiService.defaults.headers.common["Authorization"];

        resolve()

            this.$router.push('/');

       
      });
    },
  },
};
</script>