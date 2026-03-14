'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import styles from './SplashScreen.module.css'

const ThroneScene3D = dynamic(() => import('./ThroneScene3D'), { ssr: false })

const TITLE_CHARS = 'IRON\u00A0THRONE'.split('')

const HOUSES = [
  'House Stark',
  'House Lannister',
  'House Targaryen',
  'House Tyrell',
]
const REVEAL_IMAGE = '/images/ui/got-main-splash.png'

type RevealPiece = {
  id: string
  clipPath: string
  start: { x: number; y: number; rotate: number; scale: number }
}

const REVEAL_COLS = 4
const REVEAL_ROWS = 3

const REVEAL_PIECES: RevealPiece[] = Array.from(
  { length: REVEAL_COLS * REVEAL_ROWS },
  (_, idx) => {
    const col = idx % REVEAL_COLS
    const row = Math.floor(idx / REVEAL_COLS)

    const left = (col / REVEAL_COLS) * 100
    const right = ((col + 1) / REVEAL_COLS) * 100
    const top = (row / REVEAL_ROWS) * 100
    const bottom = ((row + 1) / REVEAL_ROWS) * 100

    const fromLeft = col < REVEAL_COLS / 2
    const horizontalDistance = fromLeft
      ? -(740 + col * 70)
      : 740 + (REVEAL_COLS - col) * 70
    const verticalOffset = (row - 1) * 32

    return {
      id: `piece-${row}-${col}`,
      clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
      start: {
        x: horizontalDistance,
        y: verticalOffset,
        rotate: fromLeft ? -10 + row * 2 : 10 - row * 2,
        scale: 1.1,
      },
    }
  }
)

export default function SplashScreen() {
  const [exiting, setExiting] = useState(false)
  const router = useRouter()

  const handleEnter = () => {
    setExiting(true)
    setTimeout(() => router.push('/simulation'), 900)
  }

  return (
    <div className={styles.root}>
      {/* Fire glow background */}
      <div className={styles.bg} />

      {/* ── Opening cinematic 3D stage ── */}
      <motion.div
        className={styles.heroStage}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 10.8, times: [0, 0.1, 0.82, 1] }}
      >
        <motion.div
          className={styles.heroCanvas}
          initial={{ scale: 1.14, y: 40 }}
          animate={{ scale: [1.14, 1.02, 1.08], y: [40, 0, -12] }}
          transition={{ duration: 9.3, ease: [0.2, 0.9, 0.2, 1], times: [0, 0.7, 1] }}
        >
          <ThroneScene3D />
        </motion.div>

        <motion.div
          className={styles.heroAtmosphere}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.35] }}
          transition={{ duration: 2.3, delay: 0.9, times: [0, 0.55, 1] }}
        />

      </motion.div>

      {/* ── Intro text / UI overlay ── */}
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 10.8,
          times: [0, 0.12, 0.79, 1],
        }}
      >
        {/* Top ornament */}
        <motion.div
          className={styles.ornament}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.65, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          ✦ ── ── ── ── ── ── ── ── ── ── ✦
        </motion.div>

        {/* Letter-by-letter title reveal */}
        <h1 className={styles.title}>
          {TITLE_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -45, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: 1.75 + i * 0.075,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle — letter-spacing animates in */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1.4, delay: 3.0 }}
        >
          Chaos of Crowns
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 3.5 }}
        />

        {/* House names — staggered */}
        <motion.div
          className={styles.housesRow}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.14, delayChildren: 3.7 },
            },
            hidden: {},
          }}
        >
          {HOUSES.map((house, i) => (
            <motion.span
              key={house}
              className={styles.houseName}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              {house}
              {i < HOUSES.length - 1 && (
                <span className={styles.dot}>◆</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className={styles.ornament}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.65, scaleX: 1 }}
          transition={{ duration: 1, delay: 4.8 }}
        >
          ✦ ── ── ── ── ── ── ── ── ── ── ✦
        </motion.div>
      </motion.div>

      {/* Smoke and fire bridge before second screen */}
      <motion.div
        className={styles.fireBridge}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0.92, 0] }}
        transition={{ duration: 11.4, times: [0, 0.62, 0.72, 0.84, 1] }}
      >
        <motion.div
          className={styles.fireBloom}
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: [0.86, 1.08, 1.24], opacity: [0, 0.85, 0] }}
          transition={{ duration: 2.2, delay: 7.0, times: [0, 0.42, 1] }}
        />
        <motion.div
          className={styles.smokeVeil}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.76, 0.15, 0] }}
          transition={{ duration: 2.5, delay: 6.9, times: [0, 0.38, 0.8, 1] }}
        />
      </motion.div>

      {/* Final cinematic reveal: image pieces fly in and fuse */}
      <motion.div
        className={styles.finalReveal}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: 12, times: [0, 0.69, 0.8, 1] }}
      >
        <div className={styles.finalFxLayer}>
          <div className={styles.finalSmokeA} />
          <div className={styles.finalSmokeB} />
          {Array.from({ length: 24 }, (_, i) => {
            const left = ((i * 17) % 100) + '%'
            const delay = `${(i % 8) * 0.22}s`
            const duration = `${2.4 + (i % 5) * 0.45}s`
            const size = `${3 + (i % 4) * 2}px`

            const particleStyle: CSSProperties = {
              left,
              animationDelay: delay,
              animationDuration: duration,
              width: size,
              height: size,
            }

            return <span key={`fx-ember-${i}`} className={styles.finalEmber} style={particleStyle} />
          })}
        </div>

        <motion.div
          className={styles.revealFrame}
          initial={{ scale: 1.06, filter: 'blur(8px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 8.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {REVEAL_PIECES.map((piece, index) => {
            const pieceStyle: CSSProperties = {
              clipPath: piece.clipPath,
              backgroundImage: `url(${REVEAL_IMAGE})`,
            }

            return (
              <motion.div
                key={piece.id}
                className={styles.revealPiece}
                style={pieceStyle}
                initial={{
                  opacity: 0,
                  x: piece.start.x,
                  y: piece.start.y,
                  rotate: piece.start.rotate,
                  scale: piece.start.scale,
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.05,
                  delay: 8.3 + index * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )
          })}

          <motion.div
            className={styles.revealGlow}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.35] }}
            transition={{ duration: 1.1, delay: 9.25, times: [0, 0.45, 1] }}
          />
        </motion.div>

        <motion.button
          className={styles.enterBtn}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 9.65 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnter}
        >
          Enter the Realm
        </motion.button>
      </motion.div>

      {/* Black fade-out when entering realm */}
      {exiting && (
        <motion.div
          className={styles.exitOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85 }}
        />
      )}
    </div>
  )
}
