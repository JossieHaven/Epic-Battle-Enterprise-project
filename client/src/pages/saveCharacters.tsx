// import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
// import Auth from '../utils/auth';
import { removeCharacterId } from '../utils/localStorage';
import { REMOVE_CHARACTER } from '../utils/mutations.js';
import auth from '../utils/auth';

const SavedCharacters = () => {
  
const {loading, data, error} = useQuery(QUERY_ME, {
  skip : !auth.loggedIn(),
});

const [removeCharacter] = useMutation(REMOVE_CHARACTER) 

  if (loading) {
    return <h2>Loading....</h2>
  } 

  if (error) {
    return <h2>EHH! Error...{error.message}</h2>
  }

  if (!data || data.me.savedCharacters.length === 0) {
    return <h2>You have no saved character.</h2>
  }

  // create function that accepts the character's mongo _id value as param and deletes the character from the database
  const handleDeleteCharacter = async (characterId: string) => {
    
    try {
      const {data} = await removeCharacter({
        variables: {characterId},
        refetchQueries: [{query:QUERY_ME}],
        
      });
      if (data.removeCharacter) {
        removeCharacterId(characterId)
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {data.me.username ? (
            <h1>Viewing {data.me.username}'s saved characters!</h1>
          ) : (
            <h1>Viewing saved characters!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.me.savedCharacters.length
            ? `Viewing ${data.me.savedCharacters.length} saved ${
              data.me.savedCharacters.length === 1 ? 'character' : 'characters'
              }:`
            : 'You have no saved characters!'}
        </h2>
        <Row>
          {data.me.savedCharacters.map((character:any) => {
            return (
              <Col md='4' key={character.characterId}>
                <Card key={character.characterId} border='dark'>
                  {character.image ? (
                    <Card.Img
                      src={character.image}
                      alt={`The cover for ${character.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{character.title}</Card.Title>
                    <p className='small'>Authors: {character.authors}</p>
                    <Card.Text>{character.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteCharacter(character.characterId)}
                    >
                      X
                    </Button>
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

export default SavedCharacters;
