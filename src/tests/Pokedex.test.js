import React from 'react';
import { screen, act } from '@testing-library/react';
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

    const firstPokemon = screen.getAllByRole('img');
    screen.getByText(/pikachu/i);
    expect(firstPokemon.length).toBe(1);

    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    act(() => userEvent.click(nextPokemonBtn));

    screen.getByText(/charmander/i);

    const nextPokemon = screen.getAllByRole('img');
    expect(nextPokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);

    const filtersBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filtersBtn.length).toBe(7);

    expect(filtersBtn[0].innerHTML).toBe('Electric');
    expect(filtersBtn[1].innerHTML).toBe('Fire');
    expect(filtersBtn[2].innerHTML).toBe('Bug');
    expect(filtersBtn[3].innerHTML).toBe('Poison');
    expect(filtersBtn[4].innerHTML).toBe('Psychic');
    expect(filtersBtn[5].innerHTML).toBe('Normal');
    expect(filtersBtn[6].innerHTML).toBe('Dragon');
  });

  test('Teste se a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);

    const fireFilterBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireFilterBtn);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Fire');

    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonBtn);

    expect(typePokemon).toHaveTextContent('Fire');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const filterBugBtn = screen.getByRole('button', {
      name: /bug/i,
    });

    userEvent.click(filterBugBtn);

    const pokemonBugFilterd = screen.getByText(/caterpie/i);

    expect(pokemonBugFilterd).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(resetBtn).toHaveTextContent('All');

    userEvent.click(resetBtn);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonBtn);

    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });
});
