<template>
  <tr>
    <td>{{ delivery.id }}</td>
    <td>{{ delivery.address }}</td>
    <td v-show="isNinja">{{ parseState(delivery.state) }}</td>
    <!--Mostramos la conversion ya realizada del estado del pedido-->
    <td v-show="!isNinja">
      <select @blur="changeState" v-model="delivery.state">
        <state-item
          v-for="state in states"
          :key="state.id"
          :state="state"
        ></state-item>
      </select>
    </td>
    <td>{{ delivery.timestamp }}</td>

    <td>
      <!--Botones para las acciones (subir, bajar y editar (cambiará el estado por un select) )-->
      <button class="btn btn-dark" v-on:click="orderUp()">
        <b-icon-arrow-up></b-icon-arrow-up>
      </button>
      <button class="btn btn-dark" v-on:click="orderDown()">
        <b-icon-arrow-down></b-icon-arrow-down>
      </button>
      <button class="btn btn-success" v-on:click="isNinja = !isNinja">
        <b-icon-pencil></b-icon-pencil>
      </button>
    </td>
  </tr>
</template>
<script>
import stateItem from "./stateItem";
export default {
  name: "delivery-item",
  props: ["delivery"],
  data: function () {
    return {
      isNinja: true,
    };
  },
  components: {
    stateItem,
  },
  computed: {
    states() {
      return this.$store.state.states;
    },
  },
  methods: {
    changeState() {
      const modifiedDelivery = Object.assign({}, this.delivery);

      modifiedDelivery.state = this.delivery.state;

      let fecha = new Date();

      modifiedDelivery.timestamp = fecha.toLocaleTimeString();

      this.$store.dispatch("changeDelivery", modifiedDelivery);
    },

    orderUp() {
      const modifiedDelivery = Object.assign({}, this.delivery);

      if (modifiedDelivery.order > 1) {
        modifiedDelivery.order--;

        let fecha = new Date();

        modifiedDelivery.timestamp = fecha.toLocaleTimeString();
      } else {
        alert("No puede asignársele más prioridad a este pedido");
      }

      this.$store.dispatch("changeDelivery", modifiedDelivery);

      this.$store.dispatch("loadOrders");
    },

    orderDown() {
      const modifiedDelivery = Object.assign({}, this.delivery);

      if (modifiedDelivery.order != 5) {
        modifiedDelivery.order++;

        let fecha = new Date();

        modifiedDelivery.timestamp = fecha.toLocaleTimeString();
      } else {
        alert("No puede quitarle más prioridad a este pedido");
      }

      this.$store.dispatch("changeDelivery", modifiedDelivery);

      this.$store.dispatch("loadOrders");
    },

    parseState(id) {
      //esta funcion llama a un getter que consigue transformar el id del estado del pedido a su nombre

      let status = this.$store.getters.getStateName(id);
      return status.name;
    },
  },
  mounted() {
    this.$store.dispatch("loadStates");
  },
};
</script>