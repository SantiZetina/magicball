import { useState, useCallback } from 'react'
import {
  Shader,
  CursorRipples,
  FilmGrain,
  FloatingParticles,
  LensFlare,
  Spherize,
  StudioBackground,
  Swirl,
} from 'shaders/react'
import responses from '../data/response.js'

export default function Magic8Ball() {
  const [response, setResponse] = useState(null)
  const [isShaking, setIsShaking] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const handleClick = useCallback(() => {
    if (isShaking) return

    setShowResponse(false)
    setIsShaking(true)

    setTimeout(() => {
      setResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsShaking(false)
      setShowResponse(true)
    }, 600)
  }, [isShaking])

  return (
    <div
      className={`magic-ball relative size-[min(96vw,88dvh)] rounded-full overflow-hidden cursor-pointer select-none shadow-[0_0_80px_20px_rgba(133,193,222,0.15)]${isShaking ? ' animate-shake' : ''}`}
      onClick={handleClick}
    >
      <Shader className="w-full h-full">
        <StudioBackground
          ambientIntensity={32}
          ambientSpeed={0.3}
          backColor="#1a0f2e"
          backIntensity={34}
          backSoftness={61}
          brightness={5}
          center={{ x: 0.49, y: 0.95 }}
          color="#17171c"
          fillAngle={84}
          fillColor="#ffffff"
          fillIntensity={55}
          fillSoftness={100}
          keyColor="#ffffff"
          keyIntensity={15}
          keySoftness={70}
          lightTarget={64}
          seed={42}
          vignette={25}
          wallCurvature={42}
        />
        <Spherize
          depth={1.1}
          lightColor="#85c1de"
          lightIntensity={0.3}
          lightPosition={{ x: 0.62, y: 0.01 }}
          lightSoftness={0.2}
          radius={0.9}
        >
          <Swirl
            colorA="#0a0a0d"
            colorB="#0f0f1a"
            colorSpace="oklab"
            detail={1.2}
            speed={0.5}
          />
          <LensFlare
            ghostChroma={0}
            ghostIntensity={0.35}
            ghostSpread={0.78}
            glareIntensity={0.15}
            glareSize={0.15}
            haloChroma={2}
            haloIntensity={0.27}
            haloRadius={0.38}
            haloSoftness={1.1}
            lightPosition={{ x: 0.57, y: 0.25 }}
            speed={0.9}
            starburstIntensity={0.05}
            starburstPoints={4}
            streakIntensity={0}
            streakLength={0.21}
          />
          <FloatingParticles
            angle={188}
            angleVariance={77}
            opacity={0.49}
            particleColor="#d0c8e3"
            particleSize={0.6}
            randomness={0.3}
            speed={0.1}
            speedVariance={0.6}
            twinkle={1}
          />
          <CursorRipples
            chromaticSplit={3}
            decay={4}
          />
        </Spherize>
        <FilmGrain strength={0.01} visible={true} />
      </Shader>

      {showResponse && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3/4 pointer-events-none">
          <p className="animate-fade-in text-white text-center font-semibold text-2xl drop-shadow-[0_0_12px_rgba(133,193,222,0.9)]">
            {response}
          </p>
        </div>
      )}

      {!response && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full pointer-events-none">
          <p className="text-white/30 text-center text-sm tracking-widest uppercase">
            Tap to reveal
          </p>
        </div>
      )}
    </div>
  )
}
