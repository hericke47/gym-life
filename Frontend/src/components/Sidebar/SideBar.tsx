import React, { useContext } from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FiArrowLeft } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { AppSidebar, ContainerOptions, Options } from './styles';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';

export default function SideBar() {
  const router = useRouter();
  const { user } = useContext(AuthContext)

  return (
    <AppSidebar>
      <ContainerOptions>
        <Link href="/dashboard">
          <img src="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI" alt="Gympass" />
        </Link>
        <Options>
          {user?.isAdmin && (
            <Link href="/criar-academia">
              <button type="button">
                  <GiWeightLiftingUp size={24} color="#FFF" />
              </button>
            </Link>
          )}
        </Options>
      </ContainerOptions>

      <footer>
        <button type="button" onClick={router.back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </AppSidebar>
  );
}