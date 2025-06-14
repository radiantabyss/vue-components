<script>
export default {
    name: 'WindowpickerComponent',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
        options: {
            type: Array,
            required: false,
            default() {
                return [
                    'none',
                    'today',
                    'yesterday',
                    'last_7_days',
                    'last_14_days',
                    'last_30_days',
                    'current_month',
                    'last_month',
                    'custom_range',
                ];
            }
        },
    },
    data() {
        return {
            show: false,
            show_picker: false,
        }
    },
    computed: {
        text() {

        },
    },
    methods: {
        hide() {
            this.show = false;
        },

        select(value) {
            if ( value == 'custom_range' ) {
                this.show_picker = true;
                return;
            }

            this.show_picker = false;
            this.hide();
            this.$emit('update:modelValue', value);
        },

        selectRange(range) {
            this.hide();
            this.$emit('update:modelValue', range);
        },

        valueToText(value) {
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            if ( value === '' ) {
                return 'None';
            }

            //date interval
            if ( value.match(/\d{4}-\d{2}-\d{2}:\d{4}-\d{2}-\d{2}/) ) {
                let dates = value.split(':');
                if ( dates[0] == dates[1] ) {
                    return Str.pretty_date(dates[0]);
                }

                return `${Str.pretty_date(dates[0])} - ${Str.pretty_date(dates[1])}`;
            }

            //date
            if ( value.match(/\d{4}-\d{2}-\d{2}/) ) {
                return Str.pretty_date(value);
            }

            //year-month interval
            if ( value.match(/\d{4}-\d{2}:\d{4}-\d{2}/) ) {
                let years_months = value.split(':');

                let split_start = years_months[0].split('-');
                let month_start = Str.ucwords(months[parseInt(split_start[1]) - 1]);
                let year_start = split_start[0];

                let split_end = years_months[0].split('-');
                let month_end = Str.ucwords(months[parseInt(split_end[1]) - 1]);
                let year_end = split_end[0];

                if ( years_months[0] == years_months[1] ) {
                    if ( year_start == new Date().getFullYear() ) {
                        return month_start;
                    }

                    return `${month_start} ${year_start}`;
                }

                if ( year_start == year_end && year_start == new Date().getFullYear() ) {
                    return `${month_start} - ${month_end}`;
                }

                if ( year_start == year_end ) {
                    return `${month_start} - ${month_end} ${year_end}`;
                }

                return `${month_start} ${year_start}- ${month_end} ${year_end}`;
            }

            //year-month
            if ( value.match(/\d{4}-\d{2}/) ) {
                let split = value.split('-');
                let month = Str.ucwords(months[parseInt(split[1]) - 1]);
                let year = split[0];

                if ( year == new Date().getFullYear() ) {
                    return month;
                }

                return `${month} ${year}`;
            }

            //year interval
            if ( value.match(/\d{4}:\d{4}/) ) {
                let years = value.split(':');
                if ( years[0] == years[1] ) {
                    return years[0];
                }

                return `${years[0]} - ${years[1]}`;
            }

            if ( this.options.includes(value) ) {
                return Str.ucwords(value);
            }

            return value;
        },
    },
    mounted() {

    },
}
</script>

<template>
<div class="windowpicker">
    <a @click="show = !show" class="windowpicker__value" ref="trigger">
        {{ __(valueToText(modelValue)) || __('Select Range') }}
    </a>

    <transition name="simple-fade">
        <div class="windowpicker__popup" v-show="show" v-closable="{ handler: 'hide', exclude: ['trigger'] }">
            <div class="windowpicker__options">
                <a v-for="option in options" :key="option" @click="select(option)">
                    {{ __(valueToText(option)) }}
                </a>
            </div>
            <div class="windowpicker__picker" v-show="show_picker">
                <daterangepicker @submit="selectRange" />
            </div>
        </div>
    </transition>
</div>
</template>
