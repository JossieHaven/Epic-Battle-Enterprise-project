import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_CHARACTER } from '../utils/mutations.js';
import { searchSuperheroAPI } from '../utils/API.js';
import { saveCharacterIds, getSavedCharacterIds } from '../utils/localStorage.js';
import type { Character } from '../models/Character.js';
import type { ICharacter } from '../models/CharacterAPI.js';

const SearchCharacters = () => {
  // create state for holding returned google api data
  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved characterId values
  const [savedCharacterIds, setSavedCharacterIds] = useState(getSavedCharacterIds());
  const [saveCharacter] = useMutation(SAVE_CHARACTER)

  // set up useEffect hook to save `saveCharacterIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCharacterIds(savedCharacterIds);
  }), [saveCharacterIds];

  // create method to search for character and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchSuperheroAPI(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const characterData = items.map((character: ICharacter) => ({
        characterId: character.id,
        publisher: character.stats.publisher || ['No publisher to display'],
        name: character.stats.name,
        description: character.stats.description,
        image: character.stats.image || '',
        powerstats: character.stats.powerstats,
        allignment: character.stats.allignment,
        gender: character.stats.gender,
        race: character.stats.race,
      }));

      setSearchedCharacters(characterData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a character to our database
  const handleSaveCharacter = async (characterId: string) => {
    // find the character in `searchedCharacters` state by the matching id
    const characterToSave: Character = searchedCharacters.find((character) => character.characterId === characterId)!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log(characterToSave)
    try {
      const {data} = await saveCharacter({
        variables: {
          ...characterToSave
        }
      });

      if (data.saveCharacter) {
        setSavedCharacterIds([...savedCharacterIds, characterToSave.characterId])
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Characters!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a character'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedCharacters.length
            ? `Viewing ${searchedCharacters.length} results:`
            : 'Search for a character to begin'}
        </h2>
        <Row>
          {searchedCharacters.map((character) => {
            return (
              <Col md="4" key={character.characterId}>
                <Card border='dark'>
                  {character.image ? (
                    <Card.Img src={character.image} alt={`The cover for ${character.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <p className='small'>Publisher: {character.publisher}</p>
                    <Card.Text>{character.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCharacterIds?.some((savedCharacterId: string) => savedCharacterId === character.characterId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveCharacter(character.characterId)}>
                        {savedCharacterIds?.some((savedCharacterId: string) => savedCharacterId === character.characterId)
                          ? 'This character has already been saved!'
                          : 'Save this Character!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchCharacters;
