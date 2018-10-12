<template>
    <v-dialog title="Information" :visible.sync="showDialog">
        <template slot="body">
        </template>
        <v-button type="dark" value="close" slot="footer" @click="showDialog = false"/>
    </v-dialog>
</template>

<style lang="scss">
    .tag {
        padding: 2px 5px;
    }
</style>

<script>
  import Vue from 'vue';
  import VDialog from '../../ui/dialog/index';
  import VButton from '../../ui/button/index';
  export default Vue.extend({
    name: 'page-detail-view',
    props: {
      visible: Boolean,
      pageConfig: Object
    },
    components: {
      VDialog,
      VButton
    },
    data() {
      return {
        showDialog: this.visible || false,
      };
    },
    watch: {
      visible(visible) {
        this.showDialog = visible;
      },
      showDialog(show) {
        this.$emit('update:visible', show);
      }
    }
  });
</script>
