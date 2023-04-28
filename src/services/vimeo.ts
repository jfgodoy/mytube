import { tryFn } from "../utils";
import { type Video } from '../types'

export async function getVideoData(url: string): Promise<Video> {
    const videoId = extractId(url);
    const reqOpts = {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_VIMEO_API_KEY}`
        }
    }

    const res = await fetch(`https://api.vimeo.com/videos/${videoId}`, reqOpts).then(res => res.json())
    if (res.error) {
        throw new Error('falló la comunicación con la API de vimeo')
    }

    return {
        id: videoId,
        originalUrl: url,
        title: res.name,
        description: res.description,
        duration: res.duration,
        thumbnail: res.pictures.sizes[2].link,
        timestamp: Date.now(),
    }
}


export function extractId(url: string): string {
    const [err, parsedUrl] = tryFn(() => new URL(url))
    if (err) {
        throw new Error('url inválida')
    }
    return parsedUrl.pathname.replace('/', '')
}
