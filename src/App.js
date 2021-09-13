import ContactInput from './components/ContactInput';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className='container mx-auto'>
      <h1 className='page-title'>Contacts</h1>
      <ContactInput />
      <ContactList />
    </div>
  );
};

export default App;
