<template>
  <div>
    <div v-if="schema.type !== 'boolean'" class="d-flex py-2">
      <span class="mr-auto">{{schema.title}}</span>
      <span v-if="index >= 0" class="btn btn-link py-0" @click="$parent.up(index)">上移</span>
      <span v-if="index >= 0" class="btn btn-link py-0" @click="$parent.down(index)">下移</span>
      <span v-if="schema.type === 'array' && !isMultipleCheckbox()" class="btn btn-link py-0" @click="add">新增</span>
      <span v-if="index >= 0" class="btn btn-link text-danger py-0" @click="$parent.remove(index)">删除</span>
    </div>
    <div v-if="schema.type === 'object'" class="border-top">
      <json-schema-form-type class="ml-5" v-for="(p, k) in schema.properties" :key="k" :schema="p" :value="valueCopy[k]" @input="valueCopy[k] = $event; $emit('input', valueCopy)"/>
    </div>
    <template v-else-if="schema.type === 'array'">
      <template v-if="isMultipleCheckbox()">
        <div v-for="(a, i) in schema.items.anyOf" :key="i" class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" :value="a.const" :checked="valueCopy.indexOf(a.const) !== -1" @input="onMultipleCheckboxChanged">
          <label class="form-check-label">{{a.title}}</label>
        </div>
      </template>
      <div v-else class="border-top">
        <json-schema-form-type class="ml-5" v-for="(v, i) in valueCopy" :key="i + ':' + JSON.stringify(v)" :schema="schema.items" :value="v" @input="valueCopy[i] = $event; $emit('input', valueCopy)" :index="i"/>
      </div>
    </template>
    <div v-else-if="schema.type === 'boolean'" class="form-check py-2 mt-2">
      <input type="checkbox" class="form-check-input" :value="valueCopy" @input="valueCopy = $event.target.checked; $emit('input', valueCopy)">
      <span class="form-check-label">{{schema.title}}</span>
    </div>
    <div v-else>
      <select v-if="schema.anyOf" v-model="valueCopy" class="form-control" @change="onInput">
        <option :value="undefined">请选择</option>
        <option v-for="(a, i) in schema.anyOf" :key="i" :value="a.const">{{a.title}}</option>
      </select>
      <input v-else :type="inputType" class="form-control" :value="valueCopy" @input="onInput">
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonSchemaFormType",
  props: {
    schema: Object,
    index: {},
    value: {
      default: function() {
        if (this.schema.default) {
          this.$emit("input", this.schema.default);
          return this.schema.default;
        }
        switch (this.schema.type) {
          case "object":
            return {};
          case "array":
            return [];
          default:
            return undefined;
        }
      }
    }
  },
  computed: {
    inputType() {
      switch (this.schema.type) {
        case "number":
        case "integer":
          return "number";
        case "date":
          return "date";
        case "date-time":
          return "datetime-local";
        default:
          return "text";
      }
    }
  },
  data() {
    return {
      valueCopy: this.value && JSON.parse(JSON.stringify(this.value))
    };
  },
  components: {
    InputLabel: () => import("./InputLabel.vue"),
    JsonSchemaFormObject: () => import("./JsonSchemaFormObject.vue"),
    JsonSchemaFormInput: () => import("./JsonSchemaFormInput.vue"),
    JsonSchemaFormArray: () => import("./JsonSchemaFormArray.vue")
  },
  methods: {
    onInput(event) {
      this.valueCopy = event.target.value;
      if (this.valueCopy === "") {
        this.valueCopy = undefined;
      } else {
        if (this.inputType === "number" || this.inputType === "integer") {
          if (isFinite(this.valueCopy)) {
            this.valueCopy = Number.parseFloat(this.valueCopy);
          }
        }
      }
      this.$emit("input", this.valueCopy);
    },
    isMultipleCheckbox() {
      return (
        this.schema.items.anyOf &&
        ["string", "number", "integer", "boolean"].indexOf(
          this.schema.items.type
        ) > -1
      );
    },
    onMultipleCheckboxChanged(event) {
      if (event.target.checked) {
        this.valueCopy.push(event.target.value);
      } else {
        this.valueCopy.splice(this.valueCopy.indexOf(event.target.value), 1);
      }
      const tmp = [];
      for (const item of this.schema.items.anyOf) {
        if (this.valueCopy.indexOf(item.const) > -1) {
          tmp.push(item.const);
        }
      }
      this.valueCopy = tmp;
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
};
</script>
