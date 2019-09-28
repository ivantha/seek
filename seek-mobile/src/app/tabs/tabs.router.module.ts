import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'sessions',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../sessions/sessions.module').then(m => m.SessionsPageModule)
                    }
                ]
            },
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../search/search.module').then(m => m.SearchPageModule)
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../profile/profile.module').then(m => m.ProfilePageModule)
                    }
                ]
            },
            {
                path: 'skills',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../skills/skills.module').then(m => m.SkillsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/search',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/search',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
