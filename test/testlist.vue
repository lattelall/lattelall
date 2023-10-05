<template>
  <v-container fluid>
    <v-row>
      <span>{{label}}</span>
      <v-spacer />
      <span>{{ cardList.length }}枚</span>
    </v-row>
    <draggable v-model="cards">
      <v-list>
        <v-list-item
          v-for="(card, i) in cardList"
          :key="i"
          dense
          outlined
          draggable
          @dragstart="dragStart($event, i, card.id)"
          @drop="drop($event, i, card.id)"
          @dragover.prevent
          @dragenter.prevent
        >
          <span>{{ card.name }}</span>
        </v-list-item>
      </v-list>
    </draggable>
  </v-container>
</template>

<script>
const DRAG_IDX = "drag-idx";
const DRAG_ID = "drag-id";
const DRAG_AREA = "drag-area";
export default {
  name: "",
  model: {
    prop: "inputValue",
    event: "change"
  },
  props: {
    areaId: {
      type: String,
      default: ""
    },
    cards: [],
    inputValue: null,
    label: {
      type: String,
      default: ""
    },
    filter: {}
  },
  data() {
    return {};
  },
  methods: {
    dragStart(event, idx, id) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData(DRAG_IDX, idx);
      event.dataTransfer.setData(DRAG_ID, id);
      event.dataTransfer.setData(DRAG_AREA, this.areaId);
    },
    drop(event, idx) {
      // const dragId = event.dataTransfer.getData(DRAG_ID);
      const dragIdx = event.dataTransfer.getData(DRAG_IDX);
      const dragAreaId = event.dataTransfer.getData(DRAG_AREA);
      const cond = {
        from: dragAreaId,
        to: this.areaId,
        fromCardIdx: dragIdx,
        toCardIdx: idx
      };
      this.$emit("moveCard", cond);
    },
    deleteCard(id) {
      const idx = this.cards.findIndex(e => e.id === id);
      this.card.splice(idx, 1);
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
      set(val) {
        this.$emit("change", val);
      }
    },
    cardList: {
      get() {
        const hasList = this.cards && this.cards.length;
        return hasList ? this.cards : [];
      },
      set(val) {
        this.cards = val;
      },
      deep: true
    },
    filteredCards() {
      const { cnt, type } = this.filter;
      if (!cnt && !type) return this.cards;
      let disp = this.cards;
      if (type) disp = this.cards.slice.filter(card => card.type === type);
      const count = Math.min(disp.length, cnt);
      if (!type) return disp.slice(0, count);
      return disp;
    },
    selectedCard() {
      return "";
    }
  },
  watch: {},
  created() {},
  component() {}
};
</script>
<style scoped>
</style>
