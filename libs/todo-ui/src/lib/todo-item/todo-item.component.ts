import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ListTodos_listTodos_items } from '@rcf/appsync';

@Component({
  selector: 'rcf-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo: ListTodos_listTodos_items;
  @Output() toggled = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<boolean>();
}