import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocListComponent } from './components/bloc-list/bloc-list.component';
import { BlocDetailComponent } from './components/bloc-detail/bloc-detail.component';
import { BlocFormComponent } from './components/bloc-form/bloc-form.component';

const routes: Routes = [
  { path: '', component: BlocListComponent },
  { path: 'bloc/:id', component: BlocDetailComponent },
  { path: 'add-bloc', component: BlocFormComponent },
  { path: 'edit-bloc/:id', component: BlocFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
