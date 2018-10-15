<template>
  <div>
    <div class="py-2">
      <span>{{schema.title}}</span>
    </div>
    <input type="string" class="form-control" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    value: {}
  }
};
</script>
