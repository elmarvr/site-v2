<script lang="ts" setup>
const { data } = useFetch("/api/playback-state", {
  lazy: true,
  server: false,
});

const { d } = useI18n();

const formattedDate = computed(() => {
  if (!data.value) return null;

  return d(data.value.timestamp, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "numeric",
    timeZoneName: "short",
  });
});
</script>

<template>
  <div class="p-2 bg-card/20 rounded not-prose">
    <div class="flex gap-4">
      <UiSkeleton class="size-14" v-if="!data" />
      <a v-else class="size-14 flex rounded overflow-hidden">
        <NuxtImg
          :src="data.track?.album?.imageUrl"
          :alt="data.track?.album?.name"
        />
      </a>

      <div>
        <template v-if="!data">
          <UiSkeleton class="h-4 my-1 w-56" />
          <UiSkeleton class="h-3 mt-2 w-32" />
        </template>
        <template v-else>
          <a :href="data.track?.externalUrl" class="font-medium">
            {{ data.track?.name }}
          </a>
          <p class="text-sm text-muted-foreground">
            <template
              v-for="(artist, index) in data.track?.artists"
              :key="artist.externalUrl"
            >
              <a :href="artist.externalUrl" class="hover:underline">
                {{ artist.name }}
              </a>

              <template v-if="index < data.track?.artists.length - 1">
                ,
              </template>
            </template>
          </p>
        </template>
      </div>
    </div>

    <div class="flex items-center text-sm text-muted-foreground mt-2">
      <UiSkeleton v-if="!data" class="h-3 my-1 w-64" />

      <template v-else>
        <SpotifyIndicator :active="data?.isPlaying" class="mr-2" />
        <p>
          <template v-if="data.isPlaying">
            {{ $t("player.listening-now") }}
          </template>
          <template v-else>
            {{ $t("player.last-played-at") }}
            {{ formattedDate }}
          </template>
        </p>
      </template>
    </div>
  </div>
</template>
