<template lang="html">
  <select class="form-control" name="{{ options.name }}">
    <option value="{{option.value}}" v-for="option in options.values">{{option.text}}</option>
  </select>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {},
    components: {},
    props: {
      options: {
        type: Object
      }
    }
  };
</script>

<style lang="css">
</style>
