import {Hobby} from './Hobby';

export interface User {
  _id: string,
  name: string,
  hobbies: Hobby[];
}
