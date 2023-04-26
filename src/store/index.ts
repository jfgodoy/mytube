import { reactive } from "vue"
import { type Video } from "../types"
import firestore from '../services/firebase/videos'

interface Store {
    videos: Video[],
    addVideo(video: Video): void,
    removeVideo(videoId: Video['id']): void,
}

export const store: Store = reactive<Store>({
    videos: [],
    async addVideo(video: Video) {
        const found = await firestore.hasVideo(video.id)
        if (found) {
            throw new Error("el video ya existe en tu álbum")
        }
        await firestore.addVideo(video)
        await loadVideos()
    },
    async removeVideo(videoId: Video['id']) {
        await firestore.deleteVideo(videoId)
        await loadVideos()
    }
})

async function loadVideos() {
    store.videos = await firestore.getVideos()
}



loadVideos()
