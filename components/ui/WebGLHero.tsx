'use client'

import { useEffect, useRef } from 'react'

export function WebGLHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animId: number
    let cleanupFn: (() => void) | undefined

    import('three').then((THREE) => {
      if (!mountRef.current) return

      const w = el.clientWidth
      const h = el.clientHeight

      // ── Renderer ──────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      Object.assign(renderer.domElement.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
      })
      el.appendChild(renderer.domElement)

      // ── Scene + Camera ─────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
      camera.position.z = 8

      // ── Glow sprite (the orb) ──────────────────────────────────────
      // Drawn on canvas so we get a true radial bloom without a composer
      const glowCanvas = document.createElement('canvas')
      glowCanvas.width = 512
      glowCanvas.height = 512
      const gc = glowCanvas.getContext('2d')!
      const gr = gc.createRadialGradient(256, 256, 0, 256, 256, 256)
      gr.addColorStop(0,    'rgba(191, 164, 109, 1)')
      gr.addColorStop(0.15, 'rgba(191, 164, 109, 0.6)')
      gr.addColorStop(0.45, 'rgba(191, 164, 109, 0.15)')
      gr.addColorStop(0.75, 'rgba(100, 130, 200, 0.05)')
      gr.addColorStop(1,    'rgba(0, 0, 0, 0)')
      gc.fillStyle = gr
      gc.fillRect(0, 0, 512, 512)

      const glowTex = new THREE.CanvasTexture(glowCanvas)
      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const glowSprite = new THREE.Sprite(glowMat)
      glowSprite.scale.set(9, 9, 1)
      glowSprite.position.set(2.5, 0.5, -1)
      scene.add(glowSprite)

      // Smaller inner glow (brighter core)
      const coreCanvas = document.createElement('canvas')
      coreCanvas.width = 256
      coreCanvas.height = 256
      const cc = coreCanvas.getContext('2d')!
      const cgr = cc.createRadialGradient(128, 128, 0, 128, 128, 128)
      cgr.addColorStop(0,    'rgba(255, 240, 200, 1)')
      cgr.addColorStop(0.2,  'rgba(220, 190, 130, 0.8)')
      cgr.addColorStop(0.5,  'rgba(191, 164, 109, 0.3)')
      cgr.addColorStop(1,    'rgba(0, 0, 0, 0)')
      cc.fillStyle = cgr
      cc.fillRect(0, 0, 256, 256)

      const coreTex = new THREE.CanvasTexture(coreCanvas)
      const coreMat = new THREE.SpriteMaterial({
        map: coreTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const coreSprite = new THREE.Sprite(coreMat)
      coreSprite.scale.set(3.5, 3.5, 1)
      coreSprite.position.set(2.5, 0.5, 0)
      scene.add(coreSprite)

      // ── Icosahedron wireframe (orbits the glow) ────────────────────
      const icoGeo = new THREE.IcosahedronGeometry(2.2, 1)
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xbfa46d,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
      const ico = new THREE.Mesh(icoGeo, icoMat)
      ico.position.set(2.5, 0.5, 0)
      scene.add(ico)

      // ── Decorative orbit ring ──────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(3.5, 0.006, 6, 200)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xbfa46d,
        transparent: true,
        opacity: 0.08,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2.2
      ring.rotation.z = Math.PI / 6
      ring.position.set(2.5, 0.5, 0)
      scene.add(ring)

      // ── Second ring (larger, further back) ────────────────────────
      const ring2Geo = new THREE.TorusGeometry(6, 0.004, 6, 300)
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xf0ede8,
        transparent: true,
        opacity: 0.035,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.x = Math.PI / 3
      ring2.position.set(0, 0, -4)
      scene.add(ring2)

      // ── Particles ─────────────────────────────────────────────────
      const count = 700
      const pos = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 32
        pos[i * 3 + 1] = (Math.random() - 0.5) * 22
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12
        sizes[i] = Math.random() * 0.04 + 0.01
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const pMat = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xf0ede8,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      })
      const points = new THREE.Points(pGeo, pMat)
      scene.add(points)

      // Accent-colored particles (closer to orb)
      const aCount = 150
      const aPos = new Float32Array(aCount * 3)
      for (let i = 0; i < aCount; i++) {
        aPos[i * 3]     = (Math.random() - 0.5) * 8 + 2.5
        aPos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5
        aPos[i * 3 + 2] = (Math.random() - 0.5) * 4
      }
      const apGeo = new THREE.BufferGeometry()
      apGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
      const apMat = new THREE.PointsMaterial({
        size: 0.025,
        color: 0xbfa46d,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      })
      const accentPoints = new THREE.Points(apGeo, apMat)
      scene.add(accentPoints)

      // ── Mouse + scroll state ───────────────────────────────────────
      const mouse = { x: 0, y: 0 }
      const lerped = { x: 0, y: 0 }
      let scrollY = 0
      let targetScrollY = 0

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
      }

      const onScroll = () => {
        targetScrollY = window.scrollY / window.innerHeight
      }

      window.addEventListener('mousemove', onMouseMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })

      // ── Resize ────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = el.clientWidth / el.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(el.clientWidth, el.clientHeight)
      }
      window.addEventListener('resize', onResize)

      // ── Animate ───────────────────────────────────────────────────
      let t = 0
      let last = performance.now()

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const now = performance.now()
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        t += dt

        // Lerp mouse + scroll
        lerped.x += (mouse.x - lerped.x) * 0.05
        lerped.y += (mouse.y - lerped.y) * 0.05
        scrollY += (targetScrollY - scrollY) * 0.06

        // Orb pulses slightly
        const pulse = 1 + Math.sin(t * 1.2) * 0.06
        glowSprite.scale.set(9 * pulse, 9 * pulse, 1)
        coreSprite.scale.set(3.5 * (1 + Math.sin(t * 2.1) * 0.08), 3.5 * (1 + Math.sin(t * 2.1) * 0.08), 1)

        // Icosahedron rotates + reacts to mouse
        ico.rotation.x = t * 0.1 + lerped.y * 0.3
        ico.rotation.y = t * 0.07 + lerped.x * 0.3

        // Rings rotate
        ring.rotation.z = t * 0.04 + lerped.x * 0.1
        ring2.rotation.z = t * 0.025

        // Particles drift — scroll shifts them upward (parallax)
        points.rotation.y = t * 0.012
        points.rotation.x = t * 0.007
        points.position.y = -scrollY * 3

        accentPoints.rotation.y = -t * 0.018
        accentPoints.position.y = -scrollY * 1.5

        // Camera parallax
        camera.position.x = lerped.x * 0.35
        camera.position.y = lerped.y * 0.25 + scrollY * -1.5

        // Fade the scene as user scrolls away
        const fade = Math.max(0, 1 - scrollY * 1.8)
        renderer.domElement.style.opacity = String(fade)

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        icoGeo.dispose(); icoMat.dispose()
        ringGeo.dispose(); ringMat.dispose()
        ring2Geo.dispose(); ring2Mat.dispose()
        pGeo.dispose(); pMat.dispose()
        apGeo.dispose(); apMat.dispose()
        glowTex.dispose(); glowMat.dispose()
        coreTex.dispose(); coreMat.dispose()
        renderer.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    })

    return () => cleanupFn?.()
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
