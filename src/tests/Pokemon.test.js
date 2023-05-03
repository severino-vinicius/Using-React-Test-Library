import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(' Requisito 06 - Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    screen.getByText(/pikachu/i);
    const typePokemon = screen.getByTestId('pokemon-type');
    screen.getByText(/average weight: 6\.0 kg/i);
    screen.getByRole('link', {
      name: /more details/i,
    });

    const image = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(image).toHaveAttribute('alt', image.alt);
    expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(typePokemon).toHaveTextContent('Electric');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteBtn = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(favoriteBtn);

    const image = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(image).toHaveAttribute('alt', image.alt);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
