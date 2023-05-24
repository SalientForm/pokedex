import styles from './pokedex-search-form.module.scss';
import { Button, Card, Form } from 'react-bootstrap';
import { FormEventHandler, useEffect, useState } from 'react';

/* eslint-disable-next-line */
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
    <Card className={styles['container']}>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="d-flex flex-row" controlId="pokedexSearch">
          <Form.Control
            type="text"
            onChange={(event) => {
              setSearchText(event.target.value.trim());
            }}
            placeholder="Enter search text"
            value={searchText}
            className={'me-3'}
          />
          <Button
            variant="primary"
            type="button"
            onClick={() => props.handlePokemonSearch(searchText)}
          >
            Go
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
}

export default PokedexSearchForm;
