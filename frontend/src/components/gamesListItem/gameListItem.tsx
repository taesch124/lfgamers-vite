import type { IGDBGameDTO } from '@lfgamers/shared-types';
import { Card, Container, Grid, Text } from '@mantine/core';
import GamePoster from './gamePoster';

function GameListItem(props: { game: IGDBGameDTO }) {
    const { game } = props;

    return (
        <Card
            key={game.uuid}
            withBorder
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ marginBottom: '1rem' }}
        >
            <Container>
                <Grid align='center' justify='space-between'>
                    <Grid.Col span={3}>
                        <GamePoster gameId={game.id} />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text>
                            {game.name} - {game.first_release_date}
                        </Text>
                        <Text>
                            {game.summary}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Container>
        </Card>
    );
}

export default GameListItem;