import { memo, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { PokemonContext } from '../state/pokemon/pokemon-provider';
import PokemonSummaryDetail from './detail/pokemon-summary-detail';
import styles from './pokemon-summary-card.module.scss';

export interface PokemonCardSummaryProps {
  title?: string;
  className?: string;
  onClick?: (pokemonId: number) => void;
  rolloverEffect?: boolean;
}

export const PokemonSummaryCard = memo(function PokemonSummaryCard(props: PokemonCardSummaryProps) {
  const pokemon = useContext(PokemonContext);

  const handleCardClick = () => {
    if (props.onClick && pokemon) {
      props.onClick(pokemon.id);
    }
  };

  if (!pokemon) {
    // return <Card onClick={handleCardClick} className={`${styles['container']} ${props.className}`}></Card>;
    return null;
  }

  return (
    <>
      <div className={styles['title']}>{props.title}</div>
      <Card
        onClick={handleCardClick}
        className={`${styles['container']} ${props.className} ${props.rolloverEffect && styles['rolloverEffect']}`}
      >
        <PokemonSummaryDetail />
      </Card>
    </>
  );
});

export default PokemonSummaryCard;
