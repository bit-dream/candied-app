import Head from 'next/head'
import Image from "next/image";
import ButtonLayout from "../components/buttons/ButtonLayout";
import Button from "../components/buttons/Button";
import LargeInsetButton from "../components/buttons/LargeInsetButton";
import Icon from '../components/Icon/Icon'

export default function Home() {
  return (
    <>
      <Head>
        <title>Candied</title>
        <meta name="description" content="A DBC Creator Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image
            className='-z-10'
            src={'/Innovation_Isometric.svg'}
            alt={'Background'}
            fill
        />
      <div className='absolute w-full top-12'>
          <div className='container mx-auto text-center'>
              <div>
                  {'CANDIED'.split('').map((l: string, k: number)=>{
                      return(
                      <span className='bg-gray-700 dark:bg-transparent text-7xl odd:text-red-500 even:text-gray-50 font-extrabold' key={k}>
                          {l}
                      </span>
                      );
                  })}
              </div>
              <br/>
              <p className='text-sm dark:text-white'>A full featured, easy to use, DBC editing platform and visualization tool</p>
          </div>
      </div>
      <div className='absolute w-full bottom-20'>
          <div className='container mx-auto'>
              <ButtonLayout>
                  <LargeInsetButton
                      heading={'Try a Demo'}
                      text={'Visualize a pre-made, demo DBC file'}
                      href='/demo'
                  />
                  <LargeInsetButton
                      heading={'DBC Editor'}
                      text={'Edit an existing DBC file or create a new one'}
                      href='/editor'
                  />
                  <LargeInsetButton
                      heading={'DBC Visualization'}
                      text={'Try our DBC visualization tool'}
                      href='/demo'
                  />
              </ButtonLayout>
          </div>
      </div>
      </main>
    </>
  )
}
