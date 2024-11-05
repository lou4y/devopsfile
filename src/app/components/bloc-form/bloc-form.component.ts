import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from '../../models/bloc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bloc-form',
  templateUrl: './bloc-form.component.html',
  styleUrls: ['./bloc-form.component.css']
})
export class BlocFormComponent implements OnInit {
  blocForm: FormGroup;
  blocId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blocService: BlocService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blocForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    this.blocId = +this.route.snapshot.paramMap.get('id');
    if (this.blocId) {
      this.blocService.getBloc(this.blocId).subscribe((data: Bloc) => {
        this.blocForm.patchValue({
          name: data.nomBloc,
          capacity: data.capaciteBloc
        });
      }, error => {
        console.error('Error fetching bloc:', error);
      });
    }
  }

  onSubmit(): void {
    if (this.blocForm.valid) {

      const bloc: Bloc = {
        idBloc: this.blocId ? this.blocId : undefined,
        nomBloc: this.blocForm.value.name,
        capaciteBloc: this.blocForm.value.capacity,
        foyer: null // Assuming null; adjust as needed
      };

      if (this.blocId) {
        this.blocService.updateBloc(bloc).subscribe(() => this.router.navigate(['/']), error => {
          console.error('Error updating bloc:', error);
        });
      } else {
        this.blocService.addBloc(bloc).subscribe(() => this.router.navigate(['/']), error => {
          console.error('Error adding bloc:', error);
        });
      }
    }
  }

}
