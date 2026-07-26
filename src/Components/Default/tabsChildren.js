import { Comment, Text, Fragment } from 'vue';

//tabs-content / tabs-buttons read raw slot vnodes, which include a Comment node for
//every false v-if and a Fragment node for every <template>/v-for. the tabs-menu counts
//real DOM elements (this.$el.children), which have neither. flatten the vnodes to match:
//expand fragments into their children, drop comment + whitespace text nodes. this keeps
//the vnode index aligned with the menu's element index.
export function flattenTabChildren(vnodes) {
    let result = [];

    for ( const vnode of vnodes || [] ) {
        if ( vnode.type === Fragment ) {
            result = result.concat(
                flattenTabChildren(Array.isArray(vnode.children) ? vnode.children : [])
            );
        }
        else if ( vnode.type !== Comment && vnode.type !== Text ) {
            result.push(vnode);
        }
    }

    return result;
}
