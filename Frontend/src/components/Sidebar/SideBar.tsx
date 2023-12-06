import React, { useContext } from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FiArrowLeft, FiList, FiLogOut, FiSearch, FiUser } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { AppSidebar, ContainerOptions, Options } from './styles';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import gympassPNG from '../../public/assets/gympass.png'

export default function SideBar() {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext)

  return (
    <AppSidebar>
      <ContainerOptions>
        <Link href="/dashboard">
          <img src="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI" alt="Gympass" />
        </Link>
        <Options>
          <Link href="/check-ins-usuario">
            <button type="button">
                <FiUser size={24} color="#FFF" />
            </button>
          </Link>

          <Link href="/academias">
            <button type="button">
                <FiSearch size={24} color="#FFF" />
            </button>
          </Link>

          {user?.isAdmin && (
            <Link href="/check-ins">
              <button type="button">
                  <FiList size={24} color="#FFF" />
              </button>
            </Link>
          )}

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
        <button type="button" onClick={signOut}>
          <FiLogOut size={24} color="#FFF" />
        </button>
      </footer>
    </AppSidebar>
  );
}