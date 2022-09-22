import React from 'react';
import Head from 'next/head';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import launchIcon from '../public/static/icons/launch.json';

import VercelInviteUser from '../components/vercel-invite-user';
import { render } from '../../../packages/render/dist/index';

export default function Home() {
  const launchIconRef = React.useRef<LottieRefCurrentProps>(null);
  const html = render(<VercelInviteUser />);

  return (
    <>
      <Head>
        <title>Preview - React Email</title>
      </Head>
      
      <div className="w-full bg-gray-1 text-gray-12">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between m-2 p-2">
          <a href="https://react.email" target="_blank" className="transition duration-300 ease-in-out hover:opacity-60">
            <svg width="16" height="16" viewBox="0 0 107 106" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M101.25 101.083C105.659 96.6745 106.49 90.7112 106.003 85.5605C105.511 80.344 103.595 74.6796 100.875 69.0295C98.4229 63.9377 95.1545 58.522 91.1988 53C95.1545 47.478 98.4229 42.0623 100.875 36.9705C103.595 31.3204 105.511 25.656 106.003 20.4395C106.49 15.2888 105.659 9.32548 101.25 4.91674C96.841 0.507999 90.8777 -0.323118 85.727 0.163082C80.5106 0.65549 74.8462 2.57153 69.196 5.29199C64.1042 7.74358 58.6885 11.012 53.1665 14.9677C47.6445 11.012 42.2288 7.74358 37.137 5.29199C31.4869 2.57153 25.8225 0.655494 20.606 0.163081C15.4553 -0.323121 9.492 0.507999 5.08326 4.91674C0.674519 9.32548 -0.156601 15.2888 0.329602 20.4395C0.822012 25.656 2.73805 31.3204 5.45851 36.9705C7.9101 42.0623 11.1786 47.478 15.1342 53C11.1786 58.522 7.9101 63.9377 5.45851 69.0295C2.73805 74.6796 0.822012 80.344 0.329602 85.5605C-0.156601 90.7112 0.674519 96.6745 5.08326 101.083C9.492 105.492 15.4553 106.323 20.606 105.837C25.8225 105.345 31.4869 103.428 37.137 100.708C42.2288 98.2564 47.6445 94.988 53.1665 91.0323C58.6885 94.988 64.1042 98.2564 69.196 100.708C74.8462 103.428 80.5106 105.345 85.727 105.837C90.8777 106.323 96.841 105.492 101.25 101.083ZM53.1665 81.0388C58.0927 77.1877 63.1029 72.7621 68.0158 67.8492C72.9287 62.9363 77.3543 57.9262 81.2053 53C77.3543 48.0738 72.9287 43.0637 68.0158 38.1508C63.1029 33.2379 58.0927 28.8123 53.1665 24.9612C48.2403 28.8123 43.2302 33.2379 38.3173 38.1508C33.4044 43.0637 28.9788 48.0738 25.1277 53C28.9788 57.9262 33.4044 62.9363 38.3173 67.8492C43.2302 72.7621 48.2403 77.1877 53.1665 81.0388ZM59.8486 85.949C64.4852 82.2163 69.135 78.0437 73.6726 73.5061C78.2102 68.9685 82.3828 64.3187 86.1155 59.6821C97.0729 75.6209 101.289 89.7305 95.5929 95.4264C89.897 101.122 75.7874 96.9064 59.8486 85.949ZM20.2175 59.6821C23.9503 64.3187 28.1228 68.9685 32.6604 73.5061C37.198 78.0437 41.8478 82.2163 46.4844 85.949C30.5457 96.9064 16.436 101.122 10.7401 95.4264C5.04422 89.7305 9.26014 75.6209 20.2175 59.6821ZM20.2175 46.3179C23.9503 41.6813 28.1228 37.0315 32.6604 32.4939C37.198 27.9563 41.8478 23.7837 46.4844 20.051C30.5457 9.09362 16.436 4.8777 10.7401 10.5736C5.04422 16.2695 9.26014 30.3792 20.2175 46.3179ZM59.8486 20.051C64.4852 23.7837 69.135 27.9563 73.6726 32.4939C78.2102 37.0315 82.3828 41.6813 86.1155 46.3179C97.0729 30.3791 101.289 16.2695 95.5929 10.5736C89.897 4.87769 75.7874 9.09362 59.8486 20.051Z" fill="#F2F2F1" />
            </svg>
          </a>
          <div className="flex">
            <a
              href="/api/preview"
              target="_blank"
              className="text-current transition duration-300 ease-in-out hover:opacity-60"
              onMouseEnter={() => {
                launchIconRef.current?.play();
              }}
              onMouseLeave={() => {
                launchIconRef.current?.stop();
              }}
            >
              <Lottie
                lottieRef={launchIconRef}
                className="mr-1 w-5 h-5"
                animationData={launchIcon}
                loop={false}
                autoplay={false}
              />
            </a>
          </div>
        </nav>
      </div>
      
      <iframe srcDoc={html} className="w-full bg-white" style={{ height: 'calc(100vh - 60px)' }} />
    </>
  );
}