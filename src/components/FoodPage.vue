<template>
  <div>
    <StandardDataPage :root="root" page="Food" />
  </div>
</template>

<script>
export default {
  name: "FoodPage",
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  watch: {},
};
</script>

<style lang="scss">

@import "@/assets/css/app.scss";

</style>