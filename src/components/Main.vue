<template>
  <div id="main-component">
    <div id="app-header">
      <Topbar :root="root" />
    </div>
    <div id="app-body">
      <component :is="selectedPage || 'HomePage'" v-bind="{ root }" />
    </div>
    <div style="display: none;">
      <div style="height: 80px;"></div>
      <textarea ref="coder" style="display: block; width: 100%;" name="" id="" cols="30" rows="10"></textarea>
      <button v-on:click="execute">Run</button>
    </div>
    <div id="app-footer">
      <Footer :root="root" />
    </div>
  </div>
</template>

<script>

import API from "@/assets/js/api.js";
import noop from "@/assets/js/noop.js";


export default {
  name: "Main",
  props: {},
  components: {},
  data() {
    return {
      root: this,
      selectedPage: "HomePage",
      selectedSubpage: undefined,
      datatypePage: undefined,
    };
  },
  async beforeMount() {
    try {
      this.$api = API.create();
      await this.$api.prepareDatabase();
      window.cm = this;
    } catch (error) {
      console.error(`Error on component «App.beforeCreate(...)»:`, error);
      throw error;
    }
  },
  methods: {
    selectPage(page) {
      if(this.selectedPage === page) {
        this.selectedPage = "HomePage";
      } else {
        this.selectedPage = page;
      }
    },
    pad(pad, str, padLeft) {
      if (typeof str === 'undefined') 
        return pad;
      if (padLeft) {
        return (pad + str).slice(-pad.length);
      } else {
        return (str + pad).substring(0, pad.length);
      }
    },
    async execute() {
      try {
        const cm = this;
        noop(cm);
        const code = this.$refs.coder.value;
        const output = await eval(`const f1 = async function() {
          try {
            let _ = undefined;
            ${code};
            return _;
          } catch(error) {
            console.error("Error:", error);
          }
        };
        f1.call(cm)`);
        console.log(output);
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    selectedPage(newValue) {
      this.datatypePage = newValue === "FoodPage" ? "Food"
        : newValue === "ThoughtPage" ? "Thought"
        : newValue === "MovementPage" ? "Movement"
        : newValue === "GoalsPage" ? "Goals" : undefined
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@use "@/assets/css/app.scss";

</style>
