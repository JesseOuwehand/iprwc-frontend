import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {LoginCredentials} from "../models/login-credentials.model";
import {BehaviorSubject, tap} from "rxjs";
import {CurrentUser} from "../models/current-user.model";
import {Router} from "@angular/router";

export interface ResponseData {
  token: string;
}

export interface UserInfo {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  currentUser = new BehaviorSubject<CurrentUser>(null);

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(newUser: User) {
    return this.http
      .post<ResponseData>('https://bayoucountry.nl:8443/api/v1/auth/register', newUser)
      .pipe(
        tap(response => {
          this.authenticate(newUser.getEmail(), response.token)
        })
      )
  }

  Login(credentials: LoginCredentials) {
    return this.http
      .post<ResponseData>('https://bayoucountry.nl:8443/api/v1/auth/login', credentials)
      .pipe(
        tap(response => {
          this.authenticate(credentials.getEmail(), response.token);
        })
      );
  }

  autoLogin() {
    const user: {
      _email: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('user'))

    if (!user) { return; }

    this.authenticate(user._email, user._token);
  }

  logout() {
    this.currentUser.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('user');
  }

  authenticate(email: string, token: string) {
    const user = new CurrentUser(
      1,
      email,
      '',
      '',
      token,
      'user'
    );
    this.currentUser.next(user);
    this.fetchUserInfo(token).subscribe()
  }

  fetchUserInfo(token: string) {
    return this.http
      .get<UserInfo>('https://bayoucountry.nl:8443/api/v1/user/info')
      .pipe(
        tap(userInfo => {
          const currentUser = new CurrentUser(
            userInfo.id,
            userInfo.email,
            userInfo.firstName,
            userInfo.lastName,
            token,
            userInfo.role
          )
          this.currentUser.next(currentUser)
          localStorage.setItem('user', JSON.stringify({
            _email: currentUser.email,
            _token: currentUser.token
          }))
        })
      )
  }
}
