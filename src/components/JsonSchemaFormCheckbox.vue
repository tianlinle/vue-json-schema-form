<template>
  <div>
    <div class="py-2">{{schema.title}}</div>
    <div>
      <div v-for="(a, i) in schema.items.anyOf" :key="i" class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" :value="a.const" v-model="valueCopy">
        <label class="form-check-label">{{a.title}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import JsonSchemaFormArrayMixin from "../mixins/JsonSchemaFormArrayMixin";

export default {
  mixins: [JsonSchemaFormArrayMixin],
  watch: {
    valueCopy() {
      this.$emit("input", this.valueCopy);
    }
  }
};
</script>
