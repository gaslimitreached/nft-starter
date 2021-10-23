/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router'
const navigation = [
  { name: 'Team', href: '/team' },
  { name: 'Roadmap', href: '#' },
]
import Footer from '../components/footer';
import OpenseaBadge from '../components/badges/opensea';

export default function Home() {
  const [provider, setProvider] = useState('no-provider');
  const [loadingState, setLoadingState] = useState('not-loaded');

  async function getProvider() {
    const web3Modal = new Web3Modal({});
    const connection = await web3Modal.connect();
    setProvider('provided');
    return new ethers.providers.Web3Provider(connection);
  }
  const router = useRouter();

  if (loadingState === 'loaded' && !latestPop) return (<h1 className="px-20 py-10 text-3xl">Loading...</h1>)
  return (
    <div className="relative overflow-y-scroll">
      <h1 className="flex justify-center text-3xl">Project!</h1>
    </div>
  )
}
