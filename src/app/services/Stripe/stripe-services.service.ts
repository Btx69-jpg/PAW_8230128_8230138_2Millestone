import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { loadStripe } from '@stripe/stripe-js';

const endPoint = 'http://localhost:3000/api/v1/checkout/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  constructor(private http: HttpClient) {}

  /**
   * * Procura por utilizador especifico
   * */
  async redirectToCheckout(): Promise<void> {
    const stripe = await loadStripe(environment.stripePublicKey);

    if (!stripe) {
      throw new Error('Stripe.js não foi carregado');
    }

    try {
      const session = await this.http.post<{ id: string }>(`${endPoint}/create-checkout-session`,{}).toPromise();

      if (!session?.id) {
        throw new Error('Sessão de checkout inválida');
      }
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        alert(result.error.message);
      }
    } catch (err) {
      console.error('Erro ao redirecionar para checkout:', err);
      alert('Erro ao iniciar checkout');
    }
  }

  /**
   *!Forma para mandar varios produtos está comentado pois ainda temos de implementar o carrinho
  */
  /*
  async redirectToCheckout(products: { name: string; price: number; quantity: number }[]): Promise<void> {
  const stripe = await loadStripe(environment.stripePublicKey);

  if (!stripe) {
    throw new Error('Stripe.js não foi carregado');
  }

  try {
    const session = await this.http
      .post<{ id: string }>(`${endPoint}create-checkout-session`, { products }, httpOptions)
      .toPromise();

    if (!session?.id) {
      throw new Error('Sessão de checkout inválida');
    }

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
      alert(result.error.message);
    }
  } catch (err) {
    console.error('Erro ao redirecionar para checkout:', err);
    alert('Erro ao iniciar checkout');
  }
}
  */
}
