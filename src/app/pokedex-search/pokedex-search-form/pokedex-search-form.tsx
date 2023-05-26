import styles from './pokedex-search-form.module.scss';
import { Form } from 'react-bootstrap';
import { FormEventHandler, useEffect, useState } from 'react';

export interface PokedexSearchFormProps {
  handlePokemonSearch: (searchText: string) => void;
}

export function PokedexSearchForm(props: PokedexSearchFormProps) {
  const [searchText, setSearchText] = useState('');

  //
  // NOTE: if PokeApi supported fuzzy search we would want to debounce the search to limit api calls
  //
  useEffect(() => {
    props.handlePokemonSearch(searchText);
  }, [props, searchText]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles['container']}>
      <Form data-testid='pokedex-search-form' onSubmit={handleOnSubmit}>
        <Form.Group className='d-flex flex-row' controlId='searchText'>
          <Form.Control
            type='text'
            onChange={(event) => {
              setSearchText(event.target.value.trim());
            }}
            placeholder='Enter search text'
            value={searchText}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default PokedexSearchForm;
