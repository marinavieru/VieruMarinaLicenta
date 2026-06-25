import { ROOMS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: ({ pageNumber }) => ({
        url: ROOMS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Rooms'],
    }),

   getAvailableRooms: builder.query({
  query: ({ checkIn, checkOut, type }) => ({
    url: `${ROOMS_URL}/available`,
    params: {
      checkIn,
      checkOut,
      type,
    },
  }),
}),

    getRoomDetails: builder.query({
      query: (roomId) => ({
        url: `${ROOMS_URL}/${roomId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createRoom: builder.mutation({
      query: () => ({
        url: ROOMS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Rooms'],
    }),

    updateRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/${data.roomId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Rooms'],
    }),

    uploadRoomImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),

    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `${ROOMS_URL}/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomDetailsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useUploadRoomImageMutation,
  useDeleteRoomMutation,
  useGetAvailableRoomsQuery,
} = roomsApiSlice;
