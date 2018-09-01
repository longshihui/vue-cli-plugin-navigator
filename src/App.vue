<template>
  <div id="app">
    <h1>
      Vue pages Navigator
    </h1>
    <search :pages="pages" v-model="filterPages"/>
    <table class="pages-table">
      <thead>
        <th>页面</th>
      </thead>
      <tbody>
        <tr v-for="config of visiblePages" :key="config.title">
          <td>
            <a :href="config.path">{{config.title}}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <footer>
      @ create by vue-cli-plugin-navigator
    </footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import Search from './components/seach.vue';
// @ts-ignore
const configs: PageConfig[] = JSON.parse(window.configs);

export default Vue.extend({
  name: 'app',
  components: {
    Search,
  },
  data() {
    return {
      pages: configs,
      filterPages: []
    };
  },
  computed: {
      visiblePages(): PageConfig[] {
          return this.filterPages.length === 0 ? this.pages : this.filterPages;
      }
  },
});
</script>

<style lang="scss">
#app {
  font-family: sans-serif;
  box-sizing: border-box;
  text-align: center;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
  min-width: 700px;
  max-width: 1200px;
}

h1 {
  margin: 60px auto;
}

footer {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}

table {
  width: 100%;
  td, th {
    line-height: 40px;
  }
}
</style>
