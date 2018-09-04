<template>
  <div id="app">
    <section class="section">
      <div id="logo"></div>
    </section>
   <section class="section">
     <h1 class="h1">
       Vue Pages Navigator
     </h1>
   </section>
    <section class="section">
      <v-input v-model="userInput" placeholder="search your page title..." center/>
    </section>
   <section class="section">
     <v-table :data="filterPages" @row-click="rowClickHandler">
       <v-table-col label="title" prop="title" />
       <v-table-col label="type" prop="type" default="none" />
       <v-table-col label="description" prop="description" default="none" />
     </v-table>
   </section>
   <section class="section">
      Note: click any table row will open the page
   </section>
    <footer class="footer">
      @ create by vue-cli-plugin-navigator
    </footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import VInput from './components/v-input';
import { VTable, VTableCol } from './components/v-table';
import getConfig from '../utils/getConfig';

export default Vue.extend({
  name: 'app',
  components: {
    VInput,
    VTable,
    VTableCol
  },
  data() {
    return {
      userInput: '',
      pages: getConfig(),
    };
  },
  computed: {
      filterPages(): PageConfig[] {
          return this.pages.filter((config: PageConfig) => {
              return new RegExp(this.userInput, 'ig').test(config.title);
          });
      }
  },
    methods: {
        rowClickHandler(row: PageConfig) {
            location.href = row.path;
        }
    },
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: sans-serif;
  box-sizing: border-box;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
  min-width: 700px;
  max-width: 1024px;
}

.section {
  margin: 20px 0;
}

.h1 {
  text-align: center;
}

#logo {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  background: url("~@/assets/logo.png");
  background-size: cover;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}

.link {
    color: #e83030;
    text-decoration: none;
}
</style>
