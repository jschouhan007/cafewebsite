import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee } from 'lucide-react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import MagneticButton from './MagneticButton';

function Leaf({ color, ...props }: any) {
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.4, 0.2, 0.6, 0.6);
    shape.lineTo(0.8, 0.4);
    shape.lineTo(0.9, 0.9);
    shape.lineTo(0.6, 1.1);
    shape.lineTo(0.7, 1.6);
    shape.lineTo(0, 2.0);
    shape.lineTo(-0.7, 1.6);
    shape.lineTo(-0.6, 1.1);
    shape.lineTo(-0.9, 0.9);
    shape.lineTo(-0.8, 0.4);
    shape.lineTo(-0.6, 0.6);
    shape.quadraticCurveTo(-0.4, 0.2, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };

  return (
    <mesh {...props} castShadow receiveShadow>
      <extrudeGeometry args={[leafShape, extrudeSettings]} />
      <meshStandardMaterial color={color} roughness={0.4} />
      {/* Stem */}
      <mesh position={[0, -0.2, 0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </mesh>
  );
}

function ContinuousSteamLine({ offset, x, speed, amplitude }: { offset: number, x: number, speed: number, amplitude: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    if (meshRef.current) {
      const points = [];
      for (let i = 0; i <= 20; i++) {
        const y = (i / 20) * 3.5;
        const progress = y / 3.5;
        // Waves traveling upwards
        const waveX = Math.sin(time * 2 - y * 2 + offset) * amplitude * progress;
        const waveZ = Math.cos(time * 1.5 - y * 1.5 + offset) * amplitude * progress;
        points.push(new THREE.Vector3(waveX, y, waveZ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const oldGeo = meshRef.current.geometry;
      meshRef.current.geometry = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
      oldGeo.dispose();
    }
  });

  return (
    <mesh ref={meshRef} position={[x, 0, 0]}>
      <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0)]), 20, 0.06, 8, false]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

function Steam() {
  return (
    <group position={[0, 1.5, 0]}>
      <ContinuousSteamLine offset={0} speed={1.2} amplitude={0.4} x={-0.4} />
      <ContinuousSteamLine offset={2} speed={1.0} amplitude={0.5} x={0} />
      <ContinuousSteamLine offset={4} speed={1.5} amplitude={0.3} x={0.4} />
    </group>
  );
}

function CoffeeLiquid() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle sloshing/undulating
      groupRef.current.rotation.x = Math.sin(time * 1.5) * 0.02;
      groupRef.current.rotation.z = Math.cos(time * 1.2) * 0.02;
      // Gentle rising/falling
      groupRef.current.position.y = 1.8 + Math.sin(time * 2) * 0.015;
      
      // Slowly rotate the liquid to simulate swirling
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.8, 0]}>
      {/* Coffee Liquid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.4, 64]} />
        <meshStandardMaterial color="#3b1c0a" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Foam Swirl */}
      <mesh position={[0.5, 0.01, -0.5]} rotation={[-Math.PI / 2, 0, 1.0]}>
        <torusGeometry args={[0.6, 0.08, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.5} />
      </mesh>
      <mesh position={[0.1, 0.01, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.5} />
      </mesh>
      {/* Leaf in coffee */}
      <Leaf color="#F4A460" position={[-1.2, 0.02, 0.8]} rotation={[0.5, 0, -0.5]} scale={0.4} />
    </group>
  );
}

function AutumnCup() {
  const groupRef = useRef<THREE.Group>(null);

  const noiseTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          const val = 200 + Math.random() * 55;
          context.fillStyle = `rgb(${val},${val},${val})`;
          context.fillRect(x, y, 1, 1);
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.1;
    }
  });

  const topProfile = useMemo(() => [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.8, 0),
    new THREE.Vector2(2.2, 0.5),
    new THREE.Vector2(2.6, 1.5),
    new THREE.Vector2(2.6, 2.0),
    new THREE.Vector2(2.3, 2.0), // rim
    new THREE.Vector2(2.3, 1.5),
    new THREE.Vector2(1.9, 0.5),
    new THREE.Vector2(0, 0.5)
  ], []);

  const bottomProfile = useMemo(() => [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.82, 0),
    new THREE.Vector2(2.22, 0.5),
    new THREE.Vector2(2.45, 1.0),
    new THREE.Vector2(2.0, 1.0), // cut in
    new THREE.Vector2(0, 1.0)
  ], []);

  return (
    <group ref={groupRef} scale={1.2} position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        
        {/* Top Cup (Light Tan) */}
        <mesh castShadow receiveShadow>
          <latheGeometry args={[topProfile, 64]} />
          <meshStandardMaterial color="#F2C88F" roughness={0.6} />
        </mesh>
        
        {/* Bottom Cup (Orange) */}
        <mesh castShadow receiveShadow position={[0, 0.01, 0]}>
          <latheGeometry args={[bottomProfile, 64]} />
          <meshStandardMaterial color="#C86A27" roughness={0.6} />
        </mesh>

        {/* Handle */}
        <mesh position={[2.5, 1.0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.8, 0.3, 32, 64]} />
          <meshStandardMaterial color="#C86A27" roughness={0.6} />
        </mesh>

        {/* Saucer */}
        <group position={[0, -0.2, 0]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[3.5, 2.5, 0.3, 64]} />
            <meshPhysicalMaterial color="#A0522D" roughness={0.7} clearcoat={0.3} clearcoatRoughness={0.2} bumpMap={noiseTexture} bumpScale={0.01} />
          </mesh>
          <mesh position={[0, 0.16, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <circleGeometry args={[3.35, 64]} />
            <meshPhysicalMaterial color="#8B4513" roughness={0.8} bumpMap={noiseTexture} bumpScale={0.005} />
          </mesh>
        </group>

        {/* Coffee Liquid & Foam */}
        <CoffeeLiquid />

        {/* Dots on Cup */}
        <mesh position={[2.1, 1.2, 1.4]}><sphereGeometry args={[0.15, 16, 16]}/><meshStandardMaterial color="#F2C88F"/></mesh>
        <mesh position={[2.1, 1.2, -1.4]}><sphereGeometry args={[0.15, 16, 16]}/><meshStandardMaterial color="#F2C88F"/></mesh>
        <mesh position={[-2.4, 1.2, 0]}><sphereGeometry args={[0.15, 16, 16]}/><meshStandardMaterial color="#F2C88F"/></mesh>

        {/* Leaves */}
        {/* Leaf on cup side */}
        <Leaf color="#E67300" position={[2.4, 0.8, 1.0]} rotation={[0.2, 1.0, 0.5]} scale={0.3} />
        <Leaf color="#E67300" position={[-2.0, 0.8, 1.4]} rotation={[0.1, -0.8, -0.4]} scale={0.3} />
        {/* Leaves on saucer */}
        <Leaf color="#DAA520" position={[2.2, 0.2, 2.2]} rotation={[-Math.PI/2, 0, 0.5]} scale={0.5} />
        <Leaf color="#E67300" position={[-2.8, 0.2, 1.5]} rotation={[-Math.PI/2, 0, -1.0]} scale={0.4} />
        <Leaf color="#F4A460" position={[-1.8, 0.2, 2.8]} rotation={[-Math.PI/2, 0, -0.2]} scale={0.3} />

        {/* Cinnamon Sticks */}
        <group position={[1.8, 0.3, 2.5]} rotation={[0, -0.5, 0]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.15, 0.15, 2.5, 16]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.25, 0.1, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.12, 0.12, 2.2, 16]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
        </group>

        <Steam />
      </Float>
    </group>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Vibrant Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[#f8f5ff]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-400/30 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-orange-400/30 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-400/30 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-pink-500/30 shadow-[0_0_15px_rgba(255,0,127,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Brewed With Love ☕</span>
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-6xl md:text-8xl font-display font-black leading-[1.1] mb-6 text-slate-800"
          >
            Taste The <br />
            <span className="text-gradient drop-shadow-sm">Vibrant</span> <br />
            Energy.
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg font-medium"
          >
            Step into a world of color, flavor, and unmatched vibes. 
            Premium coffee and artisanal treats crafted to perfection.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <MagneticButton className="liquid-btn px-8 py-4 text-lg flex items-center justify-center gap-2 group">
              View Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton className="px-8 py-4 rounded-full font-bold text-slate-800 glass hover:bg-white/40 transition-all flex items-center justify-center gap-2 group">
              <Coffee className="w-5 h-5 text-pink-500 group-hover:rotate-12 transition-transform" />
              Visit Us
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* 3D Coffee Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[700px] w-full"
        >
          <Canvas shadows camera={{ position: [0, 4, 10], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={2} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-5, 5, -5]} intensity={1} color="#ff007f" />
            <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} castShadow color="#ffea00" />
            
            <AutumnCup />
            
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.4} 
              scale={20} 
              blur={2} 
              far={4} 
              color="#ff007f"
            />
            <Environment preset="sunset" />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
