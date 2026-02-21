import React from 'react';

interface ExternalIconProps {
  href: string;
  icon: string;
  label: string;
  className?: string;
}

interface SystemIconProps {
  onDoubleClick: () => void;
  icon: string;
  label: string;
  className?: string;
}

export default function DesktopIcon(props: SystemIconProps | ExternalIconProps) {
  const baseClasses = "flex flex-col items-center gap-1 w-20 p-2 border border-transparent hover:bg-white/10 hover:border-white/20 rounded-[4px] cursor-pointer text-white transition-all group hover:shadow-sm select-none " + (props.className || "");
  const isImage = props.icon.startsWith('http') || props.icon.includes('/');

  const content = (
    <>
      {isImage ? (
        <img 
          src={props.icon} 
          alt={props.label} 
          draggable="false" 
          className="w-10 h-10 object-contain drop-shadow-md group-active:scale-95 transition-transform pointer-events-none" 
        />
      ) : (
        <span className="text-4xl drop-shadow-lg group-active:scale-95 transition-transform">{props.icon}</span>
      )}
      <span className="text-xs text-center font-medium drop-shadow-md text-shadow-sm leading-tight px-1 line-clamp-2 mt-1">
        {props.label}
      </span>
    </>
  );

  if ('href' in props) {
    return (
      <div onDoubleClick={() => window.open(props.href, '_blank')} className={baseClasses} title="Double-click to open link">
        {content}
      </div>
    );
  }

  return (
    <div onDoubleClick={props.onDoubleClick} className={baseClasses}>
      {content}
    </div>
  );
}