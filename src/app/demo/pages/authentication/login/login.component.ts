// angular import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {


  loginForm = new FormGroup({
    Email : new FormControl('', [Validators.required]),
    Password : new FormControl('', [Validators.required]),
  })


  isLoading:boolean = false;
  constructor(
    private readonly userService: UserService,
    private toastr: ToastrService,
    private readonly router: Router
  ) { }

  onSubmit() {
  console.log(this.loginForm.value);
  console.log(this.loginForm.valid);
  if(this.loginForm.valid) {
      this.isLoading = true;
      
      this.userService.userLogin(this.loginForm.value).subscribe({
      next: (res) => {  
        if(res.success){
          console.log(res);
          this.toastr.success('Logged in', 'Successfull!');
          this.router.navigate(['/default']);
        }
        else{
          this.toastr.error('Error', 'There is some error kindly enter credentials again !');
        }
        this.loginForm.reset();
        this.isLoading = false;

      }
      , error:(error) => {
        console.log(error);
        this.toastr.error('Error', 'There is some error kindly enter credentials again !');
        this.isLoading = false;
      }
    })
  }
}
}
