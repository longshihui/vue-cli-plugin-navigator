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
      <v-input v-model="userInput" placeholder="Search for the page you want to open..." center/>
    </section>
   <section class="section">
     <v-table :data="filterPages" @row-click="rowClickHandler">
       <v-table-col label="Title" prop="title" />
       <v-table-col label="Tags" prop="type" default="none" />
       <v-table-col label="More information" default="none">
           <template slot-scope="props">
               <a class="link" href="javascript:;" @click.stop="open(props.row.description)">more...</a>
           </template>
       </v-table-col>
     </v-table>
   </section>
   <section class="section">
       Tip: Clicking on any row in the table will open the page.
   </section>
    <footer class="footer">
      @ create by vue-cli-plugin-navigator
    </footer>
      <v-dialog title="Information" :visible.sync="showDetail">
          <template slot="body">
              {{detailContent}}
          </template>
          <v-button type="dark" value="close" slot="footer" @click="showDetail = false"/>
      </v-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import VInput from '../ui/input';
import { VTable, VTableCol } from '../ui/table';
import VDialog from '../ui/dialog';
import VButton from '../ui/button';
import getConfig from '../utils/getConfig';

export default Vue.extend({
  name: 'app',
  components: {
    VInput,
    VTable,
    VTableCol,
    VDialog,
    VButton
  },
  data() {
    return {
      userInput: '',
      pages: getConfig(),
      showDetail: false,
      detailContent: ''
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
    },
    open(content: string) {
      this.detailContent = content;
      this.showDetail = true;
    }
  }
});
</script>

<style lang="scss">
@import '~@/assets/color';
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  position: relative;
  font-family: sans-serif;
  box-sizing: border-box;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  padding: 1px 10px 42px;
  min-width: 320px; // 移动端最小屏幕
  max-width: 1200px; // 最大尺寸
  min-height: 100%;
  -webkit-overflow-scrolling: touch;
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
  background: url('../assets/logo.png');
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
  color: $bright;
  text-decoration: none;
}

.v-table__row:hover {
  .link {
    color: #ffffff;
  }
}

.tag {
  padding: 2px 5px;
}
</style>
