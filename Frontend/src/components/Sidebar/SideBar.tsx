import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { AppSidebar } from './styles';

export default function SideBar() {
  const router = useRouter();

  return (
    <AppSidebar>
      <img src="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI" alt="Gympass" />

      <footer>
        <button type="button" onClick={router.back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </AppSidebar>
  );
}