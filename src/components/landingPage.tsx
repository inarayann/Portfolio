'use client'
import { motion } from 'framer-motion';
import ScrollTriggered from './cards';

export default function LandingPage() {
    return (
      <section className="flex flex-col items-center justify-center h-screen text-center p-6">
        <motion.h1
          className="text-5xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Building modern web experiences with Next.js
        </motion.p>
        <div style={container}> 
        <ScrollTriggered/>
        </div>
        <motion.a
          href="#projects"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg"
          whileHover={{ scale: 1.1 }}
        >
          View My Work
        </motion.a>
      </section>
    );
  }
  const container: React.CSSProperties = {
    margin: "100px auto",
    maxWidth: 300,
    maxHeight:500,
    paddingBottom: 100,
    width: "100%",
  }
  