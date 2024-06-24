<script setup lang="ts">

import AppSelect from './AppSelect.vue'

import type { AppSelectInstance } from '@/models/AppForm.js';

type Props = {
    label: string
    id: string,
}

const props = defineProps<Props>()
const model = defineModel<AppSelectInstance>()

</script>

<template>
    <div class="app-form-group">

        <label :for="props.id">
            {{ props.label }}
        </label>

        <div class="app-form-group-input-error-wrapper">

            <AppSelect :ref="(el: any) => model = el"
                    v-bind="$attrs"
                    :id="props.id">
                <slot/>
            </AppSelect>

            <div class="app-form-error"
                v-if="model?.error">
                {{ model.error }}
            </div>

        </div>

    </div>
</template>
