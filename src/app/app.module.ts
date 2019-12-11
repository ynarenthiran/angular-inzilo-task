import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModules } from './shared/material';
import { TableComponent } from './table/table.component';

const routes: Routes = [

]
@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, MaterialModules, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HelloComponent, TableComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
