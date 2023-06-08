import { useContext } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Pokemon } from '../../pokeapi/model';
import { PokemonContext } from '../state/pokemon/pokemon-provider';
import styles from './pokemon-detail.module.scss';

const getAbilities = (pokemon: Pokemon) => {
  return pokemon.abilities
    ?.filter((i) => !i.is_hidden)
    .map((item, index) => (
      <Badge key={index} bg='secondary' className={styles[`badge`]}>
        {item.ability.name}
      </Badge>
    ));
};

const getBestImage = (pokemon$: Pokemon) => {
  return (
    pokemon$?.sprites?.other?.home.front_default ||
    pokemon$?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon$?.sprites?.front_default ||
    undefined
  );
};

export function PokemonDetail() {
  const pokemon$ = useContext(PokemonContext);

  return (
    <Card className={styles['container']}>
      <div className={styles['title']}>
        {pokemon$ ? `${pokemon$.name} #${pokemon$?.id.toString().padStart(4, '0')}` : 'Pokemon Detail'}
      </div>
      {!pokemon$ ? (
        <div className={styles['detail-message']}>(No pokemon selected.)</div>
      ) : (
        <div className={styles['detail-summary']}>
          <div className={styles['primary-image']}>
            <img alt={pokemon$.name} src={getBestImage(pokemon$)} />
          </div>
          <div className={`${styles['detail-abilities']}`}>{getAbilities(pokemon$)}</div>
        </div>
      )}
    </Card>
  );
}

export default PokemonDetail;
