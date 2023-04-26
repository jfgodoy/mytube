import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore/lite';
import db from './db';
import { tryAsyncFn } from '../../utils';
import { type Video } from '../../types';

const collectionName: string = 'videos';

export default {
	async getVideos(): Promise<Video[]> {
        const videosRef = collection(db, collectionName);
        const [err, videosSnapshot] = await tryAsyncFn(() => getDocs(query(videosRef, orderBy('timestamp', 'desc'))))
        if (err) {
            throw new Error('No se puedo recuperar la lista de videos desde la base de datos')
        }
		return videosSnapshot.docs.map((doc) => doc.data() as Video);
	},

	async hasVideo(id: string): Promise<boolean> {
        const [err, docSnapshot] = await tryAsyncFn(() => getDoc(doc(db, collectionName, id)))
        if (err) {
            throw new Error('Falló la comunicación con la base de datos')
        }
		return docSnapshot.exists()
	},

	async addVideo(video: Video) {
        const [err] = await tryAsyncFn(() => {
            const newVideo = doc(db, collectionName, video.id);
            return setDoc(newVideo, video);
        })
        if (err) {
            throw new Error('Falló la comunicación con la base de datos. El video no se ha guardado')
        }
	},

	async deleteVideo(idVideo: string) {
        const [err] = await tryAsyncFn(() => deleteDoc(doc(db, collectionName, idVideo)))
		if (err) {
			throw new Error('Falló la comunicación con la base de datos. El video no se ha eliminado');
        }
	}
};
