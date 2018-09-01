<template>
    <div class="search">
        <input v-model="userInput" class="search__input">
    </div>
</template>

<style lang="scss" scoped>
.search__input {
  display: block;
  border-radius: 5px;
  border: 1px solid #999;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  font-size: 18px;
}
</style>

<script lang="ts">
import Vue from 'vue';

interface PageConfig {
    title: string,
    path: string,
    type?: string,
    badgeColor?: string,
    description?: string
}


export default Vue.extend({
  model: {
    prop: 'value',
    event: 'filter',
  },
  props: {
    pages: {
      type: Array as () => PageConfig[],
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      userInput: '',
    };
  },
  watch: {
    userInput(input: string): void {
      const result: PageConfig[] = this.pages.filter((pageConfig: PageConfig) => pageConfig.title.indexOf(input) !== -1);
      this.$emit('filter', result);
    },
  },
});
</script>

