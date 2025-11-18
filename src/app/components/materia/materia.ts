import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materia.html',
  styleUrls: ['./materia.css']
})
export class MateriaComponent implements OnInit {

  materias: any[] = [];
  materia = {
    id: 0,
    nombre: '',
    idProfesor: 0
  };

  constructor(
    private materiaService: MateriaService,
    private notificationService: NotificationService,
    private confettiService: ConfettiService
  ) { }

  ngOnInit() {
    this.getMaterias();
  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe({
      next: (data) => {
        this.materias = data;
      },
      error: (error) => {
        this.notificationService.show('Error al cargar materias', 'error');
        console.error('Error fetching materias', error);
      }
    });
  }

  addMateria() {
    if (this.materia.id) {
      this.materiaService.updateMateria(this.materia).subscribe({
        next: () => {
          this.getMaterias();
          this.resetForm();
          this.notificationService.show('Materia actualizada con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al actualizar materia', 'error');
          console.error('Error updating materia', error);
        }
      });
    } else {
      this.materiaService.addMateria({ nombre: this.materia.nombre, idProfesor: this.materia.idProfesor }).subscribe({
        next: () => {
          this.getMaterias();
          this.resetForm();
          this.notificationService.show('Materia agregada con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al agregar materia', 'error');
          console.error('Error adding materia', error);
        }
      });
    }
  }

  editMateria(materia: any) {
    this.materia = { ...materia };
  }

  deleteMateria(id: number) {
    this.materiaService.deleteMateria(id).subscribe({
      next: () => {
        this.getMaterias();
        this.notificationService.show('Materia eliminada con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al eliminar materia', 'error');
        console.error('Error deleting materia', error);
      }
    });
  }

  resetForm() {
    this.materia = {
      id: 0,
      nombre: '',
      idProfesor: 0
    };
  }
}
