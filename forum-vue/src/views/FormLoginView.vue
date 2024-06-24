<script setup lang="ts">

import { computed, ref, watch, type Ref } from 'vue';

import AppFormGroup from '@/components/AppFormGroup.vue'
import UserForm from '@/components/UserForm.vue'
import CentralizedMain from '@/components/CentralizedMain.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import type { AppInputInstance } from '@/models/AppForm.js';

import { Auth } from '@/api/auth.js';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const email = ref<AppInputInstance>()
const password = ref<AppInputInstance>()

const router = useRouter()

async function onSubmit(formElement: HTMLFormElement, inputsWithError: AppInputInstance[]) {
    if (inputsWithError.length) 
        return

    const em = email.value?.model
    const passwd = password.value?.model

    if (!em || !passwd) 
        return

    const result = await Auth.login(em, passwd)

    if (Auth.userInstance.value) {
        alert("Logged successfully")
        router.push({ name: 'home' })
    } else {
        email.value.setError(result.message)
    }
}

</script>

<template>
    <CentralizedMain>
        <RouterLink :to="{ name: 'home' }">
            <FontAwesomeIcon :icon="faHome"/> Home
        </RouterLink>

        <UserForm :input-refs="[email, password]"
                  @on-submit="onSubmit"
                  id="app-login-form">

        <h1>
            Login on Your Account
        </h1>

            <AppFormGroup id="email"
                          required
                          name="email"
                          type="email"
                          label="Email"
                          maxlength="255"
                          v-model="email" />

            <AppFormGroup id="password"
                          required
                          name="password"
                          type="password"
                          label="Password"
                          minlength="14"
                          v-model="password" />

        </UserForm>
    </CentralizedMain>
</template>

<style>

#app-login-form h1 {
    margin-bottom: 0.5em;
}

#app-login-form > .app-form-group ~ * {
    margin-top: 2em;
}

</style>
