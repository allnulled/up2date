<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td class="width-100-x100 text-align-left page-title">Home</td>
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
    <div>
      <div class="form-label">Today analysis:</div>
      <ul id="home-list-1" v-if="todayAnalysis_1">
        <li
          v-for="(goal, goalIndex) in todayAnalysis_1"
          v-bind:key="goalIndex"
          class="text-align-left"
        >
          <b>{{ goal.diff > 0 ? "+" : "" }}{{ goal.diff }}: </b>
          <b>{{ goal.name }}</b> needs <b>{{ goal.min }}</b> and has
          <b>{{ goal.curr }}</b
          >.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadedDailyMinimums: undefined,
      loadedTodayGoals: undefined,
      todayAnalysis_1: undefined,
    };
  },
  async beforeMount() {
    try {
      window.hm = this;
      await this.loadDailyMinimums();
      await this.loadTodayGoals();
      await this.analizeToday();
    } catch (error) {
      console.error("Error on beforeMount:", error);
    }
  },
  methods: {
    goToQuestion() {
      console.log("Q");
    },
    async loadDailyMinimums() {
      try {
        const intensities = await this.root.$api.getMinimumDailyGoalIntensities();
        this.loadedDailyMinimums = intensities[0].Datos;
      } catch (error) {
        console.error("Error on loadDailyMinimums:", error);
      }
    },
    async loadTodayGoals() {
      try {
        const goals = await this.root.$api.getTodayGoals();
        this.loadedTodayGoals = goals;
      } catch (error) {
        console.error("Error on loadTodayGoals:", error);
      }
    },
    async analizeToday() {
      try {
        const goalsAchieved = this.loadedTodayGoals;
        const dailyMinimums = this.loadedDailyMinimums;
        const minimumsCounter = {};
        for (let indexMins = 0; indexMins < dailyMinimums.length; indexMins++) {
          const dailyMin = dailyMinimums[indexMins];
          minimumsCounter[dailyMin.Nombre] = {
            min: dailyMin.Intensidades_minimas,
            curr: 0,
            diff: 0,
          };
        }
        for (
          let indexAchis = 0;
          indexAchis < goalsAchieved.length;
          indexAchis++
        ) {
          const goalAchieved = goalsAchieved[indexAchis];
          const name = goalAchieved.Nombre.replace(/ \[[^\]]+\]/g, "");
          if (name in minimumsCounter) {
            minimumsCounter[name].curr +=
              goalAchieved.Intensidad;
            minimumsCounter[name].diff =
              minimumsCounter[name].curr -
              minimumsCounter[name].min;
          }
        }
        const analysis = Object.keys(minimumsCounter)
          .map((n) => {
            return {
              name: n,
              ...minimumsCounter[n],
              diff: minimumsCounter[n].curr - minimumsCounter[n].min,
            };
          })
          .sort((n1, n2) => {
            const a = minimumsCounter[n1.name];
            const b = minimumsCounter[n2.name];
            return b.diff < a.diff ? 1 : -1;
          });
        console.log(
          "goalsAchieved, dailyMinimums, minimumsCounter, analysis",
          goalsAchieved,
          dailyMinimums,
          minimumsCounter,
          analysis
        );
        this.todayAnalysis_1 = analysis;
      } catch (error) {
        console.error("Error on loadTodayGoals:", error);
      }
    },
  },
  watch: {},
};
</script>

<style>
#home-list-1 {
  padding-top: 20px;
}
#home-list-1 > li {
  padding: 5px;
  padding-top: 15px;
  border-bottom: 1px solid #e0e0e0;
}
</style>