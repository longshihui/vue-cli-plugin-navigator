<template>
    <div class="v-input" :class="classNames">
        <input v-model="currentValue" class="input" :placeholder="placeholder">
    </div>
</template>

<style lang="scss">
    .v-input {
        box-sizing: border-box;
        border-radius: 17px;
        padding: 10px 20px;
        background: #e4f5ef;
        .input {
            background: 0 0;
            border: none;
            color: #2c3e50;
            display: block;
            font-family: inherit;
            font-size: 14px;
            line-height: 14px;
            outline: 0;
            padding: 0;
            position: relative;
            width: 100%;
            z-index: 1;
        }
    }

    .v-input--center {
        .input {
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'v-input',
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: 'please enter any key...'
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentValue: this.value,
            };
        },
        computed: {
            classNames(): { [key: string]: boolean } {
                return {
                    'v-input--center': this.center
                };
            }
        },
        watch: {
            currentValue(value) {
                this.$emit('input', value);
            }
        },
    });
</script>
