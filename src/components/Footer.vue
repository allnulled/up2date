<template>
  <div>
    <div id="footer-topbar" class="text-align-right">
      Footer
    </div>
  </div>
</template>

<script>

export default {
    name: "Footer",
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

#footer-topbar {
  border-top: 1px solid #333;
  padding-top: 10px;
  margin-top: 60px;
}

</style>