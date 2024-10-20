<script setup>
import LinkButton from "~/components/ui/link-button.vue";

// const head = useLocaleHead({
//   addDirAttribute: true,
//   identifierAttribute: "id",
//   addSeoAttributes: true,
// });

// const title = computed(() => t(route.meta.title) ?? "Elmar");
</script>

<template>
  <Html>
    <Head> </Head>
    <Body>
      <div class="max-w-2xl mx-auto container">
        <header class="flex justify-between items-center py-3">
          <NuxtLinkLocale to="/">
            <h1 class="font-semibold">Elmar</h1>
          </NuxtLinkLocale>
          <nav>
            <ul class="flex">
              <li>
                <LinkButton to="/projects">
                  <Icon name="ph:brackets-curly" />
                </LinkButton>
              </li>
              <li>
                <LinkButton to="/snippets">
                  <Icon name="ph:scissors" />
                </LinkButton>
              </li>

              <li>
                <LocaleSelect>
                  <LocaleSelectTrigger />
                </LocaleSelect>
              </li>
            </ul>
          </nav>
        </header>

        <slot />
      </div>
    </Body>
  </Html>
</template>
