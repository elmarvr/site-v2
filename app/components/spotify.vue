<script lang="ts" setup>
const { data } = await useFetch("/api/playback-state");
</script>

<template>
  <div v-if="data" class="p-2 bg-card/20 rounded">
    <div class="h-14 flex items-center">
      <div class="aspect-square h-full rounded overflow-hidden">
        <a v-if="data.track" :href="data.track.album.externalUrl">
          <img :src="data.track.album.imageUrl" :alt="data.track.album.name" />
        </a>
      </div>
      <div class="ml-4">
        <a v-if="data.track" :href="data.track.externalUrl" class="font-medium">
          {{ data.track.name }}
        </a>
        <p class="text-sm text-muted-foreground">
          <span
            v-for="(artist, index) in data.track.artists"
            :key="artist.externalUrl"
          >
            <a v-if="artist" :href="artist.externalUrl" class="hover:underline">
              {{ artist.name }}
            </a>

            <template v-if="index < data.track.artists.length - 1">, </template>
          </span>
        </p>
      </div>
    </div>

    <div class="flex items-center text-sm text-muted-foreground mt-2">
      <template v-if="data.isPlaying">
        <div class="size-2 relative mr-2">
          <div
            className="absolute animate-ping h-full aspect-square rounded-full bg-primary"
          />
          <div className="h-full aspect-square rounded-full bg-primary" />
        </div>

        {{ $t("player.listening-now") }}
      </template>
      <p v-else>
        {{ $t("player.last-played-at") }}

        {{
          $d(data.timestamp, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "numeric",
            timeZoneName: "short",
          })
        }}
      </p>
    </div>
  </div>
</template>
