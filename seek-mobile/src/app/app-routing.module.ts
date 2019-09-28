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
    {path: 'filter-modal', loadChildren: './filter-modal/filter-modal.module#FilterModalPageModule'},
    {path: 'skills', loadChildren: './skills/skills.module#SkillsPageModule'},
    {path: 'signup', loadChildren: './signup/signup.module#SignupPageModule'},
    {path: 'signin', loadChildren: './signin/signin.module#SigninPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
