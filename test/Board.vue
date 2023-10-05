<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-btn color="info" outlined @click="init">init</v-btn>
          <v-btn color="info" outlined @click="draw()">draw</v-btn>
        </v-row>
        <v-row row wrap>
          <div v-for="(area, i) in areas" :key="i">
            <v-col class="fw-200">
              <area-set
                v-model="area.selected"
                :area="area"
                :label="area.name"
                :cards="area.cards"
                :btns="area.btns"
                :filterBtns="area.filterBtns"
                :shuffle="area.shuffle"
                @btnAct="btnsAct"
              />
            </v-col>
            <v-spacer v-if="i < areas.length" class="fw-50" />
          </div>
        </v-row>
        <v-row class="mt-3" row wrap>
          <v-col class="fw-100">
            <div>
              <v-btn color="info" small outlined @click="coinToss">coin</v-btn>
              {{coin}}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AreaSet from "@/components/colb/colbMst/test/Area";
const {
  ACT,
  AREA,
  BTNS,
  BTNS_FLTR,
  BTNS_SHFL,
  areaModel,
  clist
} = require("@/components/colb/colbMst/test/testConst");

export default {
  name: "",
  model: {},
  props: {},
  mixins: [],
  data() {
    return {
      selectId: "",
      coin: 0,
      cardList: [],
      areas: []
    };
  },
  methods: {
    btnsAct(actName = "", cond = {}) {
      const drawAct = [ACT.DRAW];
      const moveAct = [ACT.MOVE];
      if (drawAct.includes(actName)) {
        const { from, to, detail } = cond;
        this[actName](from, to, detail);
      } else if (moveAct.includes(actName)) {
        const { from, to, fromCardIdx, toCardIdx } = cond;
        this[actName](from, to, fromCardIdx, toCardIdx);
      }
    },
    coinToss() {
      const yn = Math.floor(Math.random() * 2);
      this.$set(this, "coin", yn);
    },
    draw(from = AREA.DECK, to = AREA.HAND, n = 1) {
      let fromCards = this.getAreaCards(from);
      let toCards = this.getAreaCards(to);
      for (let i = 0; i < n; i++) {
        const row = fromCards[i];
        toCards.push(row);
        fromCards.splice(i, 1);
      }
      this.setAreaCards(from, fromCards);
      this.setAreaCards(to, toCards);
    },
    moveCard(from = AREA.DECK, to = AREA.HAND, fromCardIdx = 0, toCardIdx = 0) {
      let fromCards = this.getAreaCards(from);
      const moveCard = fromCards[fromCardIdx];
      console.debug("move", from, to, fromCardIdx, moveCard);
      if (!moveCard) return; // not found
      let toCards = this.getAreaCards(to);
      fromCards.splice(fromCardIdx, 1);
      toCards.splice(toCardIdx, 0, moveCard);
      console.debug("movaFrom", from, fromCards);
      console.debug("movaTo", to, toCards);
      this.setAreaCards(from, fromCards);
      this.setAreaCards(to, toCards);
    },
    loadClist() {
      this.cardList = [];
      let id = 1;
      for (let i = 0; i < clist.length; i++) {
        const { name, type, cnt } = clist[i];
        let item = { name: name, type: type };
        for (let i = 0; i < cnt; i++) {
          item = { id: id, ...item };
          this.cardList.push(item);
          id++;
        }
      }
    },
    getAreaCards(id) {
      const i = this.areas.findIndex(e => e.id === id);
      let tmpArea = { ...this.areas[i] };
      return tmpArea.cards ? tmpArea.cards : [];
    },
    setAreaCards(id, cards) {
      const i = this.areas.findIndex(e => e.id === id);
      if (i < 0) return; // not found
      let tmpArea = { ...this.areas[i] };
      tmpArea.cards = cards;
      const tmp = [...this.areas];
      tmp.splice(i, 1, tmpArea);
      this.$set(this, "areas", tmp);
    },
    createArea() {
      const list = ["DECK", "HAND", "BTTL"];
      this.areas = [];
      const areas = [];
      list.forEach(e => {
        let area = {
          ...areaModel
        };
        area = {
          id: AREA[e],
          name: AREA[e],
          btns: BTNS[e],
          filterBtns: BTNS_FLTR[e],
          shuffle: BTNS_SHFL[e]
        };
        areas.push(area);
      });
      this.$set(this, "areas", areas);
    },
    setDeck() {
      const cloneArray = [...this.cardList];
      // shuffle
      for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        let tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
      }
      this.setAreaCards(AREA.DECK, cloneArray);
    },
    init() {
      this.loadClist();
      this.createArea();
      this.setDeck();
      this.draw(AREA.DECK, AREA.HAND, 7);
    }
  },
  computed: {},
  watch: {
    "this.areas": {
      deep: true
    }
  },
  created() {
    this.init();
  },
  components: { AreaSet }
};
</script>
<style scoped>
</style>
