<script>
export default {
    name: 'EditLiveAutocompleteComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
        autocomplete_settings: {
            type: Object,
            required: false,
            default() {
                return {};
            }
        },
        default_text: {
            type: String,
            required: false,
            default: '',
        },
    },
    emits: ['submit'],
    data() {
        return {
            is_visible: false,
            value: this.modelValue,
            text: this.default_text,
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
    async mounted() {
        if ( this.modelValue ) {
            let url = this.autocomplete_settings.url ? this.autocomplete_settings.url : `/${this.autocomplete_settings.domain}/search`;
            let data = await Request.get(url, { id: this.modelValue, limit: 1 });
            if ( data.items.length ) {
                this.text = data.items[0].text;
            }
        }
    },
    watch: {
        modelValue() {
            this.value = this.modelValue;
        },
    },
}
</script>

<template>
<div class="edit-live" v-closable="{exclude:['edit'], handler: 'hide'}" @keydown.esc="hide">
    <span v-show="!is_visible" @click="show">{{ text }}</span>
    <a @click="show" v-show="!is_visible" ref="edit">
        <sprite id="edit" class="tiny" />
    </a>
    <form class="inline-flex items-center" v-if="is_visible">
        <autocomplete :domain="autocomplete_settings.domain"
            :url="autocomplete_settings.url || ''"
            :limit="autocomplete_settings.limit || 20"
            :search_params="autocomplete_settings.search_params || {}"
            :placeholder="autocomplete_settings.placeholder || ''"
            :autosearch="autocomplete_settings.autosearch || false"
            :autosearch_params="autocomplete_settings.autosearch_params || false"
            :autosearch_limit="autocomplete_settings.autosearch_limit || 10"
            :enable_modal="autocomplete_settings.enable_modal || false"
            :can_create="autocomplete_settings.can_create || false"
            v-model="input"
        />
        <button type="submit" @click.prevent="submit" class="btn-clear">
            <sprite id="check" />
        </button>
    </form>
</div>
</template>
