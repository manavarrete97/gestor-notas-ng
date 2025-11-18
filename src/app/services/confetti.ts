import { Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  constructor() {}

  public launchConfetti(): void {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
    });

    myConfetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.5, x: 0.5 },
    });

    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
  }
}
