<script setup lang="ts">

import { computed, ref } from 'vue'
import type { AppInputProps as Props } from '@/Models/AppInput.js'

const props = withDefaults(defineProps<Props>(), {
    validateOnInput: false,
})

const model = ref('')
const error = ref('')
const input = ref<HTMLInputElement | null>(null)

const id = computed(() => props.id ?? props.name)

defineExpose({ onSubmit, error, model, setError, input })

function setError(value: string) {
    error.value = value
}

async function onSubmit() {
    let er = ''
    if (props.onSubmitValidator) {
        er = await Promise.resolve(props.onSubmitValidator(model.value!))
        input.value!.setCustomValidity(er)
    }

    error.value = er || input.value!.validationMessage
}

async function onInput() {
    if (!props.validateOnInput) {
        return
    }

    let err = ''

    if (props.onInputValidator) {
        err = await Promise.resolve(props.onInputValidator(model.value!))
        input.value!.setCustomValidity(err)
    }

    error.value = err || input.value!.validationMessage
}

</script>

<template>
    <input v-model="model" :class="$style.input" :id :name="name" @input="onInput" ref="input">
</template>

<style module>
.input {
    background-color: var(--outerspace);
    color: var(--bone);
    box-shadow: 0 0 2px 0 var(--bone);
    outline: none;
    border: 0;
}

.input:focus {
    box-shadow: 0 0 2px 1px var(--bone);
}
</style>
