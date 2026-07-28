<script>
export default {
    name: 'AutocompleteComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
        text: {
            type: String,
            required: false,
            default: '',
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
        options: {
            type: Array,
            required: false,
            default() {
                return [];
            },
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
            default() {
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
            default() {
                return {};
            },
        },
        autoselect: {
            type: Boolean,
            required: false,
            default: false,
        },
        clear_on_select: {
            type: Boolean,
            required: false,
            default: false,
        },
        selected: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
        excluded: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
        modal: {
            type: Boolean,
            required: false,
            default: false,
        },
        create: {
            type: Boolean,
            required: false,
            default: false,
        },
        create_url: {
            type: String,
            required: false,
            default: '',
        },
    },
    emits: ['update:modelValue', 'select'],
    data() {
        return {
            term: this.text,
            results: false,
            results_visible: false,
            watch: true,
        }
    },
    methods: {
        async search(is_autosearch = false) {
            if ( !is_autosearch && this.term.length < this.min_characters ) {
                this.results = false;
                this.results_visible = false;
                return;
            }

            if ( !this.domain && !this.url ) {
                return this.searchOptions(is_autosearch);
            }

            let params = {
                term: this.term,
                limit: is_autosearch ? this.autosearch_limit : this.limit,
                ...this.search_params,
            };

            if ( is_autosearch ) {
                params = {
                    term: '',
                    limit: is_autosearch ? this.autosearch_limit : this.limit,
                    ...this.search_params,
                    ...this.autosearch_params
                };
            }

            if ( this.selected.length ) {
                params.selected = this.selected;
            }

            if ( this.excluded.length ) {
                params.excluded = this.excluded;
            }

            let data = await Request.get(this.url ? this.url : `/${this.domain}/search`, params);
            this.results = data.items;
            this.results_visible = is_autosearch ? false : true;

            if  ( this.autoselect && this.results.length == 1 ) {
                this.select(this.results[0]);
            }
        },

        searchOptions(is_autosearch) {
            let results;

            if ( this.term != '' ) {
                results = this.options.filter(option => {
                    return `${option.text}`.toLowerCase().startsWith(this.term.toLowerCase());
                });

                let results_containing = this.options.filter(option => {
                    return `${option.text}`.toLowerCase().includes(this.term.toLowerCase()) && !pluck(results, 'value').includes(option.value);
                });

                results = results.concat(results_containing);
            }
            else {
                results = this.options;
            }

            let selected_values = pluck(this.selected, 'value');
            this.results = results.map(result => {
                result.selected = selected_values.includes(result.value);
                return result;
            });

            this.results_visible = is_autosearch ? false : true;

            if  ( this.autoselect && this.results.length == 1 ) {
                this.select(this.results[0]);
            }
        },

        async select(result) {
            if ( this.clear_on_select ) {
                this.term = '';
                this.results = false;
            }
            else {
                this.term = result.text;
            }

            this.results_visible = false;
            this.watch = false;

            this.$emit('update:modelValue', result.value);
            this.$emit('select', result);

            await this.$nextTick();
            this.watch = true;

            if ( this.autosearch && this.clear_on_select ) {
                this.search(true);
            }
        },

        clear() {
            this.term = '';
            this.results = false;
            this.results_visible = false;
            this.$emit('update:modelValue', '');
            this.$emit('select', false);
            this.$refs.input.focus();

            if ( this.autosearch ) {
                this.search(true);
            }
        },

        hide() {
            this.results_visible = false;
        },

        async setTerm() {
            if ( this.modelValue === null || this.modelValue == '' || this.text ) {
                this.term = '';
                return;
            }

            if ( !this.url && !this.domain ) {
                let option = this.options.find(option => option.value == this.modelValue);
                if ( option ) {
                    this.term = option.text;
                }
                return;
            }

            let data = await Request.get(this.url ? this.url : `/${this.domain}/search`, { id: this.modelValue, limit: 1 });
            if ( data.items.length ) {
                this.term = data.items[0].text;
            }
        },

        async submit() {
            let data = await Request.post(this.create_url ? this.create_url : `/${this.domain}/create`, {
                autocomplete_term: this.term,
            });

            this.results = false;
            this.results_visible = false;
            this.$emit('update:modelValue', data.item.id);
            this.$emit('select', {
                text: this.term,
                value: data.item.id,
            });
        },
    },
    async mounted() {
        await this.setTerm();

        if ( this.term == '' && (this.autosearch || this.options.length) ) {
            this.search(true);
        }
    },
    watch: {
        modelValue() {
            if ( !this.watch ) {
                return;
            }

            this.setTerm();
        },

        search_params() {
            if ( this.autosearch ) {
                this.search(true);
            }
        },

        options() {
            this.search(true);
        },

        selected() {
            if ( this.autosearch || this.options.length ) {
                this.search(true);
            }
        },

        excluded() {
            if ( this.autosearch || this.options.length ) {
                this.search(true);
            }
        },
    },
}
</script>

<template>
<div class="autocomplete">
    <input type="text" class="input"
        :placeholder="this.placeholder || __('Search '+Str.ucwords(this.domain.replace('/', ' ')))"
        v-model="term"
        ref="input"
        @input="search(false)"
        @click="results_visible = true"
    />

    <div class="autocomplete__results"
        v-show="results_visible"
        v-closable="{exclude: ['input'], handler: 'hide'}"
        v-if="results !== false"
    >
        <template v-if="results.length">
            <template v-for="result in results" :key="result">
                <a @click="select(result)" v-if="!result.selected">
                    {{ result.text }}
                </a>
                <div @click="hide" v-else>
                    {{ result.text }} <sprite id="check" />
                </div>
            </template>
        </template>
        <div class="flex items-center" v-else>
            <t>No results.</t>
            <button type="button" @click="submit" class="ml-20 btn btn--tiny btn--auto" v-if="create"><t>Create</t></button>
        </div>
    </div>

    <a @click="Modal.show(modal)" v-if="modal" class="autocomplete__search">
        <sprite id="search" />
    </a>

    <a @click="clear" v-show="term" class="autocomplete__clear">
        <sprite id="x" />
    </a>
</div>
</template>
