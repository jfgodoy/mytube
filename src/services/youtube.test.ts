import { describe, it, expect } from 'vitest'
import { extractId } from './youtube'

var urls = [
    {url: "http://youtu.be/pdAS0T2nCtU", id: 'pdAS0T2nCtU'},
    {url: "https://youtu.be/pdAS0T2nCtU", id: 'pdAS0T2nCtU'},
    {url: "http://www.youtube.com/embed/pdAS0T2nCtU", id: 'pdAS0T2nCtU'},
    {url: "https://www.youtube.com/embed/pdAS0T2nCtU", id: 'pdAS0T2nCtU'},
    {url: "http://www.youtube.com/v/pdAS0T2nCtU?fs=1&hl=en_US", id: 'pdAS0T2nCtU'},
    {url: "http://www.youtube.com/watch?v=pdAS0T2nCtU", id: 'pdAS0T2nCtU'},
    {url: "http://www.youtube.com/watch?v=pdAS0T2nCtU&feature=featured", id: 'pdAS0T2nCtU'},
];


describe('extractId', () => {
    urls.forEach(pair => {
        it(`should extract id from ${pair.url}`, () => {
            expect(extractId(pair.url)).toEqual(pair.id)
        })
    })
})
