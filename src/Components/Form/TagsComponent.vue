<script>
export default {
    name: 'TagsComponent',
    props: {
        modelValue: {
            type: [Number, String, Array],
            required: false,
            default() {
                return [];
            },
        },
        options: {
            type: [Array, Object],
            required: false,
            default() {
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
        limit: {
            type: Number,
            required: false,
            default: 20,
        },
        placeholder: {
            type: String,
            required: false,
            default: '',
        },
        min_characters: {
            type: Number,
            required: false,
            default: 2,
        },
        search_params: {
            type: Object,
            required: false,
            default: () => {
                return {};
            },
        },
        autosearch: {
            type: Boolean,
            required: false,
            default: false,
        },
        autosearch_limit: {
            type: Number,
            required: false,
            default: 10,
        },
        autosearch_params: {
            type: Object,
            required: false,
            default: () => {
                return {};
            },
        },
        autoselect: {
            type: Boolean,
            required: false,
            default: false,
        },
        exclude: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    computed: {
        visible_options() {

        },
    },
    data() {
        return {
            watch: true,
            items: [],
            search: null,
        }
    },
    methods: {
        async formatModelValue() {
            let items = [];

            if ( this.modelValue != '' ) {
                let values = this.modelValue;

                if ( !Array.isArray(this.modelValue) ) {
                    values = [this.modelValue];
                }

                let texts = {};

                if ( this.url || this.domain ) {
                    let data = await Request.get(this.url ? this.url : `/${this.domain}/search`, {
                        ids: values,
                    });

                    texts = keyBy(data.items, 'value');
                }
                else {
                    texts = keyBy(this.options, 'value');
                }

                for ( let value of values ) {
                    items.push({
                        value,
                        text: texts[value] ? texts[value].text : '',
                    });
                }
            }

            return items;
        },

        add(item) {
            if ( !item ) {
                return;
            }

            if ( this.items.find(el => el.value == item.value) ) {
                return;
            }

            this.items = [...this.items, item];
            this.$emit('update:modelValue', pluck(this.items, 'value'));
        },

        remove(i) {
            this.items = this.items.filter((_, index) => index !== i);
            this.$emit('update:modelValue', pluck(this.items, 'value'));
        },
    },
    async mounted() {
        this.items = await this.formatModelValue();
    },
    watch: {
        async modelValue(to) {
            let values = pluck(this.items, 'value');

            if ( to.length == values.length && to.every((value, i) => value == values[i]) ) {
                return;
            }

            this.items = await this.formatModelValue();
        },

        async options() {
            this.items = await this.formatModelValue();
        },
    },
}
</script>

<template>
<div class="tags">
    <template v-if="items && items.length">
        <div class="tags__tag" v-for="(item, i) in items" :key="i">
            {{ item.text }}
            <a @click="remove(i)"><sprite id="x" /></a>
        </div>
    </template>
    <autocomplete :domain="domain"
        :url="url"
        :options="options"
        :limit="limit"
        :min_characters="min_characters"
        :search_params="search_params"
        :placeholder="placeholder"
        :autosearch="autosearch"
        :autosearch_limit="autosearch_limit"
        :autoselect="autoselect"
        :clear_on_select="true"
        :selected="items"
        :excluded="exclude ? items : []"
        v-model="search"
        @select="add"
    />
</div>
</template>
