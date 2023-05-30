import { Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonContext } from '../../common/providers/pokemon-provider';
import { fetchPokemonById, PokemonEntity, selectPokemonById } from '../state/pokemon/pokemon.slice';
import { PokedexDispatch } from '../../state/root-store';
import styles from './pokemon-summary-card.module.scss';
import { useContext, useEffect } from 'react';

export interface PokemonCardSummaryProps {
  title?: string;
  className?: string;
  onClick?: (pokemonId: number) => void;
  rolloverEffect?: boolean;
}

const getAbilities = (pokemon?: PokemonEntity) => {
  if (!pokemon) {
    return '';
  }
  return (
    <div className={`${styles['abilities']}`}>
      {pokemon?.abilities?.map((item) => (
        <Badge key={item.ability.name} bg='secondary' className={styles[`badge`]}>
          {item.ability.name}
        </Badge>
      ))}
    </div>
  );
};

export function PokemonSummaryCard(props: PokemonCardSummaryProps) {
  const pokemon = useContext(PokemonContext);

  const handleCardClick = () => {
    if (props.onClick && pokemon) {
      props.onClick(pokemon.id);
    }
  };

  if (!pokemon) {
    return <Card onClick={handleCardClick} className={`${styles['container']} ${props.className}}`}></Card>;
  }

  return (
    <Card
      onClick={handleCardClick}
      className={`${styles['container']} ${props.className} ${props.rolloverEffect && styles['rolloverEffect']}`}
    >
      { props.title ? <div className={styles['title']}>{props.title}</div> : '' }
      <div className={styles['primary-image']}>
        {pokemon?.sprites?.front_default ? <img alt={pokemon.name} src={pokemon?.sprites?.front_default} /> : ''}
      </div>
      <div className={`${styles['name']}`}>
        {`${pokemon.name}`}
        {/*TODO: add prop to pokemon: idDisplayText*/}
        <div>{`#${pokemon.id.toString().padStart(4, '0')}`}</div>
      </div>
      {getAbilities(pokemon)}
    </Card>
  );
}

export default PokemonSummaryCard;
