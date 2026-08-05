import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const domains = [
  {
    id: 1,
    title: 'Game Development',
    icon: '🎮',
    tools: ['Unity', 'Unreal', 'Godot']
  },
  {
    id: 2,
    title: 'Programming',
    icon: '💻',
    tools: ['C#', 'C++', 'Java', 'Python']
  },
  {
    id: 3,
    title: 'Game Design',
    icon: '🎯',
    tools: ['Storytelling', 'Mechanics', 'Level Design']
  },
  {
    id: 4,
    title: 'Art & Animation',
    icon: '🎨',
    tools: ['Blender', 'Pixel Art', '3D Modeling']
  },
  {
    id: 5,
    title: 'Esports',
    icon: '🏆',
    tools: ['Valorant', 'CS2', 'BGMI', 'Rocket League']
  },
  {
    id: 6,
    title: 'Content Creation',
    icon: '📹',
    tools: ['Streaming', 'Video Editing', 'Social Media']
  }
];

const DomainCard = ({ domain, index }: { domain: typeof domains[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          backgroundColor: 'var(--surface, #0e0e14)',
          borderColor: 'var(--border, #1e1e2e)',
        }}
        whileHover={{
          y: -4,
          backgroundColor: 'var(--surface-2, #16161f)',
          borderColor: 'var(--accent, #8b5cf6)',
          boxShadow: '0 0 20px rgba(139,92,246,0.15)',
        }}
        className="h-full border rounded-xl p-7 transition-colors duration-300 flex flex-col cursor-pointer"
      >
        <div className="text-[48px] leading-none mb-6">
          {domain.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 font-['Space_Grotesk'] tracking-wide">
          {domain.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-auto">
          {domain.tools.map(tool => (
            <span
              key={tool}
              className="px-3 py-1 text-xs font-mono rounded-full border border-[var(--border,#1e1e2e)] bg-[rgba(139,92,246,0.12)] text-gray-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Domains() {
  return (
    <section id="domains" className="py-24 px-6 md:px-12 lg:px-24 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2"
          >
            WHAT WE DO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk']"
          >
            Our Domains
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
