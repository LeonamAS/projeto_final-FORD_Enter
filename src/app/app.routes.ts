import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PainelAdminComponent } from './componentes/painel-admin/painel-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { ServicosComponent } from './pages/userpage/servicos/servicos.component';
import { PedidosComponent } from './pages/userpage/pedidos/pedidos.component';
import { DadosComponent } from './pages/userpage/dados/dados.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'sobre',
        loadComponent: () => import('./pages/sobre/sobre.component').then(
            (c) => (c.SobreComponent)
        )
    },
    {
        path: 'galeria',
        loadComponent: () => import('./pages/galeria/galeria.component').then(
            (c) => (c.GaleriaComponent)
        )
    },
    {
        path: 'contato',
        loadComponent: () => import('./pages/contato/contato.component').then(
            (c) => (c.ContatoComponent)
        )
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(
            (c) => (c.LoginComponent)
        )
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./pages/cadastro/cadastro.component').then(
            (c) => (c.CadastroComponent)
        )
    },
    {
        path: 'privacidade',
        loadComponent: () => import('./LGPD/privacidade/privacidade.component').then(
            (c) => (c.PrivacidadeComponent)
        )
    },
    {
        path: 'termos',
        loadComponent: () => import('./LGPD/termos/termos.component').then(
            (c) => (c.TermosDeUsoComponent)
        )
    },
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
