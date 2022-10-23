import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Row,
  Text,
} from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GameModal from "../Components/GameModal";
import { Game } from "../types";

const Home: NextPage = () => {
  const [listOfGames, setListOfGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListOfGames(data.results);
      });
  }, []);

  useEffect(() => {
    console.log(listOfGames);
  }, [listOfGames]);

  const handleModalVisibility = (visible: boolean) => {
    setModalVisibility(visible);
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setModalVisibility(true);
  };

  return (
    <Container responsive css={{ padding: "1rem", height: "100%" }}>
      <Grid.Container gap={2} justify="center">
        {listOfGames?.map((game: Game, index: number) => {
          return (
            <Grid xs={12} sm={4} key={index}>
              <Card isHoverable>
                <Card.Header
                  css={{
                    backgroundColor: "rgba(0,0,0, 0.15)",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  <Col>
                    <Text h4 weight="bold" transform="uppercase" color="white">
                      {game.name}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={game.background_image}
                  objectFit="cover"
                  width="100%"
                  height={340}
                />
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bottom: 0,
                    zIndex: 1,
                    bgBlur: "#0f111466",
                  }}
                >
                  <Col>
                    <Row justify="flex-end">
                      <Button
                        flat
                        auto
                        rounded
                        onPress={() => handleSelectGame(game)}
                        css={{ color: "#ffffff", bg: "#94f9f026" }}
                      >
                        <Text
                          css={{ color: "inherit" }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          More Info
                        </Text>
                      </Button>
                    </Row>
                  </Col>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
      <GameModal
        game={selectedGame}
        open={modalVisibility}
        handleOpen={setModalVisibility}
      />
    </Container>
  );
};

export default Home;
