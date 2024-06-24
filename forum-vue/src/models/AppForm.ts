import AppInput from "@/components/AppInput.vue"
import AppSelect from '@/components/AppSelect.vue'
import type { ComponentPublicInstance } from "vue"

export type AppInputInstance = InstanceType<typeof AppInput>
export type AppSelectInstance = InstanceType<typeof AppSelect>

export type AppFormProps = { 
    inputRefs: (AppInputInstance | AppSelectInstance)[]
    submitName?: string
}