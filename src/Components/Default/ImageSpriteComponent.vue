<script>
export default {
    name: 'ImageSpriteComponent',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
}
</script>

<template>
<i :class="`image-sprite image-sprite-${id}`"></i>
</template>
