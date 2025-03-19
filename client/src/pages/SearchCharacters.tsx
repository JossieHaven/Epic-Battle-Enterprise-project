import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useLazyQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { SAVE_CHARACTER } from "../utils/mutations.js";
import {
  saveCharacterIds,
  getSavedCharacterIds,
} from "../utils/localStorage.js";
import type { Character } from "../models/Character.js";
import SearchForm from "../components/SearchForm.js"; // Import SearchForm component
import { SEARCH_CHARACTER } from "../utils/queries.js";
import styled from "styled-components";
import "./SearchCharacter.css"

const SearchCharacters = () => {
  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedCharacterIds, setSavedCharacterIds] = useState(
    getSavedCharacterIds()
  );

  const [searchCharacter, { loading, error, data }] =
    useLazyQuery(SEARCH_CHARACTER);
  const [saveCharacter] = useMutation(SAVE_CHARACTER);

  useEffect(() => {
    return () => saveCharacterIds(savedCharacterIds);
  }, [savedCharacterIds]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) return;
    searchCharacter({ variables: { name: searchInput } });

    if (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data && data.searchCharacter) {
      const characterData = data.searchCharacter.map((character: any) => ({
        characterId: character.characterId,
        name: character.name,
        publisher: character.publisher || "No publisher to display",
        image: character.image || "",
        alignment: character.alignment || "",
        intelligence: character.intelligence || "",
        strength: character.strength || "",
        speed: character.speed || "",
        durability: character.durability || "",
        power: character.power || "",
        combat: character.combat || "",
      }));
      setSearchedCharacters(characterData);
    }
  }, [data]);

  const handleSaveCharacter = async (
    characterId: string,
    alignment: "hero" | "villain"
  ) => {
    const characterToSave: Character = searchedCharacters.find(
      (character) => character.characterId === characterId
    )!;

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    localStorage.setItem(alignment, JSON.stringify(characterToSave));

    try {
      const { data } = await saveCharacter({
        variables: { ...characterToSave },
      });

      if (data.saveCharacter) {
        setSavedCharacterIds([
          ...savedCharacterIds,
          characterToSave.characterId,
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <StyledHeader>
        <Container>
          <h1> Hero | Villain </h1>

          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleFormSubmit}
            isLoading={loading}
          />
        </Container>
      </StyledHeader>

      <Container>
        <StyledResultsText>
          {searchedCharacters.length
            ? `Viewing ${searchedCharacters.length} results:`
            : "Select a hero and a villain for your battle"}
        </StyledResultsText>
        
        <Row>
          {searchedCharacters.map((character) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              className="mb-4"
              key={character.characterId}
            >
              <Card className="character-card2">
                {character.image && (
                  <Card.Img
                    src={character.image}
                    alt={`The cover for ${character.name}`}
                    variant="top"
                    className="character-img2"
                  />
                )}
                <Card.Body className="character-info">
                  <Card.Title><p className="char-name">🎭{character.name}</p></Card.Title>
                  <p className="small">📝 Publisher: {character.publisher}</p>
                  <p className="small">☯️ Alignment: {character.alignment}</p>
                  <p className="small">
                  🧠 Intelligence: {character.intelligence ?? "N/A"}
                  </p>
                  <p className="small">
                  💪 Strength: {character.strength ?? "N/A"}
                  </p>
                  <p className="small">⚡Speed: {character.speed ?? "N/A"}</p>
                  <p className="small">
                  🛡️ Durability: {character.durability ?? "N/A"}
                  </p>
                  <p className="small">🔥 Power: {character.power ?? "N/A"}</p>
                  <p className="small">⚔️ Combat: {character.combat ?? "N/A"}</p>

                  {Auth.loggedIn() && (
                    <>
                      <Button
                        disabled={savedCharacterIds.includes(
                          character.characterId
                        )}
                        className="btn-block btn-info character-btn"
                        onClick={() =>
                          handleSaveCharacter(character.characterId, "hero")
                        }
                      >
                        {savedCharacterIds.includes(character.characterId)
                          ? "This character has already been saved!"
                          : "Hero"}
                      </Button>
                      <Button
                        disabled={savedCharacterIds.includes(
                          character.characterId
                        )}
                        className="btn-block btn-info character-btn"
                        onClick={() =>
                          handleSaveCharacter(character.characterId, "villain")
                        }
                      >
                        {savedCharacterIds.includes(character.characterId)
                          ? "This character has already been saved!"
                          : "Villain"}
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

// Styled components for better UI
const StyledHeader = styled.div`
  text-align: center;
  color: white;
  padding: 5rem 0;
  background: linear-gradient(135deg,rgb(248, 122, 4),rgb(253, 207, 3),rgb(251, 255, 39));
  border-radius: 15px;
  
  h1 {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.3);
    margin-top: -20px; /* Moves the text closer to the top */
    padding-bottom: 35px;
  }
`;

const StyledResultsText = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 6px; /* Increased spacing for a bolder look */
  padding-top: 3rem;
  margin-bottom: 1.5rem;
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Bangers', cursive;
  
  /* Glow Effect */
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.6), 
    0 0 20px rgba(255, 255, 255, 0.5),
    0 0 30px rgba(240, 231, 228, 0.4); /* Extra soft outer glow */
`;

export default SearchCharacters;
