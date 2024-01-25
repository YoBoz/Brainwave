"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { useState } from 'react';

export const NavSettings = () => {
  const { onOpen } = useModal();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    onOpen("settings");
    setIsActive(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const buttonStyle = {
    border: '1px solid transparent',
    backgroundColor: isHovered || isActive ? 'rgb(99, 103, 180)' : 'transparent',
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        className='text-white w-[155px]'
        style={buttonStyle}
      >
        <Settings className='pr-2'/>
        Settings
      </Button>
    </div>
  );
};
