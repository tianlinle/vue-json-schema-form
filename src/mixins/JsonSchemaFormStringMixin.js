export default {
  props: {
    schema: Object,
    value: {}
  },
  watch: {
    valueCopy() {
      if (this.valueCopy === '') {
        this.valueCopy = undefined;
      }
      this.$emit('input', this.valueCopy);
    }
  },
  data() {
    return {
      valueCopy: this.value
    }
  }
}