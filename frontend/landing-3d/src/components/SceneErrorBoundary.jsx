import React from 'react';

export default class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) {
      return this.props.children;
    }

    return (
      <div className="absolute inset-0 z-20 grid place-items-center bg-carbon px-6 text-center text-white">
        <div className="max-w-md border border-blood/30 bg-black/62 p-8 shadow-glow backdrop-blur-2xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-blood">
            Model not found
          </p>
          <h2 className="font-display text-4xl font-black uppercase tracking-[0.08em]">
            Add car.glb
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/58">
            This experience requires a real GLB/GLTF sports car at
            <span className="text-white"> /public/models/car.glb</span>. Replace that file anytime
            without changing the code.
          </p>
        </div>
      </div>
    );
  }
}
