import { Component, OnInit, inject } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MatIconButton, MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardImage, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { Meta } from '@angular/platform-browser'

// Import user service
import { UserService } from '../../services/user.service'

// Import Auth Service
import { AuthService } from '../../services/auth.service'

// Import Alert Dialog
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        MatCard,
        MatCardImage,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        MatIconButton,
        MatCardActions,
        MatButton,
        ReactiveFormsModule
    ],
})
export class LoginComponent implements OnInit {

  private meta = inject(Meta)
  private http = inject(UserService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private auth = inject(AuthService)
  private dialog = inject(MatDialog)

  // Form Validation
  loginForm!: FormGroup
  submitted: boolean = false

  // Variables สำหรับรับค่าจากฟอร์ม
  userData = {
    username: '',
    password: '',
  }

  // สร้างตัวแปรเก็บข้อมูลการ Login
  userLogin = {
    "username": "",
    "email": "",
    "role": "",
    "token": ""
  }

  // สำหรับซ่อนแสดง password
  hide = true

  // ฟังก์ชัน ngOnInit สำหรับเริ่มต้นการทำงาน
  ngOnInit() {

    // กำหนด Meta Tag description
    this.meta.addTag({ name: 'description', content: 'Login page for Stock Management' })

    // กำหนดค่าให้กับ Form
    this.loginForm = this.formBuilder.group({
      username: ['user1', [Validators.required, Validators.minLength(3)]], // iamsamit
      password: ['User1@1234', [Validators.required, Validators.minLength(8)]], // Samit@1234
    })
  }

  // ฟังก์ชัน Submit สำหรับ Login
  submitLogin() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    } else {
      this.userData.username = this.loginForm.value.username
      this.userData.password = this.loginForm.value.password

      console.log(this.userData)

      // เรียกใช้งาน Service สำหรับ Login
      this.http.Login(this.userData).subscribe({
        next: (data: any) => {
          if (data.token != null) {
            
            console.log(data)

            // show dialog
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'Login Success',
                icon: 'check_circle',
                iconColor: 'green',
                subtitle: 'Welcome to our website.',
              },
              disableClose: true,
            })

            this.userLogin = {
              "username": data.userData.userName,
              "email": data.userData.email,
              "role": data.userData.roles[0],
              "token": data.token
            }

            // เก็บข้อมูลผู้ใช้งานลง cookie
            this.auth.setUser(this.userLogin)

            // ส่งไปหน้า Home
            // delay 2 วินาที
            setTimeout(() => {
              // Redirect ไปหน้า backend
              window.location.href = '/dashboard'
            }, 2000)

          }
        },
        error: (error) => {
          console.log(error)
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'มีข้อผิดพลาด',
              icon: 'error',
              iconColor: 'red',
              subtitle: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง',
            },
            disableClose: true,
          })
        }
      })

    }
  }

  // สำหรับลิงก์ไปหน้า Register
  onClickRegister() {
    this.router.navigate(['/register'])
  }
}