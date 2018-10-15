<template>
  <div>
    <div class="py-2 border-bottom d-flex">
      <span v-if="schema.title">{{schema.title}}</span>
      <span class="btn btn-link py-0 px-2" @click="add">新增</span>
    </div>
    <div class="ml-5">
      <div v-for="(v, i) in valueCopy" :key="i + ':' + JSON.stringify(v)" class="d-flex position-relative">
        <div class="py-2 text-center position-absolute" style="top: 0; right: 0">
          <span class="btn btn-link py-0 px-2" @click="up(i)">上移</span>
          <span class="btn btn-link py-0 px-2" @click="down(i)">下移</span>
          <span class="btn btn-link py-0 px-2 text-danger" @click="remove(i)">删除</span>
        </div>
        <json-schema-form :schema="schema.items" :value="v" @input="onInput(i, $event)" class="flex-fill"/>
      </div>
    </div>
  </div>
</template>

<script>
import JsonSchemaForm from "./JsonSchemaForm.vue";
import JsonSchemaFormArrayMixin from "../mixins/JsonSchemaFormArrayMixin";

export default {
  components: { JsonSchemaForm },
  mixins: [JsonSchemaFormArrayMixin]
};
</script>
