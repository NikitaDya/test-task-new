import {Component, OnInit} from '@angular/core';
import {ApiService} from './service/api.service';
import {User} from  './models/User';
import {Hobby} from './models/Hobby';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  Users: User[];
  Hobbies: Hobby[];
  SelectedUser: string;

  constructor(private service: ApiService) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe((res) => {
      this.Users = res;
      if(this.Users.length > 0) {
        this.selectUser(this.Users[0]._id);
      }
    });

  }

  selectUser(id) {
    this.SelectedUser = id;
    this.Hobbies = this.Users.find((user) => user._id == id).hobbies;
  }

  addUser(name) {
    this.service.createUser(name).subscribe((res) => {
      this.Users.push(res);
    })
  }

  addHobby(hobby) {
    hobby.user = this.SelectedUser;
    this.service.createHobby(hobby).subscribe((res) => {
      this.Hobbies.push(res);
    })
  }

  deleteHobby(id) {
    this.service.deleteHobby(id).subscribe((res) => {
      for (let i = 0; i < this.Hobbies.length; i++) {
        if (this.Hobbies[i]._id === id) {
          this.Hobbies.splice(i, 1);
        }
      }
    });
  }
}
