<template>
  <div>
    <div class="py-2">
      <span>{{schema.title}}</span>
    </div>
    <input type="string" class="form-control" v-model="valueCopy">
  </div>
</template>

<script>
import JsonSchemaFormStringMixin from "../mixins/JsonSchemaFormStringMixin";

export default {
  mixins: [JsonSchemaFormStringMixin]
};
</script>
