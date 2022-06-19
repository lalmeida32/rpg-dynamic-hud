import { login } from 'mocks/login'
import { signup } from 'mocks/signup'

export class User {
    private username: string;
    private password: string;
    private email: string;
    private token: string;

    construct(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: str) {
        this.password = password;
    }

    public setEmail(email: str) {
        this.email = email;
    }

    public auth() {
        // receives, in success, {token, userinfo, authoroties}
        this.token = login(username.value, password.value);
        console.log(this.token);
        this.password = null;
        
    }

    public commit = () => {
        console.log(this.username);
        signup(this.username, this.email, this.password);
    }
}

