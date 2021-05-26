<template>
  <div>
    <StandardDataPage :root="root" page="Thought" />
  </div>
</template>

<script>
export default {
  name: "ThoughtPage",
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