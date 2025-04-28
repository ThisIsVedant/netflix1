import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { AI  ,Notifications, } from '../../utils/icons';
import useDimensions from '../../hooks/useDimensions';
import styles from '../../styles/Navbar.module.scss';

// import { IoSunnySharp } from "react-icons/io5";
// import { IoMoon } from "react-icons/io5";

import { useContext, useEffect   } from 'react';
import { ModalContext } from '../../context/ModalContext';
import axios from 'axios';
import buttonStyles from '../../styles/Button.module.scss';


const Profile = dynamic(import('./Profile'));
const SearchBar = dynamic(import('./SearchBar'));
const Menu = dynamic(import('./Menu'));

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled}: NavbarProps): React.ReactElement {
  const navBackground = isScrolled ? styles.navBar__filled : styles.navBar;
  const { isMobile } = useDimensions();
  // const [isDark, setIsDark] = useState<boolean>(false);
  const { setModalData, setIsModal } = useContext(ModalContext);

  const getRandomMedia = async () => {
    try {
      const res = await axios.get('/api/popular?type=movie');
      const movies = res.data.data;
      const randomIndex = Math.floor(Math.random() * movies.length);
      return movies[randomIndex];
    } catch (error) {
      console.error('Failed to fetch random media', error);
      return null;
    }
  };

  const handleAiPicksClick = async () => {
    const randomMedia = await getRandomMedia();
    if (randomMedia) {
      setModalData(randomMedia);
      setIsModal(true);
    }
  };

  useEffect(() => {
    
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme === 'dark') {
    //   document.body.classList.add('dark');
    //   setIsDark(true);
    // }
  }, []);

  // const toggleTheme = () => {
  //   if (isDark) {
  //     document.body.classList.remove('dark');
  //     localStorage.setItem('theme', 'light');
  //   } else {
  //     document.body.classList.add('dark');
  //     localStorage.setItem('theme', 'dark');
  //   }
  //   setIsDark(!isDark);
  // };

  return (
    <motion.div
      className={navBackground}
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.2 } },
        visible: { opacity: 1, transition: { duration: 0.2 } }
      }}>
      <div className={styles.navBar__left}>
        <Menu />
        {<button className={buttonStyles.aiButton} onClick={handleAiPicksClick}><AI/>AI Picks</button>}
      </div>

      <div className={styles.navBar__right}>
        <SearchBar />
        {!isMobile && <Notifications className={styles.icon} />}
        {/* <div onClick={toggleTheme} className={styles.icon} title="Toggle Theme">
          {isDark ? <IoSunnySharp /> : <IoMoon />}
        </div> */}
        <Profile />
      </div>
    </motion.div>
  );
}
