export class Password {
    atualPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    constructor(passwordAtual: string, newPassword: string, confirmNewPassword: string) {
        this.atualPassword = passwordAtual;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;

        //Validacoes
        this.validatePassword();
    }

    private validatePassword() {
        if (this.atualPassword.length < 8) {
            throw new Error('A password deve ter no mínimo 8 caracteres');
        }

        if (this.newPassword.length < 8) {
            throw new Error('A password deve ter no mínimo 8 caracteres');
        }

        if (this.confirmNewPassword.length < 8) {
            throw new Error('A password deve ter no mínimo 8 caracteres');
        }
    }
}