export const areaModel = {
  id: "",
  name: "",
  selected: [],
  cards: [],
  btns: [],
  filterBtns: [],
  shuffle: false,
};

export const cardModel = {
  id: "",
  name: "",
  type: "",
};

export const ACT = {
  MOVE: "moveCard",
  DRAW: "draw",
  DTL: "showDetail",
};

export const AREA = {
  HAND: "hand",
  DECK: "deck",
  TRSH: "trush",
  SIDE: "side",
  BTTL: "bttl",
  BNCH: "bench",
  LOST: "lost",
};

export const TYPE = {
  POKE: "p",
  ENE: "e",
  TRIN: "t",
  GDS: "g",
  ITEM: "d",
  SPRT: "s",
  STDM: "f",
};

export const BTNS = {
  DECK: [
    {
      name: "Hand",
      act: ACT.MOVE,
      cond: { from: AREA.DECK, to: AREA.HAND },
    },
  ],
  HAND: [
    {
      name: "Deck",
      act: ACT.MOVE,
      cond: { from: AREA.HAND, to: AREA.DECK },
    },
  ],
};

export const BTNS_FLTR = {
  DECK: [
    { name: "top", cond: { cnt: 1 } },
    { name: "top7", cond: { cnt: 7 } },
    { name: "pok", cond: { cnt: 60, type: TYPE.POKE } },
    { name: "ene", cond: { cnt: 60, type: TYPE.ENE } },
  ],
  HAND: [],
};

export const BTNS_SHFL = {
  DECK: true,
  HAND: false,
};

export const clist = [
  { name: "kggk", type: "p", cnt: 1 },
  { name: "gkuni1", type: "p", cnt: 2 },
  { name: "gkuni2", type: "p", cnt: 2 },
  { name: "gkuni3", type: "p", cnt: 2 },
  { name: "gkuni4", type: "p", cnt: 2 },
  { name: "neo", type: "p", cnt: 3 },
  { name: "ikr", type: "p", cnt: 2 },
  { name: "palv", type: "p", cnt: 3 },
  { name: "palvs", type: "p", cnt: 3 },
  { name: "me", type: "e", cnt: 10 },
  { name: "hks", type: "s", cnt: 4 },
  { name: "ki", type: "s", cnt: 2 },
  { name: "bss", type: "s", cnt: 2 },
  { name: "mln", type: "s", cnt: 2 },
  { name: "pkst", type: "f", cnt: 2 },
  { name: "shoes", type: "g", cnt: 4 },
  { name: "eten", type: "g", cnt: 1 },
  { name: "tch", type: "g", cnt: 1 },
  { name: "rod", type: "g", cnt: 1 },
  { name: "cln", type: "g", cnt: 1 },
  { name: "sekais", type: "g", cnt: 4 },
  { name: "hyp", type: "g", cnt: 4 },
  { name: "change", type: "g", cnt: 2 },
];
