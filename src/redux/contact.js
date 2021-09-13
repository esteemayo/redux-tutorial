import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: null,
    },
    reducers: {
        setContacts: (state, { payload }) => {
            state.contacts = payload;
        },
        addContact: (state, { payload }) => {
            state.contacts.push(payload);
        },
        deleteContact: (state, { payload }) => {
            state.contacts = state.contacts.filter((c) => c.id !== payload);
        },
    },
});

export const { addContact, deleteContact, setContacts } = contactSlice.actions;

export default contactSlice.reducer;
