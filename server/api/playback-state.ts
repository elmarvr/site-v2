import { type H3Event } from "h3";
import {
  refreshToken,
  spotifyApiClient,
  currentlyPlayingTrack,
  recentlyPlayedTracks,
  type Track,
  type SpotifyApiClient,
} from "@ekwoka/spotify-api";

export default eventHandler(async (event) => {
  const token = await getAccessToken(event);

  const client = spotifyApiClient(token);

  const result = await client(currentlyPlayingTrack());

  if (!result?.item) {
    const item = await getLastPlayedTrack(client);

    return {
      track: normalizeTrack(item.track),
      isPlaying: false,
      timestamp: new Date(item.played_at).getTime(),
    };
  }

  return {
    track: normalizeTrack(result.item),
    isPlaying: result.is_playing,
    timestamp: result.timestamp,
  };
});

async function getLastPlayedTrack(client: SpotifyApiClient) {
  const cached = await hubKV().get<{
    track: Track;
    played_at: string;
  }>("spotify:last_played_track");

  if (cached) {
    return cached;
  }

  const { items } = await client(recentlyPlayedTracks({ limit: 1 }));

  await hubKV().set("spotify:last_played_track", items[0], {
    // Cache for 1 hour
    ttl: 60 * 60,
  });

  return items[0];
}

function normalizeTrack(track: Track) {
  return {
    id: track.id,
    name: track.name,
    externalUrl: track.external_urls.spotify,
    artists: track.artists.map((artist) => ({
      name: artist.name,
      externalUrl: artist.external_urls.spotify,
    })),
    album: {
      name: track.album.name,
      imageUrl: track.album.images[0]?.url,
      externalUrl: track.album.external_urls.spotify,
    },
  };
}

async function getAccessToken(event: H3Event) {
  const accessToken = await hubKV().get<string>("spotify:access_token");

  if (accessToken) {
    return accessToken;
  }

  const { spotifyRefreshToken, spotifyClientId, spotifyClientSecret } =
    useRuntimeConfig(event);

  const { access_token, expires_in } = await refreshToken(
    spotifyRefreshToken,
    spotifyClientId,
    spotifyClientSecret
  );

  await hubKV().set("spotify:access_token", access_token, {
    ttl: expires_in,
  });

  return access_token;
}
