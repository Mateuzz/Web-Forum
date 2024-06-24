<template>
    <main :class="$style.main">
        <div :class="$style.centralized">
            <slot/>
        </div>
    </main>
</template>

<style module>

.main {
    position: relative;
    height: 100vh;
    background-color: var(--earie-black);
}

.centralized {
    top: 50%;
    left: 50%;
    width: 90%;
    max-width: 40em;
    transform: translate(-50%, -50%);
    position: relative;
}


</style>