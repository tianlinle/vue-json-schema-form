<template>
  <component :is="decideComponent()" :value="value" @input="$emit('input', $event)" :schema="schema"/>
</template>

<script>
import JsonSchemaFormEmptyString from "./JsonSchemaFormEmptyString.vue";
import JsonSchemaFormObject from "./JsonSchemaFormObject.vue";
import JsonSchemaFormArray from "./JsonSchemaFormArray.vue";
import JsonSchemaFormCheckbox from "./JsonSchemaFormCheckbox.vue";
import JsonSchemaFormSelect from "./JsonSchemaFormSelect.vue";
import JsonSchemaFormTextarea from "./JsonSchemaFormTextarea.vue";
import JsonSchemaFormNumber from "./JsonSchemaFormNumber.vue";
import JsonSchemaFormBoolean from "./JsonSchemaFormBoolean.vue";

export default {
  components: {
    JsonSchemaFormEmptyString,
    JsonSchemaFormObject,
    JsonSchemaFormArray,
    JsonSchemaFormCheckbox,
    JsonSchemaFormSelect,
    JsonSchemaFormTextarea,
    JsonSchemaFormNumber,
    JsonSchemaFormBoolean
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {}
  },
  methods: {
    setComponent(type, component) {
      this.components[type] = component;
    },
    decideComponent() {
      if (this.schema.form && this.schema.form.component) {
        return this.schema.form.component;
      }
      switch (this.schema.type) {
        case "object":
          return "JsonSchemaFormObject";
        case "array":
          if (
            this.schema.items.anyOf &&
            ["string", "number", "integer", "boolean"].indexOf(
              this.schema.items.type
            ) > -1
          ) {
            return "JsonSchemaFormCheckbox";
          }
          return "JsonSchemaFormArray";
        case "boolean":
          return "JsonSchemaFormBoolean";
        case "number":
        case "integer":
          return "JsonSchemaFormNumber";
        default:
          if (this.schema.anyOf) {
            return "JsonSchemaFormSelect";
          }
          return "JsonSchemaFormEmptyString";
      }
    }
  }
};
</script>
