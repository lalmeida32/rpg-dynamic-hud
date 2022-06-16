


class User {
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

    public auth(): string {
        // receives, in success, {token, userinfo, authoroties}
        try {
            const user_auth = login(this.username, this.password);
        } catch (e) {
            throw('Invalid User and/or password!');
        }

        

        this.token = user_auth.token;
        this.password = null;
        
        return this.token;
    }

}
