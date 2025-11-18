import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante.html',
  styleUrls: ['./estudiante.css']
})
export class EstudianteComponent implements OnInit {

  estudiantes: any[] = [];
  estudiante = {
    id: 0,
    nombre: ''
  };

  constructor(
    private estudianteService: EstudianteService,
    private notificationService: NotificationService,
    private confettiService: ConfettiService
  ) { }

  ngOnInit() {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (error) => {
        this.notificationService.show('Error al cargar estudiantes', 'error');
        console.error('Error fetching estudiantes', error);
      }
    });
  }

  addEstudiante() {
    if (this.estudiante.id) {
      this.estudianteService.updateEstudiante(this.estudiante).subscribe({
        next: () => {
          this.getEstudiantes();
          this.resetForm();
          this.notificationService.show('Estudiante actualizado con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al actualizar estudiante', 'error');
          console.error('Error updating estudiante', error);
        }
      });
    } else {
      this.estudianteService.addEstudiante({ nombre: this.estudiante.nombre }).subscribe({
        next: () => {
          this.getEstudiantes();
          this.resetForm();
          this.notificationService.show('Estudiante agregado con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al agregar estudiante', 'error');
          console.error('Error adding estudiante', error);
        }
      });
    }
  }

  editEstudiante(estudiante: any) {
    this.estudiante = { ...estudiante };
  }

  deleteEstudiante(id: number) {
    this.estudianteService.deleteEstudiante(id).subscribe({
      next: () => {
        this.getEstudiantes();
        this.notificationService.show('Estudiante eliminado con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al eliminar estudiante', 'error');
        console.error('Error deleting estudiante', error);
      }
    });
  }

  resetForm() {
    this.estudiante = {
      id: 0,
      nombre: ''
    };
  }
}
