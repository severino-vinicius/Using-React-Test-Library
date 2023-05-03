import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Pokedex from '../pages/Pokedex';
// import PokemonData from '../data';

describe(' Requisito 05 - Teste o componente <Pokedex.js />', () => {
  // const pokemonList = [PokemonData[0], PokemonData[1], PokemonData[2]];

  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(
      <App />,
    );

    screen.getByText(/pikachu/i);

    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextPokemonBtn);

    screen.getByText(/charmander/i);
  });

  // test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  //   renderWithRouter(<NotFound />);

  //   const image = screen.getByRole('img');

  //   expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  // });
});
