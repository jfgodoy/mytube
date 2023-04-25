import { reactive } from "vue"
import { type Video } from "../types"

interface State {
    videos: Video[]
}

enum AddVideoResult {
    Added,
    AlreadyExists
}


const state: State = reactive({
    videos: []
})

function loadVideos() {
    const jsonVideos = window.localStorage.getItem('videos')
    state.videos = jsonVideos ? JSON.parse(jsonVideos) : []
}

function saveVideos() {
    window.localStorage.setItem('videos', JSON.stringify(state.videos))
}

export function useStore() {
    loadVideos()

    function addVideo(video: Video): AddVideoResult {
        const found = state.videos.find(v => v.id === video.id)
        if (found) {
            return AddVideoResult.AlreadyExists
        }
        state.videos.unshift(video)
        saveVideos()
        return AddVideoResult.Added
    }

    function removeVideo(videoId: Video['id']) {
        state.videos = state.videos.filter(v => v.id !== videoId)
        saveVideos()
    }

    return {
        state,
        addVideo,
        removeVideo
    }
}
