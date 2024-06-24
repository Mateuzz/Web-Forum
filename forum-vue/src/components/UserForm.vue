<script setup lang="ts">

import AppForm from '@/components/AppForm.vue';

import type { AppFormProps as Props } from '@/models/AppForm.js';

withDefaults(defineProps<Props>(), {
    submitName: 'Submit'
})

</script>

<template>
    <AppForm class="user-form" 
            :input-refs="$props.inputRefs"
            :class="$style.form">

        <slot></slot>

        <button type="submit"
            :class="$style.button">{{ $props.submitName }}</button>

    </AppForm>
</template>

<style module>

.form {
    background-color: var(--outerspace);
    padding: 2em 2em;
    border-radius: 1.0em;
}

.button {
    width: 100%;
    height: 4em;
    color: var(--tea-green);
    background-color: var(--oninx);
    box-shadow: 0 0 2px 0 var(--bone);
    border: 0;
}

.button:hover {
    background-color: var(--tea-green);
    color: var(--oninx);
    cursor: pointer
}

</style>

<style>

.user-form .app-form-group {
    display: flex;
    align-items: center;
}

.user-form label {
    flex: 1;
    text-align: left;
}

.user-form :is(input, select) {
    font-size: 1em;
    padding: 0.5em 0.5em;
    width: 100%;
    border-left: 1px solid var(--bone);
}

.user-form .app-form-group-input-error-wrapper {
    flex: 3;
}

.user-form .app-form-group-input-error-wrapper > * ~ * {
    margin-top: 0.5em;
}

.user-form .app-form-error {
    font-size: 0.8em;
    color: #d80;
}

</style>
