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
  </div>
</template>

<script>

export default {
    name: "HomePage",
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
      goToQuestion() {
        console.log("Q")
      },
    },
    watch: {}
};

</script>

<style>

</style>