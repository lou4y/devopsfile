import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from '../../models/bloc';

@Component({
  selector: 'app-bloc-detail',
  templateUrl: './bloc-detail.component.html',
  styleUrls: ['./bloc-detail.component.css']
})
export class BlocDetailComponent implements OnInit {
  bloc: Bloc | undefined;

  constructor(
    private route: ActivatedRoute,
    private blocService: BlocService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.blocService.getBloc(id).subscribe((data: Bloc) => {
      this.bloc = data;
    });
  }
}
