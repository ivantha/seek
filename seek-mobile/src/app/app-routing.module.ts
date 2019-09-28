import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: 'sessions', loadChildren: './sessions/sessions.module#SessionsPageModule'},
    {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
    {path: 'search', loadChildren: './search/search.module#SearchPageModule'},
  { path: 'skills', loadChildren: './skills/skills.module#SkillsPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
