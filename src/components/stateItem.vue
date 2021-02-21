<template>
  <b-form-select-option :name="state.text" v-bind:value="state.id">{{
    state.text
  }}</b-form-select-option>
</template>

<script>
export default {
  name: "state-item",
  props: ["state"],
  computed: {
    states() {
      return this.$store.state.states;
    },
  },
  mounted(){
    
  }
};
</script>