import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.auth.logout();
    this.route.navigate(['/']);
    Swal.fire('Cierre de sesión', '¡Has cerrado sesión de manera exitosa!', 'success');
  }
}
