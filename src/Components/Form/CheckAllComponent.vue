<script>
export default {
    name: 'CheckAllComponent',
    props: {
        modelValue: {
            type: Array,
            required: false,
            default: () => {
                return [];
            },
        },
        domain: {
            type: String,
            required: false,
            default: '',
        },
        url: {
            type: String,
            required: false,
            default: '',
        },
        filters: {
            type: Object,
            required: false,
            default() {
                return {
                    limit: 999,
                };
            },
        },
        options: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            items: false,
            selected: [],
            select_all: false,
        }
    },
    methods: {
        async mount() {
            if ( !this.url && !this.domain ) {
                this.items = [...this.options];
            }
            else {
                let data = await Request.get(this.url ? this.url : `/${this.domain}/search`, this.filters);
                this.items = data.items;
            }

            this.selected = this.modelValue;
            this.select_all = Object.keys(this.items).length == this.selected.length;
        },

        select() {
            this.select_all = Object.keys(this.items).length == this.selected.length;
            this.$emit('update:modelValue', this.selected);
        },

        selectAll() {
            this.selected = this.select_all ? pluck(this.items, 'value') : [];
            this.$emit('update:modelValue', this.selected);
        },
    },
    mounted() {
        this.mount();
    },
    watch: {
        options() {
            this.selected = this.modelValue;
        }
    },
}
</script>

<template>
<div v-if="items !== false">
    <div class="mb-10">
        <label class="checkbox">
            <input type="checkbox" v-model="select_all" @change="selectAll" />
            <span><t>Select All</t></span>
        </label>
    </div>

    <div class="flex gap-10 flex-wrap">
        <label class="checkbox mr-10" v-for="item in items" :key="item.value">
            <input type="checkbox" v-model="selected" :value="item.value" @change="select" />
            <span><t>{{ item.text }}</t></span>
        </label>
    </div>
</div>
</template>
