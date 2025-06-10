<script>
import { h } from 'vue';

export default {
    name: 'TabsContentComponent',
    inject: ['name', 'active'],
    render() {
        let children = this.$slots.default() || [];

        if ( !children.length ) {
            return h('div');
        }

        let filtered_children = children.filter((child, index) => {
            return this.active.index == index;
        }).map(child => {
            child.key = `tab-content-${this.name}-${this.active.index}`;
            return child;
        });

        return h('div', {
            class: {
                'tabs__content': true
            }
        }, filtered_children);
    },
}
</script>
