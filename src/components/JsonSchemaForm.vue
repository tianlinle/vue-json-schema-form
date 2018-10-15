<template>
  <component :is="decideComponent()" :value="value" @input="$emit('input', $event)" :schema="schema"/>
</template>

<script>
export default {
  components: {
    JsonSchemaFormEmptyString: () => import("./JsonSchemaFormEmptyString.vue"),
    JsonSchemaFormObject: () => import("./JsonSchemaFormObject.vue"),
    JsonSchemaFormArray: () => import("./JsonSchemaFormArray.vue"),
    JsonSchemaFormCheckbox: () => import("./JsonSchemaFormCheckbox.vue"),
    JsonSchemaFormSelect: () => import("./JsonSchemaFormSelect.vue"),
    JsonSchemaFormTextarea: () => import("./JsonSchemaFormTextarea.vue"),
    JsonSchemaFormNumber: () => import("./JsonSchemaFormNumber.vue"),
    JsonSchemaFormBoolean: () => import("./JsonSchemaFormBoolean.vue")
  },
  props: {
    schema: Object,
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
