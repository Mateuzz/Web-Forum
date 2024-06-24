<template>
    <div :class="$style.modifiers">
        <slot/>
    </div>
</template>

<style module>

.modifiers {
    font-size: 0.9em;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--oninx);
    box-shadow: 0 0 1px 0 var(--bone);
    padding: 0.5em 1em;
    white-space: nowrap;
    row-gap: 1em;
    column-gap: 2em;

    --input-height: 2em;
    --input-min-width: 10em;
    --input-bg-color: var(--outerspace);
    --input-inline-padding: 0.25em;
}

.modifiers :is(input, select) {
    background-color: var(--input-bg-color);
    color: var(--bone);
    padding: 0 var(--input-inline-padding);
    min-width: var(--input-min-width);
    height: var(--input-height);
    box-shadow: 0 0 2px 0 var(--bone);
    font-size: 1em;
    outline: 0;
    border: 0;
}

.modifiers :is(input, select):focus {
    box-shadow: 0 0 2px 1px var(--bone);
}

.modifiers > * {
    display: flex;
    align-items: center;
    gap: 1em;
}

</style>

