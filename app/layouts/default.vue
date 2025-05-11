<template>
  <Html>
    <Body>
      <div class="max-w-2xl mx-auto container px-4">
        <header
          class="flex justify-between items-center py-3 sticky top-0 bg-background z-10"
        >
          <NuxtLinkLocale to="/" :class="focusRing({ class: 'font-semibold' })">
            Elmar
          </NuxtLinkLocale>
          <nav>
            <ul class="flex">
              <li>
                <UiLinkButton
                  to="/work"
                  active-class="!text-primary"
                  :aria-label="$t('nav.work')"
                >
                  <Icon name="ph:brackets-curly" />
                </UiLinkButton>
              </li>
              <li>
                <UiLinkButton
                  to="/code"
                  active-class="!text-primary"
                  :aria-label="$t('nav.code')"
                >
                  <Icon name="ph:scissors" />
                </UiLinkButton>
              </li>

              <li>
                <I18nLocaleSelect>
                  <I18nLocaleSelectTrigger />
                </I18nLocaleSelect>
              </li>
            </ul>
          </nav>
        </header>

        <main class="w-full py-4 sm:py-8">
          <slot />
        </main>
      </div>
    </Body>
  </Html>
</template>
