import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { useMouse } from '../../hooks'

/* ---------------------------------------------------------------------------
 * A 3D service-mesh topology: nodes distributed on a sphere, wired to their
 * nearest neighbours, with packets travelling the edges. Chosen deliberately —
 * it's a distributed system, which is what the rest of the site is about.
 * ------------------------------------------------------------------------- */

const NODE_COUNT = 15
const RADIUS = 2.35
const LINKS_PER_NODE = 3

/* Even distribution over a sphere (Fibonacci lattice). */
function buildTopology() {
  const nodes = []
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    nodes.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS),
    )
  }

  // Wire each node to its nearest neighbours, de-duplicating pairs.
  const seen = new Set()
  const edges = []
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: n.distanceTo(m) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, LINKS_PER_NODE)

    near.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) return
      seen.add(key)
      edges.push([i, j])
    })
  })

  return { nodes, edges }
}

function Mesh3D({ isDark }) {
  const group = useRef()
  const packetsRef = useRef()
  const mouse = useMouse()
  const { viewport } = useThree()

  const { nodes, edges } = useMemo(buildTopology, [])

  const brand = useMemo(
    () => new THREE.Color(isDark ? '#7c6cf6' : '#6d57f6'),
    [isDark],
  )
  const accent = useMemo(
    () => new THREE.Color(isDark ? '#22d3ee' : '#0ea5be'),
    [isDark],
  )

  /* Edge geometry — a flat position buffer of line segment pairs. */
  const lineGeo = useMemo(() => {
    const pts = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], k) => {
      pts.set([nodes[a].x, nodes[a].y, nodes[a].z], k * 6)
      pts.set([nodes[b].x, nodes[b].y, nodes[b].z], k * 6 + 3)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3))
    return g
  }, [nodes, edges])

  /* One travelling packet per edge, each with its own phase and speed. */
  const packets = useMemo(
    () =>
      edges.map(([a, b], i) => ({
        a, b,
        t: (i * 0.137) % 1,
        speed: 0.14 + ((i * 37) % 10) / 42,
      })),
    [edges],
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (group.current) {
      const g = group.current

      // Y spins continuously; X breathes on a slow sine.
      g.rotation.y += delta * 0.11
      g.rotation.x = Math.sin(t * 0.22) * 0.16

      // Pointer parallax, eased toward the target each frame.
      g.position.x += (mouse.current.x * 0.3 - g.position.x) * 0.045
      g.position.y += (mouse.current.y * 0.22 - g.position.y) * 0.045
      g.rotation.z += (-mouse.current.y * 0.1 - g.rotation.z) * 0.04
    }

    // Advance packets along their edges.
    if (packetsRef.current) {
      packets.forEach((p, i) => {
        p.t += delta * p.speed
        if (p.t > 1) p.t -= 1
        const from = nodes[p.a]
        const to = nodes[p.b]
        dummy.position.lerpVectors(from, to, p.t)
        const pulse = 0.055 + Math.sin(t * 3 + i) * 0.014
        dummy.scale.setScalar(pulse)
        dummy.updateMatrix()
        packetsRef.current.setMatrixAt(i, dummy.matrix)
      })
      packetsRef.current.instanceMatrix.needsUpdate = true
    }
  })

  // Scale the whole thing down on narrow viewports so it never crowds the text.
  const scale = Math.min(1, viewport.width / 8)

  return (
    <group ref={group} scale={scale}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={brand}
          transparent
          opacity={isDark ? 0.32 : 0.26}
        />
      </lineSegments>

      {/* Service nodes */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <icosahedronGeometry args={[i % 4 === 0 ? 0.15 : 0.095, 1]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? accent : brand}
            emissive={i % 4 === 0 ? accent : brand}
            emissiveIntensity={isDark ? 1.5 : 0.75}
            roughness={0.28}
            metalness={0.55}
          />
        </mesh>
      ))}

      {/* Packets in flight */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, packets.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={accent} transparent opacity={isDark ? 0.95 : 0.8} />
      </instancedMesh>

      {/* Faint containing shell */}
      <mesh>
        <icosahedronGeometry args={[RADIUS * 1.32, 1]} />
        <meshBasicMaterial
          color={brand}
          wireframe
          transparent
          opacity={isDark ? 0.07 : 0.055}
        />
      </mesh>
    </group>
  )
}

export default function NetworkScene() {
  const { isDark } = useTheme()

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={isDark ? 0.55 : 1.1} />
      <pointLight position={[6, 6, 6]} intensity={isDark ? 42 : 26} color="#7c6cf6" />
      <pointLight position={[-6, -4, 3]} intensity={isDark ? 26 : 16} color="#22d3ee" />
      <Mesh3D isDark={isDark} />
    </Canvas>
  )
}
