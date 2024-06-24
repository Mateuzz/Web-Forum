<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

type Props = {
    article: HTMLElement
    liClass?: string,
    linkClass?: string,
    linkActiveClass?: string
    scrollParentElement?: HTMLElement
}

type QuickLink = {
    href: string,
    title: string,
    level: string,
    headingElement: HTMLHeadingElement,
}

const props = withDefaults(defineProps<Props>(), {
    linkClass: 'headings-navigator-link',
    liClass: 'headings-navigator-li',
    linkActiveClass: 'headings-navigator-link-active',
})

const activeLinkHref = ref<string>('')

const links = computed(() => build(props.article))
const scrollAttachment = computed(() => props.scrollParentElement || window)

computeActiveQuickLink()

watch(scrollAttachment, () => {
    scrollAttachment.value.removeEventListener('scroll', computeActiveQuickLink)
    scrollAttachment.value.addEventListener('scroll', computeActiveQuickLink)
}, { immediate: true, deep: false })

onUnmounted(() => {
    scrollAttachment.value.removeEventListener('scroll', computeActiveQuickLink)
})

function getViewportOffsetTop(link: QuickLink, scrollTop: number, parent: HTMLElement): number {
    let viewportOffsetH = link.headingElement.offsetTop - scrollTop

    if (link.headingElement.offsetParent !== parent)
        viewportOffsetH -= parent.offsetTop

    return viewportOffsetH
}

function computeActiveQuickLink(): void {
    let scrollTop = 0

    if ('scrollY' in scrollAttachment.value)
        scrollTop = scrollAttachment.value.scrollY
    else
        scrollTop = scrollAttachment.value.scrollTop


    for (let i = 0; i < links.value.length; ++i) {
        const viewportOffsetBegin = getViewportOffsetTop(links.value[i], scrollTop, props.article)
        let viewportOffsetEnd = -1

        if (i < links.value.length - 1)
            viewportOffsetEnd = getViewportOffsetTop(links.value[i + 1], scrollTop, props.article)

        if (viewportOffsetBegin >= 0 || viewportOffsetEnd >= 0) {
            activeLinkHref.value = links.value[i].href
            return
        }
    }
}

function build(rootArticle: HTMLElement): QuickLink[] {
    const localLinks: QuickLink[] = []
    let n = 0
    const headings = rootArticle.querySelectorAll('h1, h2, h3, h4, h5, h6') as NodeListOf<HTMLHeadingElement>

    if (!headings.length)
        return []

    for (const heading of headings) {
        const headingLevel = Number(heading.tagName.slice(1))
        const id = heading.id || (heading.id = `title${n}-${heading.textContent}`)
        const className = `level-${headingLevel}`

        localLinks.push({
            href: `#${id}`,
            title: heading.textContent ?? '',
            level: className, 
            headingElement: heading
        })

        ++n
    }

    return localLinks
}

</script>

<template>
    <ul>
        <li :class="props.liClass">
            <RouterLink v-for="link in links" :to="link.href"
                :class="[props.linkClass, link.level, link.href == activeLinkHref ? props.linkActiveClass : '']">
                {{ link.title }}
            </RouterLink>
        </li>
    </ul>
</template>
