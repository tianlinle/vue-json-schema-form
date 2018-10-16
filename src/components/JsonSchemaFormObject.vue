<template>
  <div>
    <div v-if="schema.title" class="py-2 border-bottom">{{schema.title}}</div>
    <div>
      <json-schema-form v-for="(p, k) in schema.properties" :key="k" :schema="p" :value="valueCopy[k]" @input="onInput(k, $event)"/>
    </div>
  </div>
</template>

<script>
export default {
  components: { JsonSchemaForm: () => import("./JsonSchemaForm.vue") },
  props: {
    schema: Object,
    value: {}
  },
  data() {
    let valueCopy = {};
    if (!this.value) {
      if (this.schema.default) {
        valueCopy = JSON.parse(JSON.stringify(this.schema.default));
      } else {
        valueCopy = {};
      }
      this.$emit("input", valueCopy);
    } else {
      valueCopy = JSON.parse(JSON.stringify(this.value));
    }
    return {
      valueCopy
    };
  },
  methods: {
    onInput(key, newValue) {
      this.valueCopy[key] = newValue;
      this.$emit("input", this.valueCopy);
    }
  }
};
</script>
