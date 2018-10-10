<template>
    <button class="v-button"
            type="button"
            :class="{
               'v-button--normal': type === 'normal',
               'v-button--dark': type === 'dark'
            }"
            @click="$emit('click')"
    >{{value}}</button>
</template>

<style lang="scss">
    @import "~@/assets/color";
    .v-button {
        outline: none;
        border: none;
        border-radius: 2px;
        min-width: 80px;
        height: 40px;
        padding: 0 1em;
        font-size: 14px;
        &--normal {
            background: $bright;
            color: #ffffff;
        }
        &--dark {
            background: $dark;
            color: #ffffff;
        }
    }
</style>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'v-button',
    props: {
      value: String,
      type: {
        type: String,
        default: 'normal'
      }
    }
  });
</script>
