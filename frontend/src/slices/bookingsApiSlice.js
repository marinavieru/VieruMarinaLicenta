import { apiSlice } from "./apiSlice";
import { BOOKINGS_URL } from '../constants.js';

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getBookings: builder.query({
      query: () => BOOKINGS_URL,
      providesTags: ['Bookings'],
    }),

    getMyBookings: builder.query({
      query: () => `${BOOKINGS_URL}/mybookings`,
      providesTags: ['Bookings'],
    }),

    getBookingDetails: builder.query({
      query: (id) => `${BOOKINGS_URL}/${id}`,
      providesTags: ['Bookings'],
    }),

    updateBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/${data.bookingId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Bookings'],
    }),

    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `${BOOKINGS_URL}/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),

    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/checkout-session`,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useGetBookingsQuery,
  useGetMyBookingsQuery,
  useGetBookingDetailsQuery,
  useCreateCheckoutSessionMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApiSlice;
