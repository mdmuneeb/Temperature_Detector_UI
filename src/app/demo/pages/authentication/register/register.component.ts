// angular import
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  isLoading:boolean = false;

  RegisterForm = new FormGroup({ 
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly userService: UserService,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    console.log(this.RegisterForm.value);
    if(this.RegisterForm.valid) {
      this.isLoading = true;
      console.log('Form is valid');
      

      this.userService.userRegister(this.RegisterForm.value).subscribe({
        
        next: (res) => {
        console.log(res);
        if(res.success){
          this.toastr.success('Registered', 'Successfull!');
        }
        else{
          this.toastr.error('Error', 'There is some error kindly enter credentials again !');
        }
        this.isLoading = false;
        this.RegisterForm.reset();
      }, error:(error) => {
        console.log(error);
        this.toastr.success('Error', 'There is some error kindly enter credentials again !');
        this.isLoading = false;
      }})

      
    }
  }
}
