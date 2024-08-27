import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MatInput, MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RecipesListComponent,
    ConfirmationDialogComponent,
    MyRecipesListComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatInput
  ],
  providers: [
    AuthenticationService,
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
