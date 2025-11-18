import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;
  type: 'success' | 'error' = 'success';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      this.message = notification.message;
      this.type = notification.type;
      setTimeout(() => this.message = null, 3000);
    });
  }
}
