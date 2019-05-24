import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {

  @Input() Hobbies: any[];
  @Output() public AddHobby = new EventEmitter();
  @Output() public DeleteHobby = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  addHobby(hobby) {
    this.AddHobby.emit(hobby);
  }

  deleteHobby(id) {
    this.DeleteHobby.emit(id);
  }
}
