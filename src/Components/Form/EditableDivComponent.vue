<script>
export default {
    name: 'EditableDivComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            watch: true,
        }
    },
    methods: {
        mount() {
            this.$el.innerHTML = this.modelValue;
        },

        input(e) {
            this.$emit('update:modelValue', e.target.innerHTML);
        },
    },
    mounted() {
        this.mount();
    },
    watch: {
        modelValue() {
            this.mount();
        },
    },
}
</script>

<template>
<div contenteditable="true" @blur="input" />
</template>
