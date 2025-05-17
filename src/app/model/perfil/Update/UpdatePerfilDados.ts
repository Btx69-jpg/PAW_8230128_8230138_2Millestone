export class UpdatePerfil {
    perfilPhoto: string;
    phoneNumber: number;
    email: string;

  constructor(perfilPhoto: string = '', phoneNumber: number, email: string) {
    this.perfilPhoto = perfilPhoto;
    this.phoneNumber = phoneNumber;
    this.email = email;

    //Validacoes
    this.validatePhoneNumber();
    this.validateEmail();
  }

  private validatePhoneNumber() {
    if (this.phoneNumber < 100000000 || this.phoneNumber > 999999999) {
        throw new Error('O numero de telefone tem de ser um numero entre 100000000 e 999999999');
    }
  }

  private validateEmail() {
    const regexEmail = /^([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})*$/;
    if (!regexEmail.test(this.email)) {
      throw new Error('Formato inválido para o email');
    }

    if (this.email.length > 50) {
      throw new Error('O email deve ter no máximo 50 caracteres');
    }
  }
}