<script>
export default {
    name: 'FileComponent',
    props: {
        modelValue: {
            type: [String, Number, File],
            required: false,
        },
        accept: {
            type: String,
            required: false,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    methods: {
        selectFile(e) {
            this.$emit('update:modelValue', e.target.files[0]);
        },
    },
    watch: {
        modelValue() {
            if ( !this.modelValue ) {
                this.$refs.input.value = '';
            }
        },
    },
}
</script>

<template>
<input type="file" ref="input" class="input" @change="selectFile" :accept="accept" />
</template>
