import Cookies from 'universal-cookie';

const isAuthed = () => {
  const cookies = new Cookies();
  return cookies.get("user_id") ? true : false;
}

export default isAuthed;