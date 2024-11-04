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
    this.blocId = +!this.route.snapshot.paramMap.get('id');
    if (this.blocId) {
      this.blocService.getBloc(this.blocId).subscribe((data: Bloc) => {
        this.blocForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.blocForm.valid) {
      if (this.blocId) {
        this.blocService.updateBloc({ id: this.blocId, ...this.blocForm.value })
          .subscribe(() => this.router.navigate(['/']));
      } else {
        this.blocService.addBloc(this.blocForm.value)
          .subscribe(() => this.router.navigate(['/']));
      }
    }
  }
}
