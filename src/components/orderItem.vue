<template>
  <tr>
    <td>{{ order.id }}</td>
    <td>{{ order.client_id }}</td>
    <td v-show="!editing">{{ order.state_id }}</td>
    <!--Mostramos la conversion ya realizada del estado del pedido-->
    <td v-show="editing">
      <select @blur="changeState" v-model="order.state_id">
        <state-item
          v-for="state in states"
          :key="state.id"
          :state="state"
        ></state-item>
      </select>
    </td>
    <td>{{ order.delivery_date }}</td>

    <td>
      <!--Botones para las acciones (subir, bajar y editar (cambiará el estado por un select) )-->
      <button class="btn btn-black" v-on:click="orderUp()">
        <b-icon-arrow-up></b-icon-arrow-up>
      </button>
      <button class="btn btn-black" v-on:click="orderDown()">
        <b-icon-arrow-down></b-icon-arrow-down>
      </button>
      <button class="btn btn-green" v-on:click="editing = !editing">
        <b-icon-pencil></b-icon-pencil>
      </button>
    </td>
  </tr>
</template>
<script>
import stateItem from "./stateItem";
export default {
  name: "order-item",
  props: ["order"],
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    states() {
      return this.$store.state.states;
    },
  },
  components: {
    stateItem,
  },
  methods: {
    changeState() {
      const modifiedOrders = Object.assign({}, this.order);
      modifiedOrders.state = this.order.state;
      let fecha = new Date();
      modifiedOrders.timestamp = fecha.toLocaleTimeString();
      this.$store.dispatch("changeOrders", modifiedOrders);
      alert('Se ha modificado el estado del pedido ' + this.order.id );
    },
    orderUp() {
      // deberemos conseguir que los dos ordenes se intercambien, para que solo pueda haber una "tier" de orden por entrega
      // id 5 - > order 2 (el que se recibe)
      const modifiedOrders = Object.assign({}, this.order);
      const newTarget = this.oder.order;
      // id 2 - > order 3 (el que se quiere)
      let orderTarget = this.orders.order;
      orderTarget = orderTarget - 1;
      //obtenemos el objeto relativo al producto que se encuentra en el orden que queremos ocupar
      const replacedOrder = this.$store.getters.getOrdersWithOrder(orderTarget);
      if (replacedOrder.order) {
        modifiedOrders.order = replacedOrder.order;
        replacedOrder.order = newTarget;
        let fecha = new Date();
        modifiedOrders.timestamp = fecha.toLocaleTimeString();
        replacedOrder.timestamp = fecha.toLocaleTimeString();
        // se envia la peticion para cambiar los datos del pedido
        this.$store.dispatch("changeOrders", replacedOrder); 
        this.$store.dispatch("changeOrders", modifiedOrders);
      } else {
        alert("No puede asignársele más prioridad a este pedido");
      }
    },
    orderDown() {
      const modifiedOrders = Object.assign({}, this.order);
      const newTarget = this.order.order;
      let orderTarget = this.order.order;
      orderTarget = orderTarget + 1;
      const replacedOrder = this.$store.getters.getOrdersWithOrder(orderTarget); //obtenemos el objeto relativo al producto que se encuentra en el orden que queremos ocupar
      if (replacedOrder) {
        modifiedOrders.order = replacedOrder.order;
        replacedOrder.order = newTarget;
        let fecha = new Date();
        modifiedOrders.timestamp = fecha.toLocaleTimeString();
        replacedOrder.timestamp = fecha.toLocaleTimeString();
        // se envia la peticion para cambiar los datos del pedido
        this.$store.dispatch("changeOrders", replacedOrder); 
        this.$store.dispatch("changeOrders", modifiedOrders);
      } else {
        alert("No puede quitarle más prioridad a este pedido");
      }
    },
  },
};
</script>