import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from '../../models/bloc';

@Component({
  selector: 'app-bloc-list',
  templateUrl: './bloc-list.component.html',
  styleUrls: ['./bloc-list.component.css']
})
export class BlocListComponent implements OnInit {
  blocs: Bloc[] = [];
  blocsWithoutFoyer: Bloc[] = [];
  searchResults: Bloc[] = [];

  constructor(private blocService: BlocService, private router: Router) { }

  ngOnInit(): void {
    this.blocService.getBlocs().subscribe((data: Bloc[]) => {
      this.blocs = data;
    });

    this.blocService.getBlocsWithoutFoyer().subscribe((data: Bloc[]) => {
      this.blocsWithoutFoyer = data;
    });
  }

  navigateToAddBloc(): void {
    this.router.navigate(['/add-bloc']);
  }

  editBloc(id: number): void {
    this.router.navigate([`/edit-bloc/${id}`]);
  }

  deleteBloc(id: number): void {
    this.blocService.deleteBloc(id).subscribe(() => {
      this.blocs = this.blocs.filter(bloc => bloc.id !== id);
    });
  }

  searchBlocsByNomEtCap(nb: string, cap: number): void {
    this.blocService.getBlocsByNomEtCap(nb, cap).subscribe((data: Bloc[]) => {
      this.searchResults = data;
    });
  }

  protected readonly Number = Number;
}
