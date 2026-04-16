<script>
export default {
    props: {
        modelValue: {
            type: [Boolean, Number, String],
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        text: {
            type: String,
            required: false,
            default: '',
        },
        on_text: {
            type: String,
            required: false,
            default: '',
        },
        off_text: {
            type: String,
            required: false,
            default: '',
        },
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            checked: null,
        }
    },
    computed: {
        css_class() {
            let css_class = this.disabled ? 'disabled' : '';

            if ( this.text !== '' || this.on_text !== '' || this.off_text !== '' ) {
                css_class += ' toggle--with-text';
            }

            return css_class;
        },
    },
    methods: {
        mount() {
            let checked = this.modelValue ? true : false;
            if ( this.modelValue === '0' ) {
                checked = false;
            }

            this.checked = checked;
        },

        change() {
            this.$emit('update:modelValue', this.checked ? 1 : 0);
            this.$emit('change', this.checked ? 1 : 0);
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
<label class="toggle" :class="css_class" v-if="checked !== null">
    <input type="checkbox" ref="input" v-model="checked" @change="change">
    <span></span>
    <p v-if="text !== '' || on_text !== '' || off_text !== ''">
        <template v-if="text !== ''">
            {{ text }}
        </template>
        <template v-else-if="checked">
            {{ on_text }}
        </template>
        <template v-else>
            {{ off_text }}
        </template>
    </p>
</label>
</template>
