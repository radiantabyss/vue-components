<script>
import { h } from 'vue';

export default {
    name: 'TabsButtonsComponent',
    inject: ['name', 'active'],
    render() {
        let children = this.$slots.default() || [];

        if ( !children.length ) {
            return h('div');
        }

        let filtered_children = children.filter((child, index) => {
            return this.active.index == index;
        }).map(child => {
            child.key = `tab-buttons-${this.name}-${this.active.index}`;
            return child;
        });

        return h('div', {
            class: {
                'tabs__buttons': true
            }
        }, filtered_children);
    },
}
</script>
