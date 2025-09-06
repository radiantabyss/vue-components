<script>
export default {
    name: 'CensoredComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    data() {
        return {
            value: '',
            show: false,
        }
    },
    methods: {
        mount() {
            this.value = this.modelValue;
        },

        handleInput() {
            this.$emit('update:modelValue', this.$refs.input.value);
        },

        toggle() {
            this.show = !this.show;
        },

        copy(value, e) {
            this.$clipboard(value);
            e.target.innerHTML = '<svg class="svg-check color-green"><use xlink:href="/sprites.svg#clipboard-check"></use></svg>';

            setTimeout(() => {
                e.target.innerHTML = '<svg class="svg-clipboard"><use xlink:href="/sprites.svg#clipboard"></use></svg>';
            }, 2000);
        },
    },
    mounted() {
        this.mount();
    },
    watch: {
        modelValue() {
            this.mount();
        },

        value() {
            this.$emit('update:modelValue', this.value);
        },
    },
}
</script>

<template>
<div class="censored">
    <input type="text" class="input" v-model="value" ref="input" v-show="show" />
    <input type="text" class="input" readonly v-show="!show" :value="Str.mask(value)" />
    <a @click="copy(value, $event)" title="Copy to clipboard">
        <sprite id="clipboard" />
    </a>
    <a @click="toggle"><sprite :id="show ? 'eye-crossed' : 'eye'" /></a>
</div>
</template>
