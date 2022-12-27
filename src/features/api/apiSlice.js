import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http:localhost:88/api/v1",
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => {
    return {
      getAllNotes: builder.query({
        query: () => "/notes",
        providesTags: ["Notes"],
      }),
      getNoteById: builder.query({
        query: (id) => `/notes/${id}`,
        invalidatesTags: ["Notes"],
      }),
      postNote: builder.mutation({
        query: (title) => ({
          url: "notes/new",
          method: "POST",
          body: { title },
        }),
        invalidatesTags: ["Notes"],
      }),
      updateNote: builder.mutation({
        query: (title) => ({
          url: "notes/new",
          method: "PUT",
          body: { title },
        }),
        invalidatesTags: ["Notes"],
      }),
      deleteNote: builder.mutation({
        query: (id) => ({
          url: `notes/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Notes"],
      }),
    };
  },
});

export const {
  useGetAllNotesQuery,
  useGetNoteByIdQuery,
  usePostNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
