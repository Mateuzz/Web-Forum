<script setup lang="ts">

import AppInput from '@/components/AppInput.vue'

import type { AppInputInstance } from '@/models/AppForm.js';

type Props = {
    label: string
    id: string,
}

const props = defineProps<Props>()
const model = defineModel<AppInputInstance>()

</script>

<template>
    <div class="app-form-group">

        <label :for="props.id">
            {{ props.label }}
        </label>

        <div class="app-form-group-input-error-wrapper">

            <AppInput :ref="(el: any) => model = el"
                    v-bind="$attrs"
                    :id="props.id"/>

            <div class="app-form-error"
                v-if="model?.error">
                {{ model.error }}
            </div>

        </div>

    </div>
</template>
