import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe(' Requisito 02 - Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    screen.getByRole('heading', {
      name: /about pokédex/i,
    });
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  // test('', () => {});
});
