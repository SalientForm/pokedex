import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useLocalStorageState } from '../../../common/hooks/useLocalStorageState';
import { PokedexSearchFormModel } from './pokedex-search-form.model';
import styles from './pokedex-search-form.module.scss';
import { Form } from 'react-bootstrap';
import { FormEventHandler, useEffect, useState } from 'react';

export interface PokedexSearchFormProps {
  handlePokemonSearch: (searchText: string) => void;
}

const componentGuid = '544b1b48-6b94-4663-bbd5-bf518731d41b';
const debounceTime = 250;

export function PokedexSearchForm(props: PokedexSearchFormProps) {
  const [formData, setFormData] = useLocalStorageState<PokedexSearchFormModel>(componentGuid, { searchText: '' });
  const [updateTimeout, setUpdateTimeout] = useState<TimeoutId>();
  const updateFormData = (formUpdateData: Partial<PokedexSearchFormModel>) => {
    setFormData({ ...formData, ...formUpdateData });
  };

  useEffect(() => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    setUpdateTimeout(
      setTimeout(() => {
        props.handlePokemonSearch(formData.searchText);
      }, debounceTime)
    );
  }, [formData.searchText]);

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
              updateFormData({ searchText: event.target.value.trim() });
            }}
            placeholder='Enter search text'
            value={formData.searchText}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default PokedexSearchForm;
