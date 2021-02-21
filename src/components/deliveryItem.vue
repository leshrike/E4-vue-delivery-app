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
    <td>{{ delivery.delivery_date }}</td>

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
  name: "delivery-item",
  props: ["delivery"],
  data: function () {
    return {
      editing: false,
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
    
    parseState(id) {
      //esta funcion llama a un getter que consigue transformar el id del estado del pedido a su nombre

      let status = this.$store.getters.getState(id);
      return status.name;
    },

    changeState() {
      const modifiedDelivery = Object.assign({}, this.delivery);

      modifiedDelivery.state = this.delivery.state;

      let fecha = new Date();

      modifiedDelivery.timestamp = fecha.toLocaleTimeString();

      this.$store.dispatch("changeDelivery", modifiedDelivery);

      alert('Se ha modificado el estado del pedido ' + this.delivery.id );
    },

    orderUp() {
      // deberemos conseguir que los dos ordenes se intercambien, para que solo pueda haber una "tier" de orden por entrega

      // id 5 - > order 2 (el que se recibe)
      const modifiedDelivery = Object.assign({}, this.delivery);
      const newTarget = this.delivery.order;

      // id 2 - > order 3 (el que se quiere)

      let orderTarget = this.delivery.order;
      orderTarget = orderTarget - 1;
      
      //obtenemos el objeto relativo al producto que se encuentra en el orden que queremos ocupar
      const replacedOrder = this.$store.getters.getDeliveryWithOrder(orderTarget);

      if (replacedOrder.order) {

        modifiedDelivery.order = replacedOrder.order;
        replacedOrder.order = newTarget;

        let fecha = new Date();
        modifiedDelivery.timestamp = fecha.toLocaleTimeString();
        replacedOrder.timestamp = fecha.toLocaleTimeString();

        // se envia la peticion para cambiar los datos del pedido

        this.$store.dispatch("changeDelivery", replacedOrder); 
        this.$store.dispatch("changeDelivery", modifiedDelivery);
      
      } else {
        alert("No puede asignársele más prioridad a este pedido");
      }
    },

    orderDown() {
      
      const modifiedDelivery = Object.assign({}, this.delivery);
      const newTarget = this.delivery.order;

      let orderTarget = this.delivery.order;
      orderTarget = orderTarget + 1;

       const replacedOrder = this.$store.getters.getDeliveryWithOrder(orderTarget); //obtenemos el objeto relativo al producto que se encuentra en el orden que queremos ocupar

      if (replacedOrder) {

        modifiedDelivery.order = replacedOrder.order;
        replacedOrder.order = newTarget;

        let fecha = new Date();
        modifiedDelivery.timestamp = fecha.toLocaleTimeString();
        replacedOrder.timestamp = fecha.toLocaleTimeString();

        // se envia la peticion para cambiar los datos del pedido

        this.$store.dispatch("changeDelivery", replacedOrder); 
        this.$store.dispatch("changeDelivery", modifiedDelivery);
        
      } else {
        alert("No puede quitarle más prioridad a este pedido");
      }
    },
  },
};
</script>