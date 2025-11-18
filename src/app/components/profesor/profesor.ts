import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesor.html',
  styleUrls: ['./profesor.css']
})
export class ProfesorComponent implements OnInit {

  profesores: any[] = [];
  profesor = {
    id: 0,
    nombre: ''
  };
  showModal = false;
  profesorToEdit: any = {};

  constructor(
    private profesorService: ProfesorService,
    private notificationService: NotificationService,
    private confettiService: ConfettiService
  ) { }

  ngOnInit() {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe({
      next: (data) => {
        console.log('Profesores recibidos:', data);
        this.profesores = data;
      },
      error: (error) => {
        this.notificationService.show('Error al cargar profesores', 'error');
        console.error('Error fetching profesores', error);
      }
    });
  }

  addProfesor() {
    this.profesorService.addProfesor({ nombre: this.profesor.nombre }).subscribe({
      next: () => {
        this.getProfesores();
        this.resetForm();
        this.notificationService.show('Profesor agregado con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al agregar profesor', 'error');
        console.error('Error adding profesor', error);
      }
    });
  }

  openEditModal(profesor: any) {
    this.profesorToEdit = { ...profesor };
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.profesorToEdit = {};
  }

  updateProfesor() {
    this.profesorService.updateProfesor(this.profesorToEdit).subscribe({
      next: () => {
        this.getProfesores();
        this.closeEditModal();
        this.notificationService.show('Profesor actualizado con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al actualizar profesor', 'error');
        console.error('Error updating profesor', error);
      }
    });
  }

  deleteProfesor(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
      this.profesorService.deleteProfesor(id).subscribe({
        next: () => {
          this.getProfesores();
          this.notificationService.show('Profesor eliminado con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al eliminar profesor', 'error');
          console.error('Error deleting profesor', error);
        }
      });
    }
  }

  resetForm() {
    this.profesor = {
      id: 0,
      nombre: ''
    };
  }
}
