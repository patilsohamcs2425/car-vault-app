import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class UserComponent {
  isLogin = true;
  email = '';
  password = '';
  username = '';
  
  message = '';      
  emailError = '';   

  constructor(private authService: AuthService, private router: Router) {}

  toggle() {
    this.isLogin = !this.isLogin;
    this.message = '';
    this.emailError = '';
  }

  validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }
    if (!emailPattern.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }
    this.emailError = '';
    return true;
  }

  submit() {
    this.message = ''; 
    if (!this.validateEmail()) return; 

    const user = { username: this.username, email: this.email, password: this.password };
    
    if (this.isLogin) {
      // FORCE CLEAN old corrupted tokens before logging in
      localStorage.clear(); 

      this.authService.login(user).subscribe({
        next: (res) => {
          // Save the fresh Token, Role, and Username
          this.authService.saveSession(res.token, res.role, res.username);
          this.router.navigate(['/cars']);
        },
        error: (err) => {
          console.error(err);
          this.message = err.error?.message || 'Invalid Credentials';
        }
      });
    } else {
      this.authService.register(user).subscribe({
        next: () => {
          this.message = 'Registration Successful! Please Login.';
          this.isLogin = true;
        },
        error: (err) => {
          this.message = err.error?.message || 'Registration failed.';
        }
      });
    }
  }
}