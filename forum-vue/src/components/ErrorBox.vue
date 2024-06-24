<script setup lang="ts">
    defineProps<{
        error?: string
    }>()

</script>

<template>
    <div :class="$style.error" v-if="$props.error">
        {{ $props.error }}
    </div>
</template>

<style module>

.error {
    border: 1px solid var(--error-primary);
    color: var(--error-primary);
    background-color: var(--error-bg-1);
    padding: 0.75em 0.5em;
    border-radius: 0.25em;
}

</style>
