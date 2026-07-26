<script>
import { h } from 'vue';
import { flattenTabChildren } from './tabsChildren';

export default {
    name: 'TabsButtonsComponent',
    inject: ['name', 'active'],
    render() {
        //flatten so the index matches the menu (drops false-v-if comments, expands <template>)
        let children = flattenTabChildren(this.$slots.default ? this.$slots.default() : []);

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
