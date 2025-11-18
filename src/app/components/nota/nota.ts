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
  showModal = false;
  notaToEdit: any = {};

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
        next: (data) => {
          if (data) {
            this.notas = Array.isArray(data) ? data : [data];
          } else {
            this.notas = [];
          }
        },
        error: (error) => {
          this.notas = [];
          this.notificationService.show('Error al cargar notas o no existen notas para esta selección', 'error');
          console.error('Error fetching notas', error);
        }
      });
    }
  }

  addNota() {
    const estudiante = this.estudiantes.find(e => e.id === this.selectedEstudiante);
    const materia = this.materias.find(m => m.id === this.selectedMateria);

    const newNota = {
      nombre: this.nota.nombre,
      idMateria: this.selectedMateria,
      idEstudiante: this.selectedEstudiante,
      valor: this.nota.valor,
      materiaNombre: materia ? materia.nombre : '',
      estudianteNombre: estudiante ? estudiante.nombre : ''
    };
    this.notaService.addNota(newNota).subscribe({
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

  resetForm() {
    this.nota = {
      id: 0,
      nombre: '',
      idMateria: this.selectedMateria,
      idEstudiante: this.selectedEstudiante,
      valor: 0
    };
  }

  onFilterChange() {
    this.getNotas();
    this.resetForm();
  }
}
