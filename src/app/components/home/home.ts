import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private confettiService: ConfettiService) {}

  public launchConfetti(): void {
    this.confettiService.launchConfetti();
  }
}
