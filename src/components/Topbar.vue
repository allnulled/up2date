<template>
  <div id="for-topbar">
    <div id="for-navigation">
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'HomePage'}" v-on:click="root.selectPage('HomePage')">
                  <img src="@/assets/images/home.png" alt="" class="as-icon-image">
                </button>
              </td>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'FoodPage'}" v-on:click="root.selectPage('FoodPage')">
                  <img src="@/assets/images/food.png" alt="" class="as-icon-image">
                </button>
              </td>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'ThoughtPage'}" v-on:click="root.selectPage('ThoughtPage')">
                  <img src="@/assets/images/lamp.png" alt="" class="as-icon-image">
                </button>
              </td>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'MovementPage'}" v-on:click="root.selectPage('MovementPage')">
                  <img src="@/assets/images/movement.png" alt="" class="as-icon-image">
                </button>
              </td>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'GoalsPage'}" v-on:click="root.selectPage('GoalsPage')">
                  <img src="@/assets/images/race-flag.png" alt="" class="as-icon-image">
                </button>
              </td>
              <td>
                <button class="as-icon" :class="{selected: root.selectedPage === 'SettingsPage'}" v-on:click="root.selectPage('SettingsPage')">
                  <img src="@/assets/images/settings.png" alt="" class="as-icon-image">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss">

@import "@/assets/css/app.scss";

#for-topbar {}
#for-navigation { text-align: center; }
#for-navigation > div { display: inline-block; }
#for-navigation > div > table {}
#for-navigation > div > table > tbody {}
#for-navigation > div > table > tbody > tr {}
#for-navigation > div > table > tbody > tr > td {
  padding-left: 0px;
  padding-right: 0px;
}
#for-navigation > div > table > tbody > tr > td > button.as-icon {
  
}
#for-navigation > div > table > tbody > tr > td > button.as-icon:hover {
  
}
#for-navigation > div > table > tbody > tr > td > button.as-icon.selected {
  
}
#for-navigation > div > table > tbody > tr > td > button.as-icon > img.as-icon-image {}

</style>