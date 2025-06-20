import type { IGDBGameDTO } from '@lfgamers/shared-types';
import { Card, Container, Flex, px, Stack, Text } from '@mantine/core';
import GamePoster from '@components/gamesListItem/gamePoster';
import { formatEpochDate } from '@utils/dateHelper';

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
                <Stack>
                    <Flex align='flex-end'>
                        <Container m={0} p={0} >
                            <GamePoster gameId={game.id} />
                        </Container>
                        <Container fluid ml={px('md')}>
                            <Text
                                fw='bold'
                                size='lg'
                            >
                                {game.name} - {formatEpochDate(game.first_release_date)}
                            </Text>
                        </Container>
                    </Flex>
                    <Text>
                        {game.summary}
                    </Text>
                </Stack>
            </Container>
        </Card>
    );
}

export default GameListItem;