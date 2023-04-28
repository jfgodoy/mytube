import { describe, it, expect } from 'vitest'
import { extractId } from './vimeo'

var urls = [
    {url: "https://vimeo.com/606787404", id: '606787404'},
];


describe('extractId', () => {
    urls.forEach(pair => {
        it(`should extract id from ${pair.url}`, () => {
            expect(extractId(pair.url)).toEqual(pair.id)
        })
    })
})
