<template>
  <v-dialog v-model="internalValue" persistent scrollable max-width="600">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>info</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pa-2">
        <v-container fluid>
          <v-card>
            <v-row no-gutters>
              <v-col>
                <span>test</span>
              </v-col>
              <v-col>
                <span>{{ card.name }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn color="primary" text @click="close">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
// import RadioButton from "@/components/common/form/RadioButton";

export default {
  name: "",
  props: {
    value: Boolean,
    selectedCard: {
      type: Object,
      default: () => {}
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      dialog: this.value
    };
  },
  methods: {
    close() {
      this.internalValue = false;
    }
  },
  computed: {
    internalValue: {
      set(val) {
        this.dialog = val;
        this.$emit("change", val);
      },
      get() {
        return this.dialog;
      }
    }
  },
  watch: {
    value(val) {
      if (!val) this.cleanForm();
    }
  },
  created() {},
  components() {}
};
</script>
<style scoped>
</style>
