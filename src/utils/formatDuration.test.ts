import { describe, it, expect } from 'vitest'
import { formatDuration } from './formatDuration'

describe('formatDuration', () => {
    it('should format duration with minutes and seconds', () => {
      const input = 'PT3M45S'
      const expectedOutput = '3:45'
      const output = formatDuration(input)
      expect(output).toEqual(expectedOutput)
    })

    it('should format duration with hours, minutes, and seconds', () => {
      const input = 'PT1H23M45S'
      const expectedOutput = '1:23:45'
      const output = formatDuration(input)
      expect(output).toEqual(expectedOutput)
    })

    it('should return "--:--" for invalid input', () => {
      const input = 'invalid'
      const expectedOutput = '--:--'
      const output = formatDuration(input)
      expect(output).toEqual(expectedOutput)
    })

    it('should handle input without minutes or seconds', () => {
      const input = 'PT1H'
      const expectedOutput = '1:00:00'
      const output = formatDuration(input)
      expect(output).toEqual(expectedOutput)
    })

    it('should handle input with days', () => {
      const input = 'P1DT1S'
      const expectedOutput = '1:00:00:01'
      const output = formatDuration(input)
      expect(output).toEqual(expectedOutput)
    })
  })
