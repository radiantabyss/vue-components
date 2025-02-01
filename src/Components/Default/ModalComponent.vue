<script>
export default {
    name: 'ModalComponent',
    props: {
        name: {
            type: String,
            required: true,
        },
        click_to_close: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            is_visible: false,
        }
    },
    methods: {
        show(e) {
            if ( e.detail.name != this.name ) {
                return;
            }

            this.is_visible = true;
            this.$emit('before-open', e.detail);
        },

        hide(e) {
            if ( e.detail.name != this.name ) {
                return;
            }

            this.is_visible = false;
            this.$emit('before-close');
        },

        clickToClose(e) {
            if ( !this.click_to_close || (this.$el.contains(e.target) && !this.$el.isEqualNode(e.target)) ) {
                return;
            }

            this.hide({
                detail: {
                    name: this.name
                }
            });
        },
    },
    mounted() {
        window.addEventListener('modal-show', this.show);
        window.addEventListener('modal-hide', this.hide);
    },
    beforeDestroy() {
        window.removeEventListener('modal-show', this.show);
        window.removeEventListener('modal-hide', this.hide);
    },
}
</script>

<template>
<div class="modal" :class="is_visible ? 'visible' : ''" @click="clickToClose">
    <div class="modal__content">
        <a @click="Modal.hide(name)" class="modal__close">
            <sprite id="x" class="small" />
        </a>
        <slot />
    </div>
</div>
</template>
