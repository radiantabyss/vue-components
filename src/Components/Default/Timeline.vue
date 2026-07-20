<script>
export default {
    name: 'Comments',
    props: {
        object_type: {
            type: String,
            required: true,
        },
        object_id: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
        return {
            items: false,
            total: false,
            pages: false,
            loading: true,
            show_form: false,
            new_comment: '',
        }
    },
    computed: {
        grouped() {
            let grouped = {};

            if ( !this.items ) {
                return grouped;
            }

            for ( let item of this.items ) {
                let created_at = new Date(item.created_at);
                let date = Str.mysql_date(created_at);
                let time = `${date} ${Str.pretty_time(created_at)}`;

                if ( !grouped[date] ) {
                    grouped[date] = {};
                }

                if ( !grouped[date][time] ) {
                    grouped[date][time] = [];
                }

                grouped[date][time].push(item);
            }

            return grouped;
        },
    },
    methods: {
        async mount() {
            this.loading = true;

            try {
                let data = await Request.get(`/comment`, {
                    object_type: this.object_type,
                    object_id: this.object_id,
                });

                this.items = data.items;
                this.total = data.total;
                this.pages = data.pages;
                this.loading = false;
            }
            catch(e) {
                this.items = {};
                this.loading = false;
            }
        },

        dateClass(date) {
            if ( Str.pretty_date(date) == 'Today' ) {
                return 'timeline__left--primary';
            }
            else if ( Str.pretty_date(date) == 'Yesterday' ) {
                return 'timeline__left--secondary';
            }

            return '';
        },

        async submit(e) {
            if ( this.new_comment == '' ) {
                this.show_form = false;
                return;
            }

            let data = await Request.post(`/comment/create`, {
                _event: e,
                object_type: this.object_type,
                object_id: this.object_id,
                comment: this.new_comment,
            });

            this.items.unshift(data.item);
            this.show_form = false;
        },
    },
    mounted() {
        this.mount();
    },
    watch: {
        $route() {
            this.mount();
        },
    }
}
</script>

<template>
<div class="relative">
    <form v-if="show_form">
        <div class="row">
            <label><t>Add Comment</t></label>
            <textarea class="input" ref="comment" v-model="new_comment" v-focus />
        </div>
        <div class="row row--submit">
            <button type="submit" @click.prevent="submit" class="btn btn--medium"><t>Save</t></button>
            <a @click="show_form = false"><sprite id="cancel" /><t> Cancel</t></a>
        </div>
    </form>

    <div class="loading-overlay" v-if="loading"><sprite id="request-spinner" /></div>

    <template v-if="items !== false">
        <template v-if="Object.keys(grouped).length">
            <a @click="show_form = true" class="btn btn--tiny absolute" style="right: 0; top: -27px;" v-if="!show_form">
                <sprite id="plus" /> <t>Add</t>
            </a>

            <div class="timeline" v-for="(grouped_by_time, date) in grouped" :key="date">
                <div class="timeline__left" :class="dateClass(date)">
                    {{ __(Str.pretty_date(date)) }}
                </div>
                <div class="timeline__right">
                    <div class="timeline__entry" v-for="(items, time) in grouped_by_time" :key="time">
                        <div class="timeline__time">{{ Str.pretty_time(time) }}</div>
                        <div class="timeline__content" v-for="item in items" :key="item.id">
                            <b>{{ item.created_by.name }}:</b> {{ item.comment }}
                        </div>
                    </div>
                </div>
            </div>
            <pagination :pages="pages" :total="total" :show_entries_count="false" />
        </template>
        <template v-else-if="!show_form">
            <t>No comments.</t>
            <a @click="show_form = true" class="btn btn--tiny ml-5"><sprite id="plus" /> <t>Add</t></a>
        </template>
    </template>
</div>
</template>
