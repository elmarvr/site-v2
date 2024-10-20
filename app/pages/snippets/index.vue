<script setup lang="ts">
definePageMeta({
  title: "page.snippets.title",
  description: "page.snippets.description",
});

const { locale } = useI18n();
const { data: snippets } = await useAsyncData("snippets", async () => {
  const snippets = await queryContent("snippets")
    .sort({
      date: -1,
    })
    .locale(locale.value)
    .find();

  const grouped: {
    date: Date;
    items: typeof snippets;
    showYear: boolean;
  }[] = [];

  for (const snippet of snippets) {
    const previous = grouped[grouped.length - 1];

    snippet.date = new Date(snippet.date);

    if (!previous) {
      grouped.push({
        showYear: true,
        date: snippet.date,
        items: [snippet],
      });
      continue;
    }

    if (!isEqualDate(previous.date, snippet.date, "month")) {
      const showYear = !isEqualDate(previous.date, snippet.date, "year");

      grouped.push({
        showYear,
        date: snippet.date,
        items: [snippet],
      });

      continue;
    }

    previous.items.push(snippet);
  }

  return grouped;
});

function isEqualDate(a: Date, b: Date, type: "month" | "year") {
  if (type === "month") {
    return a.getMonth() === b.getMonth();
  }

  return a.getFullYear() === b.getFullYear();
}
</script>

<template>
  <div class="pt-8">
    <ul class="space-y-4">
      <div v-for="{ date, items, showYear } in snippets">
        <li class="flex justify-between font-semibold">
          <time>
            {{ $d(date, { month: "long" }) }}
          </time>

          <time v-if="showYear">
            {{ $d(date, { year: "numeric" }) }}
          </time>
        </li>

        <ul class="divide-y divide-border divide-dashed">
          <li
            v-for="snippet in items"
            class="flex justify-between py-3 items-center text-zinc-300"
          >
            <NuxtLinkLocale
              name="snippet-title"
              class="hover:underline underline-offset-2"
              :to="`${snippet._path}`"
            >
              {{ snippet.title }}
            </NuxtLinkLocale>

            <p>
              <Ordinal :value="new Date(snippet.date).getDate()" />
            </p>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>
