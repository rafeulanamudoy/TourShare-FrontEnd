"use client";

import React, { ReactNode, useEffect, useRef } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  targetRef: React.RefObject<HTMLDivElement>; // Add targetRef
}

export default function DashBoardModal({
  isOpen,
  onClose,
  children,
  targetRef, // Accept targetRef
}: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && targetRef.current && modalRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      modalRef.current.style.top = `${targetRect.bottom + window.scrollY}px`;
      modalRef.current.style.left = `${targetRect.left}px`;
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen, targetRef]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className=" mt-5  fixed inset-0  flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="absolute      rounded-md  bg-[#2e4262] p-5  shadow-lg z-60"
      >
        {children}
      </div>
    </div>
  );
}
