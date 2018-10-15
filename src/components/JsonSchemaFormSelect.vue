<template>
  <div>
    <div class="py-2">{{schema.title}}</div>
    <select v-model="valueCopy" class="form-control" @change="$emit('input', valueCopy)">
      <option :value="undefined"></option>
      <option v-for="(a, i) in schema.anyOf" :key="i" :value="a.const">{{a.title}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    value: {}
  },
  data() {
    return {
      valueCopy: this.value
    };
  }
};
</script>
