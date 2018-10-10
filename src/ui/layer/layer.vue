<template>
    <transition name="v-layer">
        <div class="v-layer" v-if="visible"></div>
    </transition>
</template>

<style lang="scss">
    .v-layer {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        z-index: 100;
    }
    .v-layer-enter, .v-layer-leave-to {
        opacity: 0;
    }
    .v-layer-enter-active, .v-layer-leave-active {
        transition: all .3s ease;
    }
</style>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'v-layer',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    }
  });
</script>
