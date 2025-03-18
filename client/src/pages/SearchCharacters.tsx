import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useLazyQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { SAVE_CHARACTER } from "../utils/mutations.js";
import { saveCharacterIds, getSavedCharacterIds } from "../utils/localStorage.js";
import type { Character } from "../models/Character.js";
<<<<<<< HEAD
import SearchForm from "../components/SearchForm.js"; // Import SearchForm component
import { SEARCH_CHARACTER } from "../utils/queries.js";
=======
import SearchForm from "../components/SearchForm.js"; 
import "./SearchCharacter.css";
>>>>>>> 4f85944e6800ccfeba4bc974b0ecaf7fa0f92537


const SearchCharacters = () => {
  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedCharacterIds, setSavedCharacterIds] = useState(getSavedCharacterIds());

  const [searchCharacter, { loading, error, data }] = useLazyQuery(SEARCH_CHARACTER);
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
        combat: character.combat || ""
      }));
      setSearchedCharacters(characterData);
    }
  }, [data]);

  const handleSaveCharacter = async (characterId: string, alignment: "hero" | "villain") => {
    const characterToSave: Character = searchedCharacters.find(
      (character) => character.characterId === characterId
    )!;

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    localStorage.setItem(alignment, JSON.stringify(characterId));

    try {
      const { data } = await saveCharacter({ variables: { ...characterToSave } });

      if (data.saveCharacter) {
        setSavedCharacterIds([...savedCharacterIds, characterToSave.characterId]);
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

          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleFormSubmit}
            isLoading={loading}
          />
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedCharacters.length
            ? `Viewing ${searchedCharacters.length} results:`
            : "Search for a character to begin"}
        </h2>
        <Row>
          {searchedCharacters.map((character) => (
            <Col xs={12} sm={6} md={4} className="mb-4" key={character.characterId}>
              <Card className="character-card">
                {character.image && (
                  <Card.Img
                    src={character.image}
                    alt={`The cover for ${character.name}`}
                    variant="top"
                    className="character-img"
                  />
                )}
                <Card.Body className="character-info">
                  <Card.Title>{character.name}</Card.Title>
                  <p className="small">Publisher: {character.publisher}</p>
                  <p className="small">Alignment: {character.alignment}</p>
                  <p className="small">Intelligence: {character.intelligence ?? "N/A"}</p>
                  <p className="small">Strength: {character.strength ?? "N/A"}</p>
                  <p className="small">Speed: {character.speed ?? "N/A"}</p>
                  <p className="small">Durability: {character.durability ?? "N/A"}</p>
                  <p className="small">Power: {character.power ?? "N/A"}</p>
                  <p className="small">Combat: {character.combat ?? "N/A"}</p>
                  
                  {Auth.loggedIn() && (
                    <>
                      <Button
                        disabled={savedCharacterIds.includes(character.characterId)}
                        className="btn-block btn-info character-btn"
                        onClick={() => handleSaveCharacter(character.characterId, "hero")}
                      >
                        {savedCharacterIds.includes(character.characterId)
                          ? "This character has already been saved!"
                          : "Hero"}
                      </Button>
                      <Button
                        disabled={savedCharacterIds.includes(character.characterId)}
                        className="btn-block btn-info character-btn"
                        onClick={() => handleSaveCharacter(character.characterId, "villain")}
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

export default SearchCharacters;
