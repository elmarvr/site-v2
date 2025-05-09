<script setup lang="ts">
import type { UnwrapRef } from "vue";

const { locale } = useI18n();

const collection = computed(() => {
  return `snippets_${locale.value}` as const;
});

const { data: snippets } = await useAsyncData(collection.value, () => {
  return queryCollection(collection.value).order("date", "DESC").all();
});

const grouped = computed(() => {
  const _grouped: {
    date: Date;
    items: NonNullable<UnwrapRef<typeof snippets>>;
    showYear: boolean;
  }[] = [];

  for (const snippet of snippets.value ?? []) {
    const previous = _grouped[_grouped.length - 1];

    snippet.date = new Date(snippet.date);

    if (!previous) {
      _grouped.push({
        showYear: true,
        date: snippet.date,
        items: [snippet],
      });
      continue;
    }

    if (!isEqualDate(previous.date, snippet.date, "month")) {
      const showYear = !isEqualDate(previous.date, snippet.date, "year");

      _grouped.push({
        showYear,
        date: snippet.date,
        items: [snippet],
      });

      continue;
    }

    previous.items.push(snippet);
  }

  return _grouped;
});

function isEqualDate(a: Date, b: Date, type: "month" | "year") {
  if (type === "month") {
    return a.getMonth() === b.getMonth();
  }

  return a.getFullYear() === b.getFullYear();
}
</script>

<template>
  <div>
    <ul class="space-y-4">
      <div v-for="{ date, items, showYear } in grouped">
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
              :to="`${snippet.path}`"
            >
              {{ snippet.title }}
            </NuxtLinkLocale>

            <p>
              <!-- <Ordinal :value="new Date(snippet.date).getDate()" /> -->
            </p>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>
