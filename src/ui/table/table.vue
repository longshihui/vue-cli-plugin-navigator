<style lang="scss">
.v-table {
    border-radius: 10px;
    background: #e4f5ef;
    .v-table__col-declare-wrapper {
        display: none;
    }
    .v-table__header {
        display: flex;
        text-align: center;
        border-bottom: 1px solid #42b983;
        .v-table__col {
            font-weight: bold;
        }
    }
   .v-table__row {
       display: flex;
       cursor: pointer;
       text-align: center;
       transition: .3s background-color ease;
       &:hover {
           background: #42b983;
           color: #ffffff;
       }
   }
    .v-table__col {
        min-height: 40px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: break-word;
        line-height: 1.5;
    }
}
</style>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'v-table',
    provide() {
      return {
          VTable: this
      }
    },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
    data() {
        return {
            cols: []
        }
    },
    render(h) {
      const ths = this.cols.map(function (col) {
        return h('div', { 'class': 'v-table__col' }, col.label);
      });

      const rows = this.data.map((row) => {
          const cols = this.cols.map(function (col) {
            return h('div', { 'class': 'v-table__col' }, col.renderFn(h, row, row[col.prop] ? row[col.prop] : col.default));
          });
          return h(
            'div',
            {
              'class': 'v-table__row',
              on: {
                click: () => {
                  this.$emit('row-click', row);
                }
              }
            },
            cols
          );
      });

        return h(
          'div',
          {
            'class': 'v-table'
          },
          [
            h('div', { 'class': 'v-table__header' }, ths),
            h('div', { 'class': 'v-table__col-declare-wrapper' }, this.$slots.default),
            rows
          ]
        );
    },
    created() {
      this.$on('v-table.addCol', (col) => {
          this.cols.push(col);
      });
      this.$on('v-table.removeCol', (col) => {
          const index = this.cols.indexOf(col);
          if (index !== -1) {
              this.cols.splice(index, 1);
          }
      });
    }
});
</script>

