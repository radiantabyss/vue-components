<script>
export default {
    name: 'BadgeComponent',
    props: {
        type: {
            type: String,
            required: true,
        }
    },
}
</script>

<template>
<div class="badge" :class="`badge--${type}`" :title="__(Str.ucwords(type))">
    <sprite :id="type" />
</div>
</template>
