import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashHomeComponent } from './dashboard/dashboardScreen/dash-home/dash-home.component';
import { ServiceComponent } from './dashboard/dashboardScreen/service/service.component';
import { ContactComponent } from './dashboard/dashboardScreen/contact/contact.component';
import { RendezVousComponent } from './dashboard/dashboardScreen/rendez-vous/rendez-vous.component';
import { DemandeComponent } from './dashboard/dashboardScreen/demande/demande.component';
import { UserComponent } from './dashboard/dashboardScreen/user/user.component';
import { CommentaireComponent } from './dashboard/dashboardScreen/commentaire/commentaire.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        outlet: "primary"
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "services",
        component: ServicesComponent
    },
    {
        path: "contacts",
        component: ContactsComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "dashboard/:id",
        component: DashboardComponent,
        children: [
            {
                path: "",
                redirectTo: "acceuil",
                pathMatch: "full"
            },
            {
                path: "acceuil",
                component: DashHomeComponent
            },
            {
                path: "service",
                component: ServiceComponent
            },
            {
                path: "divers",
                component: ContactComponent
            },
            {
                path: "rdv",
                component: RendezVousComponent
            },
            {
                path: "demande",
                component: DemandeComponent
            },
            {
                path: "users",
                component: UserComponent
            },
            {
                path: "commentaires",
                component: CommentaireComponent
            }
        ]
    },
    {
        path: "**",
        component: NotfoundComponent
    }
];

