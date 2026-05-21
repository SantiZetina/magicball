import { useState, useCallback } from 'react'
import {
  Shader,
  CursorRipples,
  Emboss,
  FilmGrain,
  FloatingParticles,
  LensFlare,
  SmokeFill,
  Spherize,
  Strands,
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
      className="magic-ball relative size-[min(96vw,88dvh)] rounded-full overflow-hidden cursor-pointer select-none shadow-[0_0_80px_20px_rgba(30,80,255,0.2)]"
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
          lightColor="#a9cbe8"
          lightIntensity={0.3}
          lightPosition={{ x: 0.62, y: 0.01 }}
          lightSoftness={0.2}
          radius={0.9}
        >
          <Swirl
            colorA="#1c1c1f"
            colorB="#10101f"
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
            speed={1.5}
            starburstIntensity={0.05}
            starburstPoints={4}
            streakIntensity={0}
            streakLength={0.21}
          />
          <FloatingParticles
            angle={188}
            angleVariance={77}
            opacity={0.49}
            particleColor="#c5b7ed"
            particleSize={0.1}
            randomness={0.4}
            speed={0.1}
            speedVariance={0.6}
            twinkle={1}
          />
          <CursorRipples
            chromaticSplit={3}
            decay={4}
            intensity={16.8}
          />
        </Spherize>
        <FilmGrain strength={0.025} visible={true} />
        <Emboss
          center={{ x: 0.5, y: 0.5 }}
          shape={{ type: "vesicaSDF", radius: 0.35, spread: 0.5, rotation: 0 }}
          shapeType="vesicaSDF"
        />
        <SmokeFill
          center={{ x: 0.5, y: 0.5 }}
          colorA="#076a85"
          colorB="#b24317"
          intensity={0.75}
          shape={{ type: "vesicaSDF", radius: 0.34, spread: 0.5, rotation: 0 }}
          shapeType="vesicaSDF"
          spread={73}
          visible={false}
        />
        <Strands
          amplitude={0.6}
          end={{ x: 0.5, y: 0.8 }}
          frequency={1.7}
          lineCount={11}
          lineWidth={0.05}
          start={{ x: 0.5, y: 0.21 }}
        />
      </Shader>

      {showResponse && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3/4 pointer-events-none">
          <p className="animate-fade-in text-white text-center font-semibold text-2xl drop-shadow-[0_0_12px_rgba(100,160,255,0.9)]">
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
