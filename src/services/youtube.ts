import { type Video } from "../types"

export function getVideoData(url: string): Promise<Video> {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get('v');
    if (!videoId) {
        throw new Error("video id not found")
    }

    const youtubeRequest = new URL(import.meta.env.VITE_YOUTUBE_API_URL + '/videos')
    youtubeRequest.searchParams.append('id', videoId)
    youtubeRequest.searchParams.append('key', import.meta.env.VITE_YOUTUBE_API_KEY)
    youtubeRequest.searchParams.append('part', 'snippet,contentDetails')
    youtubeRequest.searchParams.append('hl', 'es-419')

	return fetch(youtubeRequest)
		.then((res) => res.json())
		.then((res) => {
			if (!res.items.length) {
				throw new Error('video no encontrado en YouTube');
            }
            const item = res.items[0];
            const video = {
                id: item.id,
                originalUrl: url,
                title: item.snippet.localized.title,
                description: item.snippet.localized.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                duration: item.contentDetails.duration,
            }
			return video;
		});
}
