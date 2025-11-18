import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../../services/confetti';
import { ProfesorService } from '../../services/profesor';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materia.html',
  styleUrls: ['./materia.css']
})
export class MateriaComponent implements OnInit {

  materias: any[] = [];
  profesores: any[] = [];
  materia = {
    id: 0,
    nombre: '',
    idProfesor: 0
  };
  materiaToEdit = {
    id: 0,
    nombre: '',
    idProfesor: 0
  };
  showModal = false;

  constructor(
    private materiaService: MateriaService,
    private notificationService: NotificationService,
    private confettiService: ConfettiService,
    private profesorService: ProfesorService
  ) { }

  ngOnInit() {
    this.getMaterias();
    this.getProfesores();
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

  getProfesores() {
    this.profesorService.getProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
      },
      error: (error) => {
        this.notificationService.show('Error al cargar profesores', 'error');
        console.error('Error fetching profesores', error);
      }
    });
  }

  addMateria() {
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

  openEditModal(materia: any) {
    this.materiaToEdit = { ...materia };
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
  }

  updateMateria() {
    this.materiaService.updateMateria(this.materiaToEdit).subscribe({
      next: () => {
        this.getMaterias();
        this.closeEditModal();
        this.notificationService.show('Materia actualizada con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al actualizar materia', 'error');
        console.error('Error updating materia', error);
      }
    });
  }

  deleteMateria(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta materia?')) {
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
  }

  resetForm() {
    this.materia = {
      id: 0,
      nombre: '',
      idProfesor: 0
    };
  }
}
