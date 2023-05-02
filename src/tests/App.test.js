import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(' Requisito 01 - Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', {
      name: /Home/i,
    });

    screen.getByRole('link', {
      name: /About/i,
    });

    screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', {
      name: /About/i,
    });

    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />);

    const notFound = 'teste-pagina-nao-encontrada';

    history.push(notFound);

    const pageNotFound = await screen.findByText(/page requested not found/i);

    expect(pageNotFound).toBeInTheDocument();
  });
});
