<template>
  <div class="form-check py-2 mt-2">
    <input type="checkbox" class="form-check-input" v-model="valueCopy">
    <span class="form-check-label">{{schema.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    value: {}
  },
  watch: {
    valueCopy() {
      this.$emit("input", this.valueCopy);
    }
  },
  data() {
    return {
      valueCopy: this.value
    };
  }
};
</script>
