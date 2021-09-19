import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingSpinner } from 'assets/icons';
import { addContact } from 'redux/contact';

const ContactInput = () => {
    const nameInputRef = useRef('');
    const phoneInputRef = useRef('');

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameInputRef.current.value;
        const phone = phoneInputRef.current.value;

        if (!name || !phone) return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/contacts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ name, phone }),
            });

            const data = await res.json();

            nameInputRef.current.value = '';
            phoneInputRef.current.value = '';

            dispatch(addContact(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='contact-form'>
                    <div className='input-group'>
                        <input
                            type='text'
                            className='rounded-l-lg contact-input'
                            placeholder='name'
                            ref={nameInputRef}
                            disabled={loading}
                        />
                        <input
                            type='text'
                            className='rounded-r-lg contact-input'
                            placeholder='phone'
                            ref={phoneInputRef}
                            disabled={loading}
                        />
                    </div>
                    <button type='submit' className='add-button' disabled={loading}>
                        {loading && <LoadingSpinner className='spinner' />}
                        {loading ? 'Adding' : 'Add'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ContactInput;
