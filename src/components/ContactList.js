import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteIcon, PhoneIcon, UserIcon } from '../assets/icons';
import { deleteContact, setContacts } from '../redux/contact';

const ContactList = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contacts);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/contacts');
            const data = await res.json();
            dispatch(setContacts(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const removeContact = async (id) => {
        if (!window.confirm('Are you sure?')) return;

        try {
            await fetch(`http://localhost:5000/contacts/${id}`, {
                method: 'DELETE',
            });

            dispatch(deleteContact(id));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    return (
        <div className='contacts-wrapper'>
            {contacts?.length > 0 ? (
                contacts.map((contact) => {
                    const { id, name, phone } = contact;

                    return (
                        <div key={id} className='contact-card group '>
                            <img
                                src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                                alt='headshot'
                                className='contact-image'
                            ></img>
                            <div className='relative w-full p-2'>
                                <button
                                    className='delete-button'
                                    onClick={() => removeContact(id)}
                                >
                                    <DeleteIcon />
                                </button>

                                <div className='flex items-center'>
                                    <UserIcon className='mr-2' />
                                    <p className='name'>{name}</p>
                                </div>
                                <div className='flex items-center'>
                                    <PhoneIcon className='mr-2' />
                                    <p className='phone'>{phone}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : contacts ? (
                <p>You have no contacts yet</p>
            ) : loading ? (
                <p>Loading..</p>
            ) : null}
        </div>
    );
};

export default ContactList;
