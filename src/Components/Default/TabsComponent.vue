<script>
import { reactive } from 'vue';

export default {
    name: 'TabsComponent',
    props: {
        name: {
            type: String,
            required: false,
            default: 'tab',
        },
        is_route: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        let query = this.is_route ? (this.$route.query[this.name] || '') : '';
        let index = Number(query);

        return {
            active: reactive({
                query,
                index: (query !== '' && Number.isInteger(index)) ? index : 0,
            }),
        }
    },
    provide() {
        return {
            name: this.name,
            active: this.active,
            changeTab: this.changeTab,
        }
    },
    methods: {
        changeTab(params) {
            let value = params.name || params.index;

            if ( !this.is_route ) {
                this.active.query = params.index ? value : '';
                this.$emit('change', params.index);
                return;
            }

            let query = {...this.$route.query};

            if ( params.index ) {
                query[this.name] = value;
            }
            else {
                delete query[this.name];
            }

            this.$router.push({
                path: this.$route.path,
                query,
            });
        },
    },
    watch: {
        $route() {
            if ( !this.is_route ) {
                return;
            }

            this.active.query = this.$route.query[this.name] || '';
        },
    },
}
</script>

<template>
<div class="tabs">
    <slot @change-tab="changeTab" />
</div>
</template>
