import { Routes } from '@angular/router';
import { InicioComponent } from './home/home.component';

import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

import { VerContratosComponent } from './contrato/ver-contratos/ver-contratos.component';
import { VerContratoComponent } from './contrato/ver-contrato/ver-contrato.component';
import { LoginComponent } from './auth/login/login.component';
import { InmuebleBrowserComponent } from './property/inmueble-browser/inmueble-browser.component';
import { FormularioPublicarPropiedadComponent } from './property/formulario-publicar-propiedad/formulario-publicar-propiedad.component';
import { FormularioEditarPropiedadComponent } from './property/formulario-editar-propiedad/formulario-editar-propiedad.component';
import { FormularioNuevoContratoComponent } from './contrato/formulario-nuevo-contrato/formulario-nuevo-contrato.component';
import { VerPropiedadComponent } from './property/ver-propiedad/ver-propiedad.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent,  canActivate:[AuthenticatedGuard]},
    {path:'inicio', component:InicioComponent, canActivate:[AuthGuard]},
    {path:'propiedad/todos/:tipoTransaccion', component:InmuebleBrowserComponent, canActivate:[AuthGuard]},
    {path:'inmuebles-en-venta', component:InmuebleBrowserComponent, canActivate:[AuthGuard]},
    {path:'publicar-propiedad', component:FormularioPublicarPropiedadComponent, canActivate:[AuthGuard]},
    {path:'editar-propiedad/:id', component:FormularioEditarPropiedadComponent, canActivate:[AuthGuard]},
    {path:'nuevo-contrato', component:FormularioNuevoContratoComponent, canActivate:[AuthGuard]},
    {path:'contratos', component:VerContratosComponent, canActivate:[AuthGuard]},
    {path:'contrato/:id', component:VerContratoComponent, canActivate:[AuthGuard]},
    {path:'ver-propiedad/:id', component:VerPropiedadComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir la ruta raíz a 'login'
    { path: '**', redirectTo: 'login' } // Manejar rutas no encontradas
 
];
