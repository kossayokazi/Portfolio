"use client";
import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode; onError: () => void };

// If the 3D chunk fails to load or the scene throws, show the classic page instead of a blank screen.
export default class WorldBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("3D world failed, showing the classic page:", error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}