<script>
import { h, cloneVNode, Comment, Text } from 'vue';

export default {
    name: 'TabsMenuComponent',
    inject: ['active', 'changeTab'],
    methods: {
        click(index) {
            this.changeTab(index);
        },
    },
    render() {
        //take the slotted children, ignore comment/text nodes so the index
        //lines up with active.index (same as the old $el.children behaviour)
        let children = (this.$slots.default ? this.$slots.default() : [])
            .filter(vnode => vnode.type !== Comment && vnode.type !== Text)
            .map((vnode, i) => cloneVNode(vnode, {
                class: { active: i == this.active.index },
                onClick: () => this.click(i),
            }));

        return h('div', { class: 'tabs__menu' }, children);
    },
}
</script>
