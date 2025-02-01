<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
    name: 'TabsMenuSortableComponent',
    inject: ['active', 'changeTab'],
    components: { Container, Draggable },
    computed: {
        children() {
            let children = this.$refs.container.$el.children;
            return children;
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

                i == this.active.index ? child.classList.add('active') : child.classList.remove('active');
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
            this.changeTab(index);

            for ( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                i == index ? child.classList.add('active') : child.classList.remove('active');
            }
        },
    },
    mounted() {
        this.mount();
    },
    updated() {
        this.unmount();
        this.mount();
    },
    beforeDestroy() {
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
