import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../services/nota';
import { EstudianteService } from '../../services/estudiante';
import { MateriaService } from '../../services/materia';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nota.html',
  styleUrls: ['./nota.css']
})
export class NotaComponent implements OnInit {

  notas: any[] = [];
  estudiantes: any[] = [];
  materias: any[] = [];
  nota = {
    id: 0,
    nombre: '',
    idMateria: 0,
    idEstudiante: 0,
    valor: 0
  };
  selectedEstudiante: number = 0;
  selectedMateria: number = 0;

  constructor(
    private notaService: NotaService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private notificationService: NotificationService,
    private confettiService: ConfettiService
  ) { }

  ngOnInit() {
    this.getEstudiantes();
    this.getMaterias();
  }

  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: (error) => {
        this.notificationService.show('Error al cargar estudiantes', 'error');
        console.error('Error fetching estudiantes', error);
      }
    });
  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe({
      next: (data) => this.materias = data,
      error: (error) => {
        this.notificationService.show('Error al cargar materias', 'error');
        console.error('Error fetching materias', error);
      }
    });
  }

  getNotas() {
    if (this.selectedEstudiante && this.selectedMateria) {
      this.notaService.getNota(this.selectedEstudiante, this.selectedMateria).subscribe({
        next: (data) => this.notas = data,
        error: (error) => {
          this.notificationService.show('Error al cargar notas', 'error');
          console.error('Error fetching notas', error);
        }
      });
    }
  }

  addNota() {
    if (this.nota.id) {
      this.notaService.updateNota(this.nota.id, 1, this.nota.valor).subscribe({
        next: () => {
          this.getNotas();
          this.resetForm();
          this.notificationService.show('Nota actualizada con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al actualizar nota', 'error');
          console.error('Error updating nota', error);
        }
      });
    } else {
      this.notaService.addNota(this.nota).subscribe({
        next: () => {
          this.getNotas();
          this.resetForm();
          this.notificationService.show('Nota agregada con éxito');
          this.confettiService.launchConfetti();
        },
        error: (error) => {
          this.notificationService.show('Error al agregar nota', 'error');
          console.error('Error adding nota', error);
        }
      });
    }
  }

  editNota(nota: any) {
    this.nota = { ...nota };
  }

  deleteNota(idNota: number) {
    this.notaService.deleteNota(idNota, 1).subscribe({
      next: () => {
        this.getNotas();
        this.notificationService.show('Nota eliminada con éxito');
        this.confettiService.launchConfetti();
      },
      error: (error) => {
        this.notificationService.show('Error al eliminar nota', 'error');
        console.error('Error deleting nota', error);
      }
    });
  }

  resetForm() {
    this.nota = {
      id: 0,
      nombre: '',
      idMateria: this.selectedMateria,
      idEstudiante: this.selectedEstudiante,
      valor: 0
    };
  }

  onEstudianteChange() {
    this.getNotas();
    this.resetForm();
  }

  onMateriaChange() {
    this.getNotas();
    this.resetForm();
  }
}
