<script>
export default {
    name: 'AvatarComponent',
    props: {
        src: {
            type: String,
            required: false,
            default: '',
        },
        name: {
            type: String,
            required: false,
            default: '',
        },
        id: {
            type: [Number, String],
            required: false,
            default: '',
        },
    },
    computed: {
        initials() {
            if ( !this.name ) {
                return '?';
            }

            let parts = this.name.trim().split(/\s+/);
            let first = parts[0][0] || '';
            let last = parts.length > 1 ? parts[parts.length - 1][0] : '';

            return (first + last).toUpperCase();
        },

        background() {
            const colors = [
                '#1A1A2E', '#16213E', '#0F3460', '#533483', '#2C2C54',
                '#1B1B2F', '#162447', '#1F4068', '#1B262C', '#0F4C75',
                '#3A0CA3', '#240046', '#10002B', '#3C096C', '#5A189A',
                '#003049', '#001845', '#023E8A', '#012A4A', '#013A63',
                '#2B2D42', '#14213D', '#22223B', '#4A4E69', '#1D3557',
                '#2D6A4F', '#1B4332', '#081C15', '#14532D', '#3D0000',
                '#6A040F', '#370617', '#641220', '#4A0E0E', '#7F1D1D',
                '#7B2D26', '#5C0029', '#3C1518', '#431407', '#4A2511',
                '#422006', '#452B0F', '#3F3018', '#2E2600', '#3D3B00',
                '#333514', '#1C2900', '#0B2818', '#292524', '#1C1917',

                '#3D5A80', '#4A5568', '#556080', '#5C6B8A', '#4E5D7E',
                '#3B6978', '#4A7C7E', '#3E7C8B', '#2C7873', '#3A7D6E',
                '#6247AA', '#7048C0', '#7B4BB7', '#8447C9', '#6A4C93',
                '#2A6F97', '#2C7DA0', '#468FAF', '#3D7EA6', '#356891',
                '#4C956C', '#40916C', '#3E8E5A', '#52796F', '#5B8A72',
                '#9C6644', '#A05A2C', '#B5651D', '#9E6240', '#8D5524',
                '#B23A48', '#A4243B', '#C1444E', '#A63A50', '#933D50',
                '#8E4162', '#A34574', '#96517A', '#7D4A6B', '#8B5A83',
                '#8A6D3B', '#9A7B4F', '#8C7349', '#7E6B4A', '#6B705C',
                '#5F6C5D', '#5A7D5A', '#657153', '#726E60', '#6E6658',
            ];

            const colors2 = [
                '#6B8CAE', '#7B96B8', '#6E8CA0', '#8098B5', '#7389A8',
                '#5E9AA0', '#6DA5A8', '#7BAEB0', '#5FA8A0', '#6FA99C',
                '#8B6FC0', '#9578C7', '#A183CE', '#8E7BB5', '#9B85C4',
                '#5B9BC9', '#6BA5CE', '#7BB0D4', '#68A3C7', '#5F97B8',
                '#6FB08A', '#7CB894', '#68AD82', '#84BF9C', '#77B58F',
                '#C08552', '#C99A6B', '#C28A5E', '#B5804F', '#CB9A70',
                '#D06A78', '#C95F6E', '#D77E8A', '#C56474', '#CE7180',
                '#B56A94', '#C07BA0', '#A96888', '#BD7C9E', '#B0729A',
                '#B39B5E', '#BFA972', '#AE9656', '#C2AC7D', '#A89050',
                '#8FA07E', '#9BAA88', '#87997A', '#A5B091', '#93A283',

                "#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E",
                "#E6AB02", "#A6761D", "#666666", "#8DD3C7", "#FFFFB3",
                "#BEBADA", "#FB8072", "#80B1D3", "#FDB462", "#B3DE69",
                "#FCCDE5", "#BC80BD", "#CCEBC5", "#FFED6F", "#393B79",
                "#5254A3", "#6B6ECF", "#9C9EDE", "#637939", "#8CA252",
                "#B5CF6B", "#CEDB9C", "#8C6D31", "#BD9E39", "#E7BA52",
                "#E7CB94", "#843C39", "#AD494A", "#D6616B", "#E7969C",
                "#7B4173", "#A55194", "#CE6DBD", "#DE9ED6", "#3182BD",
                "#6BAED6", "#9ECAE1", "#C6DBEF", "#E6550D", "#FD8D3C",
                "#FDAE6B", "#FDD0A2", "#31A354", "#74C476", "#A1D99B"
            ];

            let hash = 0;

            if ( this.id || this.name ) {
                for ( let i = 0; i < `${this.id}_${this.name}`.length; i++ ) {
                    hash = `${this.id}_${this.name}`.charCodeAt(i) + ((hash << 5) - hash);
                }
            }

            hash = Math.abs(hash);
            const index1 = hash % colors.length;
            const index2 = hash % colors2.length;

            const color1 = colors[index1];
            const color2 = colors2[index2];

            return `background: linear-gradient(${index1}deg, ${color1} 70%, ${color2} 100%);`;
        },
    },
}
</script>

<template>
<div class="avatar" :style="!src ? background : ''">
    <img :src="UPLOADS_URL + src" v-if="src" />
    <template v-else>{{ initials }}</template>
</div>
</template>
