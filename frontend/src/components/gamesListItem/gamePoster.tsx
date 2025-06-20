import { Image, Skeleton, Text } from '@mantine/core';
import type { IGDBCoverDTO } from '@lfgamers/shared-types';
import { useQuery } from '@tanstack/react-query';
import appClient from '@api/apiClient';

function GamePoster(props: { gameId: number }) {
    const { gameId } = props;

    const { isPending, isError, data, error } = useQuery<IGDBCoverDTO>({
        queryKey: ['igdb', 'games', 'poster', gameId],
        queryFn: async () => {
            const response = await appClient.get<IGDBCoverDTO>(`/api/igdb/games/poster/${gameId}`);

            return response.data;
        },
    });

    if (isPending || !data?.url) {
        return <Skeleton
            animate={isPending}
            height={data?.height ?? 200}
            width={data?.width ?? 150}
            visible
        />;
    }

    if (isError) {
        return <Text>Error: {error instanceof Error ? error.message : 'An error occurred'}</Text>;
    }

    return (
        <Image
            src={data?.url ? `https:${data.url}` : ''}
            height={data?.height ?? 200}
            width={data?.height ?? 150}
            alt="Game Poster"
        />
    );
}

export default GamePoster;