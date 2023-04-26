import { reactive } from "vue"
import { type Video } from "../types"

interface Store {
    videos: Video[],
    addVideo(video: Video): void,
    removeVideo(videoId: Video['id']): void,
}

export const store: Store = reactive<Store>({
    videos: [],
    addVideo(video: Video) {
        const found = this.videos.find(v => v.id === video.id)
        if (found) {
            throw new Error("el video ya existe en tu álbum")
        }
        this.videos.unshift(video)
        saveVideos()
    },
    removeVideo(videoId: Video['id']) {
        this.videos = this.videos.filter(v => v.id !== videoId)
        saveVideos()
    }
})

function loadVideos() {
    const jsonVideos = window.localStorage.getItem('videos')
    store.videos = jsonVideos ? JSON.parse(jsonVideos) : []
}

function saveVideos() {
    window.localStorage.setItem('videos', JSON.stringify(store.videos))
}

loadVideos()
