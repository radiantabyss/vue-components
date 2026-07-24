<script>
import { h, cloneVNode, Comment, Text } from 'vue';
import { Container } from 'vue3-smooth-dnd';

export default {
    name: 'TabsMenuSortableComponent',
    inheritAttrs: false,
    inject: ['active', 'changeTab'],
    methods: {
        click(index) {
            this.changeTab(index);
        },
    },
    render() {
        //bind the active class + click straight onto the slotted children
        //(ignore comment/text nodes so the index matches active.index)
        let children = (this.$slots.default ? this.$slots.default() : [])
            .filter(vnode => vnode.type !== Comment && vnode.type !== Text)
            .map((vnode, i) => cloneVNode(vnode, {
                class: { active: i == this.active.index },
                onClick: () => this.click(i),
            }));

        return h('div', { class: 'tabs__menu select-none' }, [
            h(Container, {
                ...this.$attrs,
                onDrop: ($event) => this.$emit('drop', $event),
            }, () => children),
        ]);
    },
}
</script>
