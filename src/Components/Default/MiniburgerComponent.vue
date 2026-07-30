<script>
export default {
    name: 'MiniburgerComponent',
    props: {
        sprite: {
            type: String,
            required: false,
            default: '',
        }
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        hide() {
            this.show = false;
        },

        handleClick(e) {
            if ( e.target.closest('a') ) {
                this.hide();
            }
        },
    },
}
</script>

<template>
<div class="miniburger">
    <a @click="show = !show" :class="!sprite ? 'icon-dots' : ''" ref="trigger">
        <sprite :id="sprite" v-if="sprite" />
        <i v-else></i>
    </a>

    <transition name="simple-fade">
        <div class="miniburger__links" v-show="show" v-closable="{ handler: 'hide', exclude: ['trigger'] }" @click="handleClick">
            <slot />
        </div>
    </transition>
</div>
</template>
