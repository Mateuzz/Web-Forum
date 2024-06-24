<script setup lang="ts">
import { ref } from 'vue';
import type { AppFormProps, AppInputInstance } from '@/models/AppForm.js';

const emit = defineEmits<{
    onSubmit: [formElement: HTMLFormElement, inputsWithErrors: AppInputInstance[]] 
}>()

const props = defineProps<AppFormProps>()

const form = ref<HTMLFormElement>()

async function onSubmit(event: Event) {
    for (const input of props.inputRefs) {
        await input!.onSubmit()
    } 

    const inputsWithError = props.inputRefs.filter(input => input!.error)

    // we assume is not null
    emit('onSubmit', form.value!, inputsWithError as AppInputInstance[])

    event.preventDefault()
}

</script>

<template>
    <form ref="form"
        @submit="onSubmit"
        novalidate>
        <slot/>
    </form>
</template>

<style module>

</style>
