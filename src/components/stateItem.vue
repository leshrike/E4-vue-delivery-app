<template>
  <b-form-select-option :name="state.name" v-bind:value="state.id">{{
    state.name
  }}</b-form-select-option>
</template>

<script>
export default {
  name: "state-item",
  props: ["state"],
};
</script>