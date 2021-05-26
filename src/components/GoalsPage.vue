<template>
  <div>
    <StandardDataPage :root="root" page="Goals" />
  </div>
</template>

<script>

export default {
    name: "GoalsPage",
    props: {
  root: {
    type: Object,
    required: true
  }
},
    data() {
        return {}
    },
    methods: {

    },
    watch: {}
};

</script>

<style>

</style>