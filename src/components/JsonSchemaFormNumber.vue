<template>
  <div>
    <div class="py-2">
      <span>{{schema.title}}</span>
    </div>
    <input type="number" class="form-control" v-model.number="valueCopy">
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
      if (this.schema.type === "integer") {
        this.valueCopy = Number.parseInt(this.valueCopy);
      } else {
        this.valueCopy = Number.parseFloat(this.valueCopy);
      }
      if (Number.isNaN(this.valueCopy)) {
        this.valueCopy = undefined;
      }
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
