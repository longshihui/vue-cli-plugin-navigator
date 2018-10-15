<template>
    <v-dialog :title="pageConfig.title + ' Information'" :visible.sync="showDialog">
        <template slot="body">
            <section class="section">
                <div class="section__name">
                    Tags:
                </div>
                <div class="section__value">
                    <span class="tag"
                          v-for="tagName of pageConfig.tags"
                          :key="tagName"
                          :style="{ backgroundColor: getTagColor(tagName) }">{{tagName}}</span>
                </div>
            </section>
            <section class="section">
                <div class="section__name">Description: </div>
                <div class="section__value">{{pageConfig.description || 'none'}}</div>
            </section>
        </template>
        <v-button type="dark" value="close" slot="footer" @click="showDialog = false"/>
    </v-dialog>
</template>
<style lang="scss" scoped>
.section {
    margin: 20px 0;
    display: flex;
    padding: 0 1em;
}
.section__name {
    width: 100px;
    text-align: right;
    font-weight: bold;
}
.section__value {
    padding-left: 1em;
    flex: 1;
}
</style>
<script>
import Vue from 'vue';
import VDialog from '../../ui/dialog/index';
import VButton from '../../ui/button/index';
export default Vue.extend({
    name: 'page-detail-view',
    props: {
        tags: Array,
        visible: Boolean,
        pageConfig: Object
    },
    components: {
        VDialog,
        VButton
    },
    data() {
        return {
            showDialog: this.visible || false
        };
    },
    watch: {
        visible(visible) {
            this.showDialog = visible;
        },
        showDialog(show) {
            this.$emit('update:visible', show);
        }
    },
    methods: {
        getTagColor(tagName) {
            const tag = this.tags.find(tag => tag.name === tagName);
            return tag ? tag.color : '#2e4053';
        }
    }
});
</script>
