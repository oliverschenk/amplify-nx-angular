import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AppSyncClient, CreateTodoVariables,
  CreateTodo_createTodo, CREATE_TODO,
  DeleteTodoVariables, DeleteTodo_deleteTodo, DELETE_TODO,
  executeMutation,
  ListTodos, ListTodosVariables, ListTodos_listTodos_items, LIST_TODOS,
  UpdateTodoVariables, UpdateTodo_updateTodo, UPDATE_TODO
} from '@rcf/appsync';
import { TodoFilterType } from '../model';

@Component({
  selector: 'rcf-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoPageComponent implements OnInit {
  todos: ListTodos_listTodos_items[];
  errorMessage: string | null = null;
  filter: TodoFilterType = 'SHOW_ALL';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    AppSyncClient.watchQuery<ListTodos, ListTodosVariables>({
      query: LIST_TODOS
    }).subscribe(todoList => {
      this.todos = todoList.data
        ? todoList.data.listTodos.items.sort((a, b) =>
          a.createdOnClientAt.localeCompare(b.createdOnClientAt)
        )
        : [];
      this.cd.markForCheck();
    }, this.handleError);
  }

  handleError = (err: any) => {
    this.errorMessage = err.message;
  };

  create(name: string) {
    executeMutation<CreateTodoVariables, CreateTodo_createTodo>({
      mutation: CREATE_TODO,
      variablesInfo: {
        input: {
          name,
          completed: false,
          createdOnClientAt: new Date().toISOString()
        }
      },
      cacheUpdateQuery: [LIST_TODOS],
      typename: 'Todo'
    }).catch(this.handleError);
  }

  toggle({
    id,
    completed,
    createdOnClientAt,
    name
  }: ListTodos_listTodos_items) {
    executeMutation<UpdateTodoVariables, UpdateTodo_updateTodo>({
      mutation: UPDATE_TODO,
      variablesInfo: {
        input: {
          completed: !completed,
          id,
          createdOnClientAt,
          name
        }
      },
      cacheUpdateQuery: null,
      typename: 'Todo'
    }).catch(this.handleError);
  }

  delete({ id }: ListTodos_listTodos_items) {
    executeMutation<DeleteTodoVariables, DeleteTodo_deleteTodo>({
      mutation: DELETE_TODO,
      variablesInfo: {
        input: { id }
      },
      cacheUpdateQuery: [LIST_TODOS],
      typename: 'Todo'
    }).catch(this.handleError);
  }
}