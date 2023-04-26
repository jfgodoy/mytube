import { type Video } from "../types"
import { tryFn } from "../utils"

export function getVideoData(url: string): Promise<Video> {
    const videoId = extractId(url)

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
                timestamp: Date.now(),
            }
			return video;
		});
}



export function extractId(url: string): string {
    const [err, parsedUrl] = tryFn(() => new URL(url))
    if (err) {
        throw new Error('url inválida')
    }

    let videoId;

    switch (parsedUrl.hostname) {
        case 'www.youtube.com':
            videoId = parsedUrl.searchParams.get('v');
            if (!videoId) {
                const match = parsedUrl.pathname.match(/\/(?:(?:embed)|v)\/([^"&?\/\s]{11})/)
                if (match) {
                    videoId = match[1]
                }
            }
            break;
        case 'youtu.be':
            videoId = parsedUrl.pathname.replace('/', '')
            break;
        default:
            throw new Error('El dominio de la url provista no esta soportado.')
    }

    if (!videoId) {
        throw new Error("No se pudo extraer el id del video desde la url proporcionada")
    }

    return videoId
}

