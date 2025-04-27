import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { AI  ,Notifications, } from '../../utils/icons';
import useDimensions from '../../hooks/useDimensions';
import styles from '../../styles/Navbar.module.scss';

import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Media } from '@/types';
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
  const [isDark, setIsDark] = useState<boolean>(false);
  const { setModalData, setIsModal } = useContext(ModalContext);
  const [media, setMedia] = useState<Media>();
  const random = Math.floor(Math.random() * 20);

  const onClick = (data: Media) => {
    setModalData(data);
    setIsModal(true);
  };
  const getMedia = async () => {
    try {
      const result = await axios.get('/api/popular?type=movie');
      setMedia(result.data.data[random]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    getMedia();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

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
        {media && <button className={buttonStyles.aiButton} onClick={() => onClick(media)}><AI/>AI Assistant</button>}
      </div>

      <div className={styles.navBar__right}>
        <SearchBar />
        {!isMobile && <Notifications className={styles.icon} />}
        <div onClick={toggleTheme} className={styles.icon} title="Toggle Theme">
          {isDark ? <IoSunnySharp /> : <IoMoon />}
        </div>
        <Profile />
      </div>
    </motion.div>
  );
}
