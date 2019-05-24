import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() Users: any[];
  @Output() public AddUser = new EventEmitter();
  @Output() public SelectUser = new EventEmitter();

  @Input() selectedId: string;

  constructor() { }

  ngOnInit() {
  }

  addUser(name) {
    this.AddUser.emit({name: name});
  }

  selectUser(id, i) {
    if(this.selectedId !== i) {
      this.SelectUser.emit(id);
    }
  }
}
