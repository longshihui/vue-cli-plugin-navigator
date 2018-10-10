<template>
    <transition name="v-dialog">
        <div class="v-dialog" v-if="show">
            <div class="v-dialog__title">
                {{title}}
                <div class="v-dialog__closer" @click="show = false"></div>
            </div>
            <div class="v-dialog__body">
                <slot name="body"/>
            </div>
            <div class="v-dialog__footer">
                <slot name="footer"/>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
    @import "~@/assets/color";
    .v-dialog {
        border-radius: 5px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        background: $faint;
        z-index: 200;
    }
    .v-dialog__title {
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid $bright;
        padding-left: 20px;
        padding-right: 40px;
        height: 40px;
        line-height: 40px;
    }
    .v-dialog__closer {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: url("./close.svg");
        background-size: cover;
        cursor: pointer;
    }
    .v-dialog__body {
        min-height: 40px;
    }
    .v-dialog__footer {
        box-sizing: border-box;
        border-top: 1px solid $bright;
        padding: 5px 20px;
        text-align: center;
    }
    @media screen and (min-width: 1200px) {
        // copy by animate.css bounceIn
        @keyframes bounceIn {
            from,
            20%,
            40%,
            60%,
            80%,
            to {
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale3d(0.3, 0.3, 0.3);
            }

            20% {
                transform: translate(-50%, -50%) scale3d(1.1, 1.1, 1.1);
            }

            40% {
                transform: translate(-50%, -50%) scale3d(0.9, 0.9, 0.9);
            }

            60% {
                opacity: 1;
                transform: translate(-50%, -50%) scale3d(1.03, 1.03, 1.03);
            }

            80% {
                transform: translate(-50%, -50%) scale3d(0.97, 0.97, 0.97);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale3d(1, 1, 1);
            }
        }
        .v-dialog {
            width: 50%;
        }
        .v-dialog-enter, .v-dialog-leave-to {
            opacity: 0;
        }
        .v-dialog-enter-active {
            animation: bounceIn .5s ease;
        }
        .v-dialog-leave-active {
            transition: all .3s ease;
        }
    }
    @media screen and (max-width: 544px) {
        .v-dialog-wrapper {
            background: transparent;
        }
        .v-dialog {
            border-radius: 0;
            width: 100%;
            height: 100%;
        }
        .v-dialog__footer {
            display: none;
        }
        @keyframes slideInUp {
            from {
                transform: translate3d(-50%, 100%, 0);
                visibility: visible;
            }
            to {
                transform: translate3d(-50%, -50%, 0);
            }
        }
        // 动画效果
        .v-dialog-enter, .v-dialog-leave-to {
            opacity: 0;
        }
        .v-dialog-enter-active {
            animation: slideInUp .3s ease-out;
        }
        .v-dialog-leave-active {
            transition: all .3s ease;
        }
    }
</style>

<script lang="ts">
  import Vue from 'vue';
  import Layer from '../layer';

  const layer = new Layer();
  layer.$mount();
  document.body.appendChild(layer.$el);

  export default Vue.extend({
    name: 'v-dialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: String
    },
    model: {
      prop: 'visible',
      event: 'change'
    },
    data() {
      return {
        show: this.visible
      };
    },
    watch: {
      visible(visible) {
        this.show = visible;
      },
      show(show) {
        layer.visible = show;
        this.$emit('update:visible', show);
        this.$emit('change', show)
      }
    },
  });
</script>
