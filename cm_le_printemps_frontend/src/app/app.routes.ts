import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
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
        path: "**",
        component: NotfoundComponent
    }
];
