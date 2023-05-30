import { useContext } from 'react';
import { useParams } from 'react-router';
import { PokemonContext } from '../../common/providers/pokemon-provider';
import PokedexViewHistory from '../../pokedex/view-history/pokedex-view-history';
import { PokedexDispatch } from "../../state/root-store";
import styles from './pokemon-detail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonIndexActions, selectSelectedPokemon } from '../../pokedex/state/pokemon-index/pokemon-index.slice';
import { Badge, Card } from 'react-bootstrap';
import { PokemonEntity } from '../state/pokemon/pokemon.slice';

const getAbilities = (pokemon: PokemonEntity) => {
  return pokemon.abilities?.map((item) => (
    <Badge key={item.ability.name} bg='secondary' className={styles[`badge`]}>
      {item.ability.name}
    </Badge>
  ));
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
            {pokemon$?.sprites?.front_default ? (
              <img alt={pokemon$.name} src={pokemon$?.sprites?.other?.home.front_default} />
            ) : null}
          </div>
          <div className={`${styles['detail-abilities']}`}>{getAbilities(pokemon$)}</div>
        </div>
      )}
    </Card>
  );
}

export default PokemonDetail;
