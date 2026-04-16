<script>
export default {
    name: 'PasswordComponent',
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
            value: '',
            show: false,
        }
    },
    methods: {
        mount() {
            this.value = this.modelValue;
        },

        toggle() {
            this.show = !this.show;
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
<div class="password">
    <input :type="show ? 'text' : 'password'"
        class="input"
        ref="input"
        v-model="value"
        @input="$emit('update:modelValue', value)"
    />
    <a @click="toggle"><sprite :id="show ? 'eye-crossed' : 'eye'" /></a>
</div>
</template>
