<script setup lang="ts">

import { computed, ref } from 'vue';

import AppFormGroup from '@/components/AppFormGroup.vue'
import CentralizedMain from '@/components/CentralizedMain.vue';
import UserForm from '@/components/UserForm.vue';

import type { AppInputInstance } from '@/models/AppForm.js';

import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Auth } from '@/api/auth.js';

import { faHome } from '@fortawesome/free-solid-svg-icons';

const username = ref<AppInputInstance>()
const email = ref<AppInputInstance>()
const password = ref<AppInputInstance>()
const passwordConfirm = ref<AppInputInstance>()

const inputRefs = computed(()=> [username, email, password, passwordConfirm].filter(el => el.value).map(el => el.value) as AppInputInstance[])

const router = useRouter()

function passwordConfirmValidator(value: string): string {
    return value === password.value?.model ? '' : 'Password must match.'
}

async function onSubmit(formElement: HTMLFormElement, inputsWithError: AppInputInstance[]) {
    if (inputsWithError.length)
        return

    const un = username.value?.model
    const em = email.value?.model
    const pass = password.value?.model

    if (!un || !em || !pass)
        return

    const result = await Auth.signup(un, em, pass)
    
    if (Auth.userInstance.value) {
        alert("User created successfully")
        router.push({ name: 'home' })
    } else {
        username.value.setError(result.message)
    }
}

</script>

<template>
    <CentralizedMain>
        <RouterLink :to="{ name: 'home' }">
            <FontAwesomeIcon :icon="faHome"/> Home
        </RouterLink>

        <UserForm :input-refs="inputRefs"
                   @on-submit="onSubmit"
                   id="app-register-form">

            <h1>
                Create Your Account
            </h1> 

            <AppFormGroup id="username"
                          minlength="3"
                          maxlength="80"
                          required
                          name="username"
                          type="text"
                          label="Username"
                          v-model="username" />

            <AppFormGroup id="email"
                          maxlength="255"
                          required
                          name="email"
                          type="email"
                          label="Email"
                          v-model="email" />

            <AppFormGroup id="password"
                          minlength="14"
                          required
                          name="password"
                          type="password"
                          label="Password"
                          v-model="password" />

            <AppFormGroup id="password-confirm"
                          minlength="14"
                          required
                          name="password-confirm"
                          type="password"
                          label="Confirm Password"
                          :on-submit-validator="passwordConfirmValidator"
                          v-model="passwordConfirm" />
        </UserForm>

    </CentralizedMain>
</template>

<style>

#app-register-form h1 {
    margin-bottom: 0.5em;
}

#app-register-form > .app-form-group ~ * {
    margin-top: 2em;
}

</style>

