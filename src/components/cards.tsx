import type React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

export default function ScrollTriggered() {
  return (
    <div style={container}>
      {skills.map(([label, hueA, hueB], i) => (
        <Card i={i} label={label} hueA={hueA} hueB={hueB} key={label} />
      ))}
      <hr />
      {fw.map(([label, hueA, hueB], i) => (
        <Card i={i} label={label} hueA={hueA} hueB={hueB} key={label} />
      ))}
      <hr />
      {projects.map(([label, hueA, hueB], i) => (
        <Card i={i} label={label} hueA={hueA} hueB={hueB} key={label} />
      ))}
    </div>
  )
}

interface CardProps {
  label: string
  hueA: number
  hueB: number
  i: number
}

function Card({ label, hueA, hueB, i }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      whileHover={{
          scale: 1.05,
          borderColor: "hsl(9, 100%, 70%)",
          transition: { duration: 0.3 },
        }}
        viewport={{ amount: 0.7 }} 
    >
      <div style={{ ...splash, background }} />
      <motion.div
        style={card}
        variants={cardVariants}
        className="card"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 90,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  margin: "100px auto",
  maxWidth: 240,
  minWidth: "100%",
  paddingBottom: 50,
  width: "100%",
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: 0,
  width: "100%",
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: '-18px',
  left: 0,
  right: 0,
  bottom: '18px',
  border: "2px solid transparent",
  borderRadius: 20,
  transition: "border-color 0.3s ease, transform 0.3s ease",
  clipPath: `path("M 63 260.5 C 114 266.454 48.995 311.101 28 278.5 L 447 219.5 C 445.085 202.033 460 205.454 480 239.5 L 245 277 C 499 441.046 491.046 450 480 426 L 220 450 C 8.954 450 0 445.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 600,
  color: "#222",
  textAlign: "center",
  padding: "0 20px",
  width: 240,
  height: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "var(--white)",
  // boxShadow:
  //   "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "center", // Updated to center the transformation
  border: "2px solid transparent", // Added for hover border transition
  transition: "border-color 0.3s ease", // Smooth border transition
}


/**
 * ==============   Data   ================
 */

const skills: [string, number, number][] = [
  ["Angular", 410, 40],
  ["React.js", 30, 20],
  ["Next.js", 40, 50],
  ["HTML", 20, 60],
  ["CSS", 50, 20],
]
const fw: [string, number, number][] = [
  ["Material UI", 170, 200],
  ["Ant Design", 20, 300],
]

const projects: [string, number, number][] = [
  ["Aithentic (Angular)", 304, 70],
  ["Reelville (Angular)", 20, 120],
  ["Multim3d (React)", 140, 180],
  ["FabDep (Angular)", 20, 230],
  ["Cropchain (React)", 260, 300],
]
