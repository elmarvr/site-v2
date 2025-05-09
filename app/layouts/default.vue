<template>
  <Html>
    <Body>
      <div class="max-w-2xl mx-auto container px-4">
        <header
          class="flex justify-between items-center py-3 sticky top-0 bg-background z-10"
        >
          <NuxtLinkLocale to="/">
            <h1 class="font-semibold">Elmar</h1>
          </NuxtLinkLocale>
          <!-- <nav>
            <ul class="flex">
              <li>
                <UiLinkButton to="/projects">
                  <Icon name="ph:brackets-curly" />
                </UiLinkButton>
              </li>
              <li>
                <UiLinkButton to="/snippets">
                  <Icon name="ph:scissors" />
                </UiLinkButton>
              </li>

              <li>
                <LocaleSelect>
                  <LocaleSelectTrigger />
                </LocaleSelect>
              </li>
            </ul>
          </nav> -->
        </header>

        <main class="w-full py-4 sm:py-8">
          <slot />
        </main>
      </div>
    </Body>
  </Html>
</template>
