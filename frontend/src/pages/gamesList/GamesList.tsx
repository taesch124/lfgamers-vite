import { IGDBGameDTO } from "@lfgamers/shared-types";
import { Button, Container, Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import appClient from "../../api/apiClient";
import GameListItem from "../../components/gamesListItem/gameListItem";
import { useState } from "react";

function GamesList() {
    const [count, setCount] = useState(0);
    const { isPending, isError, data, error } = useQuery<Array<IGDBGameDTO>>({
        queryKey: ['igdb', 'games'],
        queryFn: async () => {
            const response = await appClient.get<Array<IGDBGameDTO>>('/api/igdb/games');
            return response.data;
        },
    });
    console.log('GamesList', { isPending, isError, data, error });

    if (isError) {
        return <Text>Error: {error instanceof Error ? error.message : 'An error occurred'}</Text>;
    }

    return (
        <Container>
            <Grid>
                <Grid.Col span={12}>
                    <Button onClick={() => setCount((count) => count + 1)}>
                        Hi there: count is {count} test
                    </Button>
                </Grid.Col>
                <Grid.Col span={12}>
                    {isPending ? (
                        <Text>Loading...</Text>
                    ) : (
                        <>
                            {data?.map((game) => (
                                <GameListItem key={game.uuid} game={game} />
                            ))}
                        </>
                    )}
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default GamesList;