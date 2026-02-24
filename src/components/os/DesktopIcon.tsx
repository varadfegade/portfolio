import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ExternalIconProps {
  href: string;
  icon: React.ReactNode | string;
  label: string;
  className?: string;
}

interface SystemIconProps {
  onDoubleClick: () => void;
  icon: React.ReactNode | string;
  label: string;
  className?: string;
}

export default function DesktopIcon(props: SystemIconProps | ExternalIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Framer Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  const glowOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.05, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    y.set(0);
  };

  const handleDoubleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
      if ('href' in props) {
        window.open(props.href, '_blank');
      } else {
        props.onDoubleClick && props.onDoubleClick();
      }
    }, 400); // 400ms delay to show the "open flush" animation
  };

  const baseClasses = "flex flex-col items-center gap-1.5 w-[90px] p-2 rounded-[5px] cursor-pointer text-white border border-transparent transition-colors select-none group " +
    (isHovered ? "bg-white/10 border-white/20 shadow-sm" : "hover:bg-white/10 hover:border-white/20") + " " + (props.className || "");

  const isStringIcon = typeof props.icon === 'string';
  const isImage = isStringIcon && ((props.icon as string).startsWith('http') || (props.icon as string).includes('/'));

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="flex flex-col items-center w-full relative z-10"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={isOpening ? { opacity: [1, 0.3, 1, 0.3, 1], scale: [1, 0.9, 1.05, 1] } : {}}
        transition={isOpening ? { duration: 0.4, ease: "easeInOut" } : {}}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 ${isHovered ? 'scale-105 drop-shadow-xl' : 'scale-100 drop-shadow-md'}`}
      >
        {isHovered && (
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -inset-2 bg-white/20 blur-xl rounded-lg -z-10 pointer-events-none"
          />
        )}

        {/* Icon Layer */}
        <div style={{ transform: "translateZ(30px)" }} className="pointer-events-none drop-shadow-xl transition-transform duration-300">
          {isImage ? (
            <img
              src={props.icon as string}
              alt={props.label}
              draggable="false"
              className="w-11 h-11 object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]"
            />
          ) : isStringIcon ? (
            <span className="text-4xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]">{props.icon as string}</span>
          ) : (
            <div className="text-white drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)] scale-125">
              {props.icon}
            </div>
          )}
        </div>
      </motion.div>

      <motion.span
        animate={{
          scale: isHovered ? 1 : 1,
          color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'
        }}
        className={`text-[12px] text-center font-normal drop-shadow-md text-shadow-sm leading-tight px-1 line-clamp-2 mt-1 w-full`}
      >
        {props.label}
      </motion.span>
    </div>
  );

  if ('href' in props) {
    return (
      <div onDoubleClick={handleDoubleClick} className={baseClasses} title="Double-click to open link">
        {content}
      </div>
    );
  }

  return (
    <div onDoubleClick={handleDoubleClick} className={baseClasses}>
      {content}
    </div>
  );
}