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
import { PedidosComponent } from './dashboard/pedidos/pedidos.component';
import { DadosComponent } from './dashboard/dados/dados.component';
import { PainelAdminComponent } from './dashboard/painel-admin/painel-admin.component';
import { ServicosComponent } from './dashboard/servicos/servicos.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'privacidade', component: PrivacidadeComponent },
    { path: 'termos', component: TermosDeUsoComponent },
    {
        path: 'userpage', component: UserpageComponent, children: [
            { path: 'servicos', component: ServicosComponent },
            { path: 'pedidos', component: PedidosComponent },
            { path: 'dados', component: DadosComponent },
            { path: 'painel-admin', component: PainelAdminComponent },
            { path: '', redirectTo: 'servicos', pathMatch: 'full' } 
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 20] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
