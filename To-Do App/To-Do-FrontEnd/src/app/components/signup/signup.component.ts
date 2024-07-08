import { Component,OnInit,} from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HomeComponent } from '../../components/home/home.component';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,HomeComponent,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signIn:boolean
  registrationForm:FormGroup = new FormGroup({});

  constructor(private _userService:UserService,private router:Router,private _toaster:ToastrService){
    this.signIn = false;
  }

  ngOnInit(): void {
      this.InitializeForm();
  }

  onChangeToLogin()
  {
    this.signIn = !this.signIn;
    this.registrationForm.reset();
  }

  InitializeForm(){
    this.registrationForm = new FormGroup({
      userName: new FormControl('',[Validators.minLength(1),Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{3,20}$/)]),
      password:new FormControl('',[Validators.minLength(1),Validators.required])
    });
  }

  onFormSubmit()
  {
    
    if(this.registrationForm.invalid) {return;}
    let user:User={
      userName:this.registrationForm.get('userName')?.value,
      password:this.registrationForm.get('password')?.value
    }
    if(this.signIn)
    {
        this._userService.validateUser(user).subscribe(
          (data:any) => {
            if(data != null && data.token != null )
            {
              this._toaster.success("Welcome User");
              localStorage.setItem('token',data.token);
              this.router.navigate(['dashboard'])
              this.registrationForm.reset()
            }
            else if( data != null && data.token == null)
            {
              this._toaster.error("Wrong Credentials");
              this.signIn = false;
              this.router.navigate(['signup']);
              this.registrationForm.reset()
            }
          },
        );
    }
    else{
      this._userService.addUser(user).subscribe(
        {
          next:()=>{
            this._toaster.success("User Registered SuccessFully!");
            this.signIn = true;
            this.router.navigate(['signup']);
            this.registrationForm.reset()
          },
          error:()=>{
            this._toaster.error("User Already Exists");
          }
        }
      );
    }
  }
}

