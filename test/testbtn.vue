<template>
  <v-container fluid>
    <div v-for="btn in btns" :key="btn.name">
      <v-btn x-small color="info" outlined @click="btnAct(btn.act, btn.cond)">{{btn.name}}</v-btn>
    </div>
  </v-container>
</template>

<script>
// import TextField from "@/components/common/form/TextField";

export default {
  name: "",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    title: [],
    btns: [],
    cards: []
  },
  data() {
    return {};
  },
  methods: {
    btnAct(act = "", cond = {}) {
      this.$emit("clickAct", act, cond);
    }
  },
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped>
</style>
