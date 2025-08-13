import PageClient from "@/app/page.client";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { promises as fs } from 'fs';

export default async function Home()
{
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            console.log("Backend Server has been fetched")
            const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
            return JSON.parse(file)
        },
        staleTime: 8000 // 8 seconds
    }).catch()

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageClient />
        </HydrationBoundary>
    );
}
