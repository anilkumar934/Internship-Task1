import { Routes } from '@angular/router';
import { ActiveCompletedTasksComponent } from './components/active-completed-tasks/active-completed-tasks.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { authenticGuard } from './RouteGuards/authentic.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'',
        component:HomeComponent,
        canActivate:[authenticGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                data:{
                    routeOption:"Dashboard"
                }
            },
            {
                path:'active',
                component:ActiveCompletedTasksComponent,
                data:{
                    routeOption:"Active"
                }
            },
            {
                path:'completed',
                component:ActiveCompletedTasksComponent,
                data:{
                    routeOption:"Completed"
                }
            }
        ]
    }
];
