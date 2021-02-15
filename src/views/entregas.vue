<template>
  <div class="row">
    <b-button class="float-right" variant="danger"
      ><a href="">Log-out <b-icon-box-arrow-right></b-icon-box-arrow-right></a
    ></b-button>
    <div class="col-sm-12 col-md-12 col-lg-12" id="entregas">
      <table class="table table-stripped table-hover">
        <thead class="thead-dark bg-primary">
          <tr>
            <th>ID del Pedido</th>
            <th>Dirección</th>
            <th>Estado de la Entrega</th>
            <th>Ultima actualizacion:</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!--Aquí encontraremos todos los pedidos-->
          <delivery-item
            v-for="delivery in deliveries"
            :key="delivery.id"
            :delivery="delivery"
          ></delivery-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import deliveryItem from "../components/deliveryItem";

export default {
  data: function () {
    return {
      delivery: {},
    };
  },

  components: {
    deliveryItem,
  },
  mounted() {
    // comprobar la promesa porque sigue dando los errores al montar la tabla
    this.$store.dispatch("loadStates").then(() => {
      
      this.$store.dispatch("enRutaState");
      this.$store.dispatch("loadOrders");
      
    });
  },
  computed: {
    deliveries() {
      let pedidos = this.$store.state.deliveries;

      pedidos.sort((a, b) => (a.order < b.order ? -1 : +1));

      return pedidos;
    },
  },
  methods: {},
};
</script>
