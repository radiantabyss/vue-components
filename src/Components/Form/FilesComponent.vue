<script>
export default {
    name: 'FilesComponent',
    props: {
        modelValue: {
            type: [String, Number, Array],
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
            let files = [];
            for ( let file of e.target.files ) {
                files.push(file);
            }
            this.$emit('update:modelValue', files);
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
<input type="file" ref="input" class="input" @change="selectFile" :accept="accept" multiple />
</template>
