'use client'

type SoundKey =
  | 'ambience'
  | 'prelude'
  | 'battleStart'
  | 'march'
  | 'battleImpact'
  | 'victory'
  | 'defeat'

type SoundConfig = {
  src: string
  volume: number
  loop?: boolean
}

const SOUNDS: Record<SoundKey, SoundConfig> = {
  ambience: { src: '/sound/castle_ambience_wind.mp3', volume: 0.18, loop: true },
  prelude: { src: '/sound/hor2.mp3', volume: 0.18, loop: true },
  battleStart: { src: '/sound/horn.mp3', volume: 0.52 },
  march: { src: '/sound/marching_loop.mp3', volume: 0.28, loop: true },
  battleImpact: { src: '/sound/sword_clash.mp3', volume: 0.5 },
  victory: { src: '/sound/vic2.mp3', volume: 0.55 },
  defeat: { src: '/sound/defeat_atring.mp3', volume: 0.48 },
}

const loopPlayers = new Map<SoundKey, HTMLAudioElement>()
let unlocked = false

const canPlayAudio = () => typeof window !== 'undefined' && typeof Audio !== 'undefined'

const makeAudio = (key: SoundKey) => {
  const config = SOUNDS[key]
  const audio = new Audio(config.src)
  audio.preload = 'auto'
  audio.volume = config.volume
  audio.loop = Boolean(config.loop)
  return audio
}

export const gameAudio = {
  unlock() {
    if (!canPlayAudio() || unlocked) return
    unlocked = true
    Object.keys(SOUNDS).forEach((key) => {
      const audio = makeAudio(key as SoundKey)
      audio.load()
    })
  },

  play(key: SoundKey, volumeScale = 1) {
    if (!canPlayAudio()) return
    const audio = makeAudio(key)
    audio.volume = Math.min(1, SOUNDS[key].volume * volumeScale)
    audio.play().catch(() => {})
  },

  startLoop(key: SoundKey, volumeScale = 1) {
    if (!canPlayAudio()) return
    const existing = loopPlayers.get(key)
    if (existing && !existing.paused) return

    const audio = existing ?? makeAudio(key)
    audio.currentTime = 0
    audio.volume = Math.min(1, SOUNDS[key].volume * volumeScale)
    audio.loop = true
    loopPlayers.set(key, audio)
    audio.play().catch(() => {})
  },

  stopLoop(key: SoundKey) {
    const audio = loopPlayers.get(key)
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  },

  stopAllLoops() {
    loopPlayers.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
  },
}
