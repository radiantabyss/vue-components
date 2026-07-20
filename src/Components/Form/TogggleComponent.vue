<script>
export default {
    name: 'TogggleComponent',
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
        values: {
            type: Array,
            required: false,
            default() {
                return ['', 1, 0];
            },
        },
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            name: Math.ceil(Math.random() * 10000),
            value: null,
            index: 0,
        }
    },
    methods: {
        mount() {
            this.value = this.isNumber(this.modelValue) ? parseFloat(this.modelValue) : this.modelValue;
            this.index = this.values.indexOf(this.value);

            if ( this.index == -1 ) {
                this.value = this.values[0];
                this.index = 0;
            }
        },

        click() {
            this.index++;

            if ( this.index == this.values.length ) {
                this.index = 0;
            }

            this.value = this.values[this.index];

            this.$emit('update:modelValue', this.value);
            this.$emit('change', this.value);
        },

        isNumber(value) {
            return typeof value === 'string' && !isNaN(value) && !isNaN(parseFloat(value));
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
<label class="togggle" :class="disabled ? 'disabled' : ''" v-if="value !== null">
    <input type="radio" v-for="(_value, _index) in values" :key="_value"
        :value="_value"
        :name="name"
        :checked="_value === value"
        :data-index="_index"
        @click="click"
    />
    <span></span>
</label>
</template>
