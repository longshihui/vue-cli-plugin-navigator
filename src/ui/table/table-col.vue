<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'v-table-col',
  inject: {
    VTable: {
      default: null
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    prop: String,
    default: String
  },
    data() {
        return {
            renderFn: function (h, row, data) {
                return data;
            }
        }
    },
  render(h) {
      if (this.VTable === null) {
          throw new Error('v-table-col must be combine with v-table component');
      }
      if (this.$scopedSlots.default) {
          this.renderFn = function (h, row, data) {
            return this.$scopedSlots.default({
              row,
              data
            });
          };
      }
      return h('div');
  },
    created() {
        if (this.VTable !== null) {
            this.VTable.$emit('v-table.addCol', this);
        }
    },
    beforeDestroy() {
        if (this.VTable !== null) {
            this.VTable.$emit('v-table.removeCol', this);
        }
    }
});
</script>

