"use client";
import { useRef, useEffect, ReactNode, HTMLAttributes } from "react";
import { Fancybox as NativeFancybox, OptionsType } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface FancyboxProps extends HTMLAttributes<HTMLDivElement> {
  delegate?: string;
  options?: OptionsType;
  children: ReactNode;
}

export default function Fancybox(props: FancyboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    <div {...props} ref={containerRef}>
      {props.children}
    </div>
  );
}
