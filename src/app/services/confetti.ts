import { Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  constructor() {}

  public launchConfetti(): void {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
    });

    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
  }
}
