import { Component, OnInit } from '@angular/core';  // 👈 añade OnInit
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  // 👈 implementa OnInit
  loading = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/guias']);
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value as any).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/guias']); },
      error: (e) => { this.loading = false; this.snack.open(e?.error?.message || 'Credenciales inválidas', 'OK', { duration: 3000 }); }
    });
  }
}
