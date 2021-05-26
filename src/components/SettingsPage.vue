<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td class="width-100-x100 text-align-left page-title">Settings</td>
        </tr>
      </tbody>
    </table>
    <div class="language-section">
      <div class="page-subtitle">Application</div>
    </div>
    <div class="language-section">
      <div class="page-subtitle">Import or export data</div>
    </div>
    <div class="language-section">
      <div class="page-subtitle">Language</div>
    </div>
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
    return {};
  },
  methods: {},
  watch: {},
};
</script>

<style>
</style>