"use client";
import React, { ReactNode, useEffect, useRef } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function DashBoardModal({
  isOpen,
  onClose,
  children,
  targetRef,
}: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateModalPosition = () => {
      if (isOpen && targetRef.current && modalRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        modalRef.current.style.top = `${targetRect.bottom + window.scrollY}px`;
        modalRef.current.style.left = `${targetRect.left}px`;
      }
    };

    if (isOpen) {
      updateModalPosition();
      document.body.classList.add("no-scroll");
      window.addEventListener("resize", updateModalPosition);
      window.addEventListener("scroll", updateModalPosition);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("resize", updateModalPosition);
      window.removeEventListener("scroll", updateModalPosition);
    };
  }, [isOpen, targetRef]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="absolute z-60 rounded-md bg-[#2e4262] p-5 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}
