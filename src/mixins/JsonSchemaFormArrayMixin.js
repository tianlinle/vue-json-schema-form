export default {
  props: {
    schema: Object,
    value: Array
  },
  data() {
    let valueCopy;
    if (!this.value) {
      if (this.schema.default) {
        valueCopy = JSON.parse(JSON.stringify(this.schema.default));
      } else {
        valueCopy = [];
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
    onInput(i, newValue) {
      this.valueCopy[i] = newValue;
      this.$emit("input", this.valueCopy);
    },
    add() {
      switch (this.schema.items.type) {
        case "object":
          this.valueCopy.push({});
          break;
        case "array":
          this.valueCopy.push([]);
          break;
        default:
          this.valueCopy.push(undefined);
      }
      this.$emit("input", this.valueCopy);
    },
    remove(index) {
      this.valueCopy.splice(index, 1);
      this.$emit("input", this.valueCopy);
    },
    up(index) {
      if (index > 0) {
        this.valueCopy[index] = this.valueCopy.splice(
          index - 1,
          1,
          this.valueCopy[index]
        )[0];
        this.$emit("input", this.valueCopy);
      }
    },
    down(index) {
      if (index < this.valueCopy.length - 1) {
        this.valueCopy[index] = this.valueCopy.splice(
          index + 1,
          1,
          this.valueCopy[index]
        )[0];
        this.$emit("input", this.valueCopy);
      }
    }
  }
}