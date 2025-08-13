'use client'

import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {deleteUserAction} from "@/app/actions";

export default function PageClient()
{
    const queryClient = useQueryClient()

    const {data: user, isLoading} = useSuspenseQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return new Promise(resolve => setTimeout(() => resolve([{id: 1, name: 'users'}]), 5000));
        },
        staleTime: 8000,
        refetchOnMount: false,
        refetchOnError: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const {mutate: deleteUser} = useMutation({
        mutationFn: async (id) => deleteUserAction(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            const previousData = queryClient.getQueryData(['users']);
            queryClient.setQueryData(['users'], (old) => (old.filter((oldData) => oldData.id !== id)))
            return { previousData };
        },
        onError: (_e, _i, context) => {
            return queryClient.setQueryData(['users'], context?.previousData);
        }
    });

    return (
        <div>
            <div>
                <h1>INSTRUCTIONS:</h1>
                <p>
                    1. Open your ssr console (the one `npm run dev` was run in, not the browser console)<br />
                    2. Refresh this page until the `console.log` appears (again) and until 3 users are visible below.<br /><br />
                    <strong>You now have 8 seconds to:</strong> <br />
                    3. Click the "Delete" button next to "Delete Me" or any other user in the list<br />
                    4. Refresh the browser page<br />
                    5. The user has now re-appeared, even tho we deleted him from our "database" (the users.json file)<br />
                </p>
                <p>
                    <i>Notice: React Query DevTools are installed and enabled.</i>
                </p>
            </div>
            <br />
            <div>
                Here is a list of all users:
                {isLoading && (
                    <p>Loading...</p>
                )}
                <ul>
                    {user?.map(u => (
                        <li key={u.id}>
                            {u.name}&nbsp;
                            <button onClick={() => deleteUser(u.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
