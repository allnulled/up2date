<template>
  <div>
    <StandardDataPage :root="root" page="Movement" />
  </div>
</template>

<script>
export default {
  name: "MovementPage",
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