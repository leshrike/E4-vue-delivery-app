<template>

  <p> {{ logout() }} </p>

</template>

<script>
import apiService from "../apiService";

export default {
  methods: {
    logout() {
      
        this.localStorage.removeItem("token");
        //eliminar la cabecera de axios
        delete apiService.defaults.headers.common["Authorization"];
        this.$router.push('/login');
    },
  },
};
</script>