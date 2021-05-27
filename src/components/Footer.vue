<template>
  <div>
    <div id="footer-topbar" class="text-align-right">
      <a href="https://allnulled.github.io/up2date">Up2date</a> with ❤ by <a href="https://github.com/allnulled">allnulled</a>
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
  font-size: 10px;
}

</style>