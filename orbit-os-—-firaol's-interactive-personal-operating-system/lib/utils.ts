export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Audio Engine for subtle, calibrated OS telemetry feedback using HTML5 Web Audio API
class OrbitAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private hasInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const handleFirstGesture = () => {
        this.hasInteracted = true;
        this.unlockAudio();
        window.removeEventListener('pointerdown', handleFirstGesture);
        window.removeEventListener('keydown', handleFirstGesture);
      };
      window.addEventListener('pointerdown', handleFirstGesture, { passive: true, once: true });
      window.addEventListener('keydown', handleFirstGesture, { passive: true, once: true });
    }
  }

  public unlockAudio() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Handled gracefully if browser still restricts
        });
      }
    } catch {
      // AudioContext failure gracefully handled
    }
  }

  private initCtx() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Handled gracefully
        });
      }
    } catch {
      // AudioContext failure gracefully handled
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.03);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio failure safely handled
    }
  }

  public playPulse() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const oscSub = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gainSub = this.ctx.createGain();
      const gainHarmonic = this.ctx.createGain();

      // Sub fundamental layer (130Hz -> 65Hz)
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(130, now);
      oscSub.frequency.exponentialRampToValueAtTime(65, now + 0.3);
      gainSub.gain.setValueAtTime(0.001, now);
      gainSub.gain.linearRampToValueAtTime(0.05, now + 0.015);
      gainSub.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      // Harmonic resonance layer (260Hz -> 130Hz)
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(260, now);
      oscHarmonic.frequency.exponentialRampToValueAtTime(130, now + 0.22);
      gainHarmonic.gain.setValueAtTime(0.001, now);
      gainHarmonic.gain.linearRampToValueAtTime(0.025, now + 0.012);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      oscSub.connect(gainSub);
      gainSub.connect(this.ctx.destination);
      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(this.ctx.destination);

      oscSub.onended = () => {
        try {
          oscSub.disconnect();
          gainSub.disconnect();
        } catch {}
      };

      oscHarmonic.onended = () => {
        try {
          oscHarmonic.disconnect();
          gainHarmonic.disconnect();
        } catch {}
      };

      oscSub.start(now);
      oscHarmonic.start(now);
      oscSub.stop(now + 0.3);
      oscHarmonic.stop(now + 0.22);
    } catch {
      // Audio failure safely handled
    }
  }

  public playOpen() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.11);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Safe fallback
    }
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.016);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.016);
    } catch {
      // AudioContext failure gracefully handled
    }
  }

  public playFocus() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.035);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Safe fallback
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.setValueAtTime(880, now + 0.045); // A5
      osc2.frequency.setValueAtTime(1318.5, now + 0.045); // E6
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.onended = () => {
        try {
          osc1.disconnect();
          osc2.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc1.start(now);
      osc2.start(now + 0.045);
      osc1.stop(now + 0.15);
      osc2.stop(now + 0.15);
    } catch {
      // Safe fallback
    }
  }

  public playError() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.11);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Safe fallback
    }
  }

  public playBoot() {
    if (this.isMuted) return;
    // Autoplay protection: only play boot chime if user has interacted or context is running
    if (!this.hasInteracted && (!this.ctx || this.ctx.state !== 'running')) {
      return;
    }
    try {
      this.initCtx();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25]; // C major chord
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.025, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.04);
        osc.stop(now + 0.65);
      });
    } catch {
      // Safe fallback
    }
  }

  public playEasterEgg() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Celestial pentatonic cascade
      const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      arpeggio.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.055;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.035, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(start);
        osc.stop(start + 0.55);
      });
    } catch {
      // Safe fallback
    }
  }

  public playMatrix() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const freq = 1200 + Math.random() * 1200;
        const t = now + i * 0.025;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.015, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(t);
        osc.stop(t + 0.02);
      }
    } catch {
      // Safe fallback
    }
  }

  public playClose() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.08);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Safe fallback
    }
  }
}

export const soundFx = new OrbitAudio();
