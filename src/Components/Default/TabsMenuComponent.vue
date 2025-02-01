<script>
export default {
    name: 'TabsMenuComponent',
    inject: ['active', 'changeTab'],
    computed: {
        children() {
            return this.$el ? this.$el.children : [];
        },
    },
    methods: {
        mount() {
            if ( !this.children.length ) {
                return;
            }

            for ( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                let click_handler = this.click.bind(this, i);
                child.addEventListener('click', click_handler);
                child.__click_handler = click_handler;

                if ( i == this.active.index ) {
                    child.classList.add('active');
                }
                else {
                    child.classList.remove('active');
                }
            }
        },

        unmount() {
            if ( !this.children.length ) {
                return;
            }

            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                if ( child.__click_handler ) {
                    child.removeEventListener('click', child.__click_handler);
                    delete child.__click_handler;
                }
            }
        },

        click(index) {
            this.changeTab(index);

            for ( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if ( i === index ) {
                    child.classList.add('active');
                }
                else {
                    child.classList.remove('active');
                }
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
    beforeUnmount() {
        this.unmount();
    },
}
</script>

<template>
<div class="tabs__menu">
    <slot />
</div>
</template>
