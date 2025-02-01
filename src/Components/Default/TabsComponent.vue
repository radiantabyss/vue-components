<script>
import { reactive, provide, watch, onMounted, getCurrentInstance } from 'vue';

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
        return {
            active: reactive({
                index: this.is_route ? (this.$route.query[this.name] || '') : '',
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
        changeTab(index) {
            if ( !this.is_route ) {
                this.active.index = index;
                return;
            }

            let query = {...this.$route.query};

            if ( index ) {
                query[this.name] = index;
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
    mounted() {
        // let children = this.$slots.default() || [];
        // children.forEach(child => {
        //     child.$on('change-tab', this.changeTab);
        // });
    },
    watch: {
        $route() {
            if ( !this.is_route ) {
                return;
            }

            this.active.index = this.$route.query[this.name] || '';
        },
    },
}
</script>

<template>
<div class="tabs">
    <slot @change-tab="changeTab" />
</div>
</template>
