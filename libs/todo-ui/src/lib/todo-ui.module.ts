import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    TodoPageComponent,
    CreateFormComponent,
    TodoListComponent, TodoItemComponent, FilterBarComponent, ErrorAlertComponent],
  exports: [TodoPageComponent]
})
export class TodoUiModule { }
