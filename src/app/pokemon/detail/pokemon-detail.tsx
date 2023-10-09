import { useContext } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PreloadedImage } from '../../common/components/preloaded-image/preloaded-image';
import {EvolutionChain, Pokemon} from '../../pokeapi/model';
import { PokemonContext } from '../state/pokemon/pokemon-provider';
import styles from './pokemon-detail.module.scss';
import { selectNextPokemonId, selectPreviousPokemonId } from '../../pokedex/state/pokemon-index/pokemon-index.slice';
import { useFetchEvolutionChainBySpeciesQuery } from '../state/evolution-chain/evolution-chain.service';

const getAbilities = (pokemon: Pokemon) => {
  return pokemon.abilities
    ?.filter((i) => !i.is_hidden)
    .map((item, index) => (
      <Badge key={index} bg='secondary' className={styles[`badge`]}>
        {item.ability.name}
      </Badge>
    ));
};

const getEvolutionChain = (evolutionChain: EvolutionChain) => {
  const flatTree = [evolutionChain.chain.species];

  // chainLink.chain.evolves_to
  //   .map((item, index) => (
  //     <Badge key={index} bg='secondary' className={styles[`badge`]}>
  //       {item.species.name}
  //     </Badge>
  //   ));

   return flatTree;
};



const getBestImage = (pokemon$: Pokemon) => {
  return (
    pokemon$?.sprites?.other?.home.front_default ||
    pokemon$?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon$?.sprites?.front_default ||
    ''
  );
};

export function PokemonDetail() {
  const pokemon$ = useContext(PokemonContext);
  const navigate = useNavigate();
  const nextIndex = useSelector(selectNextPokemonId);
  const previousIndex = useSelector(selectPreviousPokemonId);

  // -- load evolution chain --

  const speciesName = !pokemon$ ? '' : pokemon$.species.name ?? '';
  const {
    data: evolutionChain,
    error: evolutionChainError,
    isLoading: evolutionChainIsLoading,
  } = useFetchEvolutionChainBySpeciesQuery(speciesName, { skip: !pokemon$ });

  const onClickNext = () => {
    navigate(`/pokemon/detail/${nextIndex}`);
  };

  const onClickPrevious = () => {
    navigate(`/pokemon/detail/${previousIndex}`, {});
  };

  if (!pokemon$) {
    return (
      <Card className={styles['container']}>
        <div className={styles['title']}>Pokemon Detail</div>
        <div className={styles['detail-message']}>(No pokemon selected.)</div>
      </Card>
    );
  }

  return (
    <Card className={styles['container']}>
      <div className={styles['title']}>{`${pokemon$.name} #${pokemon$?.id.toString().padStart(4, '0')}`}</div>
      <div className={`w-100 d-flex flex-row overflow-scroll h-100 flex-grow-1`}>
        <div onClick={onClickPrevious} className={`${styles['increment']} ${styles['previous']}`}>
          <i className='bi bi-chevron-left'></i>
        </div>
        <div className={styles['detail-summary']}>
          <div className={styles['primary-image']}>
            {getBestImage(pokemon$) === '' ? (
              <div key={pokemon$.id} className={styles['image-missing']}>
                <div className={styles['image-missing-text']}>?</div>
                <div className={styles['image-missing-image']}></div>
              </div>
            ) : (
              <PreloadedImage src={getBestImage(pokemon$)} alt={pokemon$.name} title={pokemon$.name} />
            )}
          </div>
          <div className={styles['pokemon-detail']}>
            <span className={styles['pokemon-detail-title']}>Abilities</span>
            <div className={`${styles['detail-abilities']}`}>{getAbilities(pokemon$)}</div>
          </div>
          <div className={styles['evolution-chain']}>{getEvolutionChain(evolutionChain)}</div>
        </div>
        <div onClick={onClickNext} className={`${styles['increment']} ${styles['next']}`}>
          <i className='bi bi-chevron-right'></i>
        </div>
      </div>
    </Card>
  );
}

export default PokemonDetail;
