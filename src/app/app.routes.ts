import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { LoginComponent } from './componentes/login/login.component';
import { UserpageComponent } from './componentes/userpage/userpage.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { PrivacidadeComponent } from './LGPD/privacidade/privacidade.component';
import { NgModule } from '@angular/core';
import { TermosDeUsoComponent } from './LGPD/termos/termos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userpage', component: UserpageComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'privacidade', component: PrivacidadeComponent },
    { path: 'termos', component: TermosDeUsoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 20] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
