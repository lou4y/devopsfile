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
  blocs: Bloc[] | undefined = [];
  blocsWithoutFoyer: Bloc[] = [];
  searchResults: Bloc[] = [];
block: Bloc | undefined;
  constructor(private blocService: BlocService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.blocs = await this.blocService.getBlocs().toPromise();
    // @ts-ignore
    this.block = this.blocs[0];
    console.log(this.blocs);
    console.log(this.block?.nomBloc);
    this.blocService.getBlocsWithoutFoyer().subscribe((data: Bloc[]) => {
      this.blocsWithoutFoyer = data;
    });
  }

  navigateToAddBloc(): void {
    this.router.navigate(['/add-bloc']);
  }

  editBloc(id: number | undefined): void {
    this.router.navigate([`/edit-bloc/${id}`]);
  }

  deleteBloc(id: number | undefined): void {
    this.blocService.deleteBloc(id).subscribe(() => {
      // @ts-ignore
      this.blocs = this.blocs.filter(bloc => bloc.id !== id);
    });
  }

  searchBlocsByNomEtCap(nb: string, cap: number): void {
    this.blocService.getBlocsByNomEtCap(nb, Number(cap)).subscribe(
      (data: Bloc[]) => {
        this.searchResults = data;
      },
      error => {
        console.error('Error fetching search results:', error);
      }
    );
  }


  protected readonly Number = Number;
}
