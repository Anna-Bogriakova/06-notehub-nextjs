import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, NotesResponse } from "@/lib/api";

interface NotesPageProps {
  searchParams?: { page?: string };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const page = Number(searchParams?.page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<NotesResponse>({
    queryKey: ["notes", page, { debouncedSearch: "" }],
    queryFn: () => fetchNotes("", page),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />;
    </HydrationBoundary>
  );
}
