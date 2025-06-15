import type { IGDBCoverDTO } from '@lfgamers/shared-types';
import { Text, Image, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import appClient from '../../api/apiClient';

function GamePoster(props: { gameId: number }) {
    const { gameId } = props;

    const { isPending, isError, data, error } = useQuery<IGDBCoverDTO>({
        queryKey: ['igdb', 'games', 'poster', gameId],
        queryFn: async () => {
            const response = await appClient.get<IGDBCoverDTO>(`/api/igdb/games/poster/${gameId}`);
            return response.data;
        },
    });

    console.log('GameListItem', { isPending, isError, data, error });

    if (isPending || !data?.url) return <Skeleton visible height={200} width={150} animate={isPending} />;

    if (isError) {
        return <Text>Error: {error instanceof Error ? error.message : 'An error occurred'}</Text>;
    }

    return (
        <Image
            src={data?.url ? `https:${data.url}` : ''}
            alt="Game Poster"
        />
    );
}

export default GamePoster;