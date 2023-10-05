<template>
  <v-container fluid>
    <v-card>
      <v-row row>
        <v-col class="fw-150">
          <cards
            v-model="internalValue"
            :areaId="areaId"
            :cards="cards"
            :label="label"
            @moveCard="moveCard"
          />
        </v-col>
        <v-col class="fw-100" v-if="dispFilterBtn">
          <btns :btns="filterBtns" @clickAct="filterAct" />
        </v-col>
        <v-col class="fw-75" v-if="dispActBtn">
          <btns :btns="btns" @clickAct="clickAct" />
          <v-btn v-if="shuffleBtn" x-small color="info" outlined @click="shuffle">shuffle</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Btns from "@/components/colb/colbMst/test/testbtn";
import Cards from "@/components/colb/colbMst/test/testlist";
const { ACT } = require("@/components/colb/colbMst/test/testConst");

export default {
  name: "",
  model: {
    prop: "inputValue",
    event: "change"
  },
  props: {
    inputValue: null,
    area: { type: Object, default: () => {} }
  },
  data() {
    return {
      dispCardType: "",
      dispCardCnt: 1
    };
  },
  methods: {
    clickAct(act = "", cond = {}) {
      this.$emit("btnAct", act, cond);
    },
    moveCard(cond = {}) {
      this.$emit("btnAct", ACT.MOVE, cond);
    },
    // filterAct(act, cond) {
    //   const { cnt, type } = cond;
    //   if (cnt) this.filter.cnt = cnt;
    //   if (type) this.filter.type = type;
    // },
    shuffle() {
      const cloneArray = [...this.cards];
      for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        let tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
      }
      this.$set(this, "cards", cloneArray);
    }
  },
  computed: {
    internalValue: {
      get() {
        const isEmpty =
          !this.inputValue &&
          (this.inputValue !== 0 || this.inputValue !== "0");
        return isEmpty ? [] : this.inputValue;
      },
      set(value) {
        this.$emit("change", value);
      }
    },
    areaId() {
      return this.area.id ? this.area.id : "";
    },
    label() {
      return this.area.name ? this.area.name : "";
    },
    cards() {
      return this.area.cards ? this.area.cards : [];
    },
    btns() {
      return this.area.btns ? this.area.btns : [];
    },
    filterBtns() {
      return this.area.filterBtns ? this.area.filterBtns : [];
    },
    shuffleBtn() {
      return this.area.shuffle ? this.area.shuffle : false;
    },
    dispFilterBtn() {
      const show =
        this.filterBtns && this.filterBtns.length && this.filterBtns.length > 0;
      return show;
    },
    dispActBtn() {
      const show = this.btns && this.btns.length && this.btns.length > 0;
      return show;
    }
  },
  watch: {},
  created() {},
  components: {
    Btns,
    Cards
  }
};
</script>
<style scoped>
</style>
