<script>
import { Container } from "vue3-smooth-dnd";

export default {
    name: 'TabsMenuSortableComponent',
    inject: ['active', 'changeTab'],
    components: { Container },
    computed: {
        children() {
            return this.$refs.container ? this.$refs.container.$el.children : [];
        },
    },
    methods: {
        mount() {
            if ( !this.children.length ) {
                return;
            }

            for ( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                const click_handler = this.click.bind(this, i);
                child.addEventListener('click', click_handler);
                child.__click_handler = click_handler;
            }

            this.setActive();
        },

        //active.query holds the raw route value (a tab name or a numeric position).
        //the menu owns the names, so it maps it to a numeric position.
        resolveIndex() {
            let raw = this.active.query;

            for ( let i = 0; i < this.children.length; i++ ) {
                if ( this.children[i].getAttribute('name') == raw ) {
                    return i;
                }
            }

            let num = Number(raw);
            return ( raw !== '' && Number.isInteger(num) && num >= 0 && num < this.children.length ) ? num : 0;
        },

        setActive() {
            if ( !this.children.length ) {
                return;
            }

            let index = this.resolveIndex();
            this.active.index = index;

            for ( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                i == index ? child.classList.add('active') : child.classList.remove('active');
            }
        },

        unmount() {
            if ( !this.children.length ) {
                return;
            }

            for  (let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                child.removeEventListener('click', child.__click_handler);
                delete child.__click_handler;
            }
        },

        click(index) {
            this.changeTab({
                index,
                name: this.children[index].getAttribute('name'),
            });
        },
    },
    watch: {
        //re-resolve + re-highlight when the route changes (e.g. router navigation)
        'active.query'() {
            this.setActive();
        },
    },
    mounted() {
        this.mount();
    },
    updated() {
        this.unmount();
        this.mount();
    },
    beforeUnmount() {
        this.unmount();
    },
}
</script>

<template>
<div class="tabs__menu select-none">
    <Container ref="container" v-bind="$attrs" @drop="$emit('drop', $event)">
        <slot />
    </Container>
</div>
</template>
