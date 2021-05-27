<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td class="width-100-x100 text-align-left page-title">Settings</td>
          <td>
            <table class="invisible">
              <tbody>
                <tr>
                  <td>
                    <button
                      type="button"
                      class="as-icon small-icon"
                      v-on:click="goToQuestion"
                    >
                      <img
                        src="@/assets/images/question_mark.png"
                        alt="Add"
                        class="as-icon-image"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="width-100-x100">
      <tbody>
        <tr>
          <td class="text-align-left">
            <button
              type="button"
              class="as-icon small-icon"
              :class="{ selected: pageMode === 'application' }"
              v-on:click="goToApplicationMode"
            >
              <img
                src="@/assets/images/eye.png"
                alt="Facts"
                class="as-icon-image"
              />
            </button>
          </td>
          <td class="width-100-x100">
            <div class="page-subtitle">Application</div>
          </td>
        </tr>
        <tr v-if="pageMode === 'application'">
          <td colspan="200" class="text-align-left as-section">
            <table class="width-100-x100">
              <tbody
                v-for="(
                  objetivo, indexObjetivo
                ) in loadedPrototypes.Objetivo_Predefinido"
                v-bind:key="indexObjetivo"
              >
                <tr>
                  <td class="width-100-x100">
                    <span style="font-weight: bold"
                      >{{ objetivo.Nombre }}.
                    </span>
                    <span>{{ objetivo.Detalles }}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="as-icon small-icon"
                      v-on:click="decreaseIntensidadesMinimas(indexObjetivo)"
                    >
                      <img
                        src="@/assets/images/minus.png"
                        alt="Facts"
                        class="as-icon-image"
                      />
                    </button>
                  </td>
                  <td class="text-align-center">
                    {{ objetivo.Intensidades_minimas }}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="as-icon small-icon"
                      v-on:click="increaseIntensidadesMinimas(indexObjetivo)"
                    >
                      <img
                        src="@/assets/images/plus.png"
                        alt="Facts"
                        class="as-icon-image"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
      <!--tbody>
        <tr>
          <td class="text-align-left">
            <button
              type="button"
              class="as-icon small-icon"
              :class="{ selected: pageMode === 'data' }"
              v-on:click="goToDataMode"
            >
              <img
                src="@/assets/images/eye.png"
                alt="Facts"
                class="as-icon-image"
              />
            </button>
          </td>
          <td class="width-100-x100">
            <div class="page-subtitle">Import or export data</div>
          </td>
        </tr>
        <tr v-if="pageMode === 'data'">
          <td colspan="200" class="text-align-left as-section">
            Import, export, reset data.
          </td>
        </tr>
      </tbody-->
      <!--tbody>
        <tr>
          <td class="text-align-left">
            <button
              type="button"
              class="as-icon small-icon"
              :class="{ selected: pageMode === 'language' }"
              v-on:click="goToLanguageMode"
            >
              <img
                src="@/assets/images/eye.png"
                alt="Facts"
                class="as-icon-image"
              />
            </button>
          </td>
          <td class="width-100-x100">
            <div class="page-subtitle">Language</div>
          </td>
        </tr>
        <tr v-if="pageMode === 'language'">
          <td colspan="200" class="text-align-left as-section">
            Language selector here...
          </td>
        </tr>
      </tbody-->
    </table>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageMode: undefined,
      loadedPrototypes: {},
    };
  },
  async beforeMount() {
    try {
      window.stt = this;
      const allDailies = await this.root.$api.getMinimumDailyGoalIntensities();
      console.log("allDailies22", allDailies);
      const [{Datos: minimumIntensities}] = allDailies;
      const minimumIntensitiesNombres = minimumIntensities.map(x => x.Nombre);
      this.loadedPrototypes = await this.root.$api.getAllPrototypes();
      for(let index = 0; index < this.loadedPrototypes.Objetivo_Predefinido.length; index++) {
        const item = this.loadedPrototypes.Objetivo_Predefinido[index];
        const pos = minimumIntensitiesNombres.indexOf(item.Nombre);
        if (pos !== -1) {
          this.loadedPrototypes.Objetivo_Predefinido[index].Intensidades_minimas = minimumIntensities[pos].Intensidades_minimas;
        } else {
          this.loadedPrototypes.Objetivo_Predefinido[index].Intensidades_minimas = 0;
        }
      }
    } catch (error) {
      console.error("Error on mounted:", error);
    }
  },
  methods: {
    goToApplicationMode() {
      if (this.pageMode === "application") {
        this.pageMode = undefined;
        return;
      }
      this.pageMode = "application";
    },

    goToDataMode() {
      if (this.pageMode === "data") {
        this.pageMode = undefined;
        return;
      }
      this.pageMode = "data";
    },

    goToLanguageMode() {
      if (this.pageMode === "language") {
        this.pageMode = undefined;
        return;
      }
      this.pageMode = "language";
    },
    decreaseIntensidadesMinimas(indexObjetivo) {
      this.loadedPrototypes.Objetivo_Predefinido[indexObjetivo].Intensidades_minimas--;
      return this.root.$api.setMinimumDailyGoalIntensities({ Datos: this.declone(this.loadedPrototypes.Objetivo_Predefinido) });
    },
    increaseIntensidadesMinimas(indexObjetivo) {
      this.loadedPrototypes.Objetivo_Predefinido[indexObjetivo].Intensidades_minimas++;
      return this.root.$api.setMinimumDailyGoalIntensities({ Datos: this.declone(this.loadedPrototypes.Objetivo_Predefinido) });
    },
    declone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/css/app.scss";

.page-subtitle {
  text-align: right;
  font-size: 14px;
  padding-top: 15px;
  padding-bottom: 5px;
  font-weight: bold;
}
.as-section {
  border-top: 1px solid $color_grey_4;
  padding-top: 15px;
  padding-bottom: 25px;
}
</style>