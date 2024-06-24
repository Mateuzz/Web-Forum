<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    defineProps<{
        icon: object
    }>() 
</script>

<template>
    <button :class="$style.buttonIcon">
        <FontAwesomeIcon :icon="$props.icon"/>
    </button>
</template>

<style module>

.buttonIcon {
    background-color: var(--oninx);
    border: 0;
    font-size: 16px;
    cursor: pointer;
    color: var(--bone);
}

</style>
