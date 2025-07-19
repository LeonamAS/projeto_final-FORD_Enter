import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PrivacidadeComponent } from './LGPD/privacidade/privacidade.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userpage', component: UserpageComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'privacidade', component: PrivacidadeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 20] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
