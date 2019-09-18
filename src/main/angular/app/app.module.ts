import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ExternalConfigurationService } from './ExternalConfigurationService';
import { AngularHalModule } from 'angular-hal';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SitmunPluginCoreModule, AuthInterceptor,AuthExpiredInterceptor, UserChangePasswordComponent,LoginComponent,LoginService,AccountEditComponent,AccountChangePasswordComponent,HasAnyAuthorityDirective,HasAnyAuthorityOnTerritoryDirective,ServiceListComponent,ServiceEditComponent,MapConfigurationManagerService } from 'sitmun-plugin-core';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
        path: 'account',
        component: AccountEditComponent
    }
    , {
        path: 'change-password',
        component: AccountChangePasswordComponent
    }
    ,
    
    {
        path: 'user-change-password/:id',
        component: UserChangePasswordComponent
    },
    {
        path: 'service-add',
        component: ServiceEditComponent
    },
    {
        path: 'service-edit/:id',
        component: ServiceEditComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        SitmunPluginCoreModule,
        MatSidenavModule,
        AngularHalModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    entryComponents: [
    ],
    providers: [
        { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
        , {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        //Map Configuration Service
        MapConfigurationManagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
