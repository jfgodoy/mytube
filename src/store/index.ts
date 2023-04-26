import { reactive } from "vue"
import { type Video } from "../types"

interface Store {
    videos: Video[],
    addVideo(video: Video): AddVideoResult,
    removeVideo(videoId: Video['id']): void,
}

enum AddVideoResult {
    Added,
    AlreadyExists
}


export const store: Store = reactive<Store>({
    videos: [],
    addVideo(video: Video): AddVideoResult {
        const found = this.videos.find(v => v.id === video.id)
        if (found) {
            return AddVideoResult.AlreadyExists
        }
        this.videos.unshift(video)
        saveVideos()
        return AddVideoResult.Added
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
