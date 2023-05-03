import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonData from '../data';
// import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const pokemonList = [];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const noFavorite = screen.getByText(/no favorite pokémon found/i);

    expect(noFavorite).toBeInTheDocument();
  });
  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const pokemonList = [pokemonData[1]];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const image = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });

    expect(image).toHaveAttribute('alt', image.alt);
  });
});
