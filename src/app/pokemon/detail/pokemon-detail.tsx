import PokedexViewHistory from "../../pokedex/view-history/pokedex-view-history";
import styles from './pokemon-detail.module.scss';
import { useSelector } from 'react-redux';
import { selectSelectedPokemon } from '../../pokedex/state/pokemon-index/pokemon-index.slice';
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
  const pokemon$ = useSelector(selectSelectedPokemon);

  console.log(pokemon$?.sprites);

  return (
    <div className={styles['container']}>
      <Card className={styles['detail']}>
        <div className={styles['title']}>{(pokemon$) ? `${pokemon$.name} #${pokemon$?.id.toString().padStart(4, '0')}` : 'Pokemon Detail'}</div>
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
      <PokedexViewHistory></PokedexViewHistory>
    </div>
  );
}

export default PokemonDetail;
