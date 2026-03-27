import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { CarCreateComponent } from './components/car-create/car-create';
import { CarGetDeleteComponent } from './components/car-get-delete/car-get-delete';
import { CarUpdateComponent } from './components/car-update/car-update';
import { CarViewComponent } from './components/car-view/car-view';

export const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'cars', component: CarGetDeleteComponent },
  { path: 'create', component: CarCreateComponent },
  
  // CRITICAL FIX: Added "/:id" to these paths
  { path: 'update/:id', component: CarUpdateComponent },
  { path: 'view/:id', component: CarViewComponent }, 
  
  { path: '**', redirectTo: '' }
];