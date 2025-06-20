<script>
export default {
    name: 'EditLiveDatepickerComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
        },
        css_class: {
            type: String,
            required: false,
        },
    },
    emits: ['submit'],
    data() {
        return {
            is_visible: false,
            value: this.modelValue,
            input: this.modelValue,
        }
    },
    methods: {
        show() {
            this.is_visible = true;
        },

        hide() {
            this.input = this.value;
            this.is_visible = false;
        },

        submit() {
            this.value = this.input;
            this.$emit('submit', this.input);
            this.hide();
        },
    },
    watch: {
        modelValue() {
            this.value = this.modelValue;
        },
    },
}
</script>

<template>
<div class="edit-live" :class="css_class" v-closable="{exclude:['edit'], handler: 'hide'}" @keydown.esc="hide">
    <span v-show="!is_visible" @click="show">{{ value }}</span>
    <a @click="show" v-show="!is_visible" ref="edit">
        <sprite id="edit" class="tiny" />
    </a>
    <form class="inline-flex items-center" v-show="is_visible">
        <datepicker v-model="input" />
        <button type="submit" @click.prevent="submit" class="btn-clear">
            <sprite id="check" class="tiny" />
        </button>
    </form>
</div>
</template>
