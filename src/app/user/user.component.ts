import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue!: FormGroup;
  userModelObject : UserModel = new UserModel();
  userdata !: any;
  constructor(private formbuilber: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllUser();
  }
  postUserDetail(){
    this.userModelObject.firstName = this.formValue.value.firstName;
    this.userModelObject.lastName = this.formValue.value.lastName;
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.mobile = this.formValue.value.mobile;
    this.userModelObject.salary = this.formValue.value.salary;

    this.api.postUser(this.userModelObject)
    .subscribe(res=>{
      console.log(res);
      alert('User added success')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser(
      )
    },
    err=>{
      alert('fail')
    })
  }
  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userdata = res;
    })
  }

}
