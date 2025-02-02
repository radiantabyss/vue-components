<script>
export default {
    name: 'ConfirmComponent',
    data() {
        return {
            is_visible: false,
            resolve: '',

            question: '',
            css_class: '',
            button_text: '',
            button_class: '',
            cancel_text: '',
            text: '',
        }
    },
    computed: {
        computed_css_class() {
            let css_class = `${this.css_class}`;

            if ( this.is_visible ) {
                css_class += ' confirm--visible';
            }

            return css_class;
        }
    },
    methods: {
        confirm() {
            this.resolve();
            this.hide();
        },

        hide() {
            this.is_visible = false;
        },
    },
    mounted() {
        window.addEventListener('confirm', (e) => {
            this.is_visible = true;

            this.resolve = e.detail.resolve;

            this.question = e.detail.params.question || 'Are you sure you want to delete this item?';
            this.button_text = e.detail.params.button_text || 'Delete';
            this.button_class = e.detail.params.button_class || 'btn--red';
            this.cancel_text = e.detail.params.cancel_text || 'Cancel';
            this.css_class = e.detail.params.css_class || '';
            this.text = e.detail.params.text || '';
        });

        window.addEventListener('confirm-hide', this.hide);
    },
}
</script>

<template>
<div class="confirm" :class="computed_css_class">
    <div class="confirm__content">
        <a @click="hide" class="confirm__close">
            <sprite id="x" class="small" />
        </a>

        <div class="subtitle text-center">
            <t>{{ question }}</t>
        </div>

        <div class="mb-20" v-if="text">
            {{ text }}
        </div>

        <div class="mt-60 text-center">
            <a @click="confirm" class="btn btn--auto" :class="button_class"><t>{{ button_text }}</t></a>
            <div class="mt-20">
                <a @click="hide"><t>{{ cancel_text }}</t></a>
            </div>
        </div>
    </div>
</div>
</template>
