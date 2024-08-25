"use client";

import React from 'react';
import { Link } from '@nextui-org/link';
import { Spacer } from '@nextui-org/spacer';

const Footer: React.FC = () => {
  return (
      <footer className="bg-gradient-to-br from-blue-600 via-black to-violet-800 text-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                We connect you with expert guides for your IT projects. Our platform ensures you find the best mentors to help you achieve your goals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="primary">Home</Link></li>
                <li><Link href="/about" color="primary">About</Link></li>
                <li><Link href="#" color="primary">Services</Link></li>
                <li><Link href="/contactus" color="primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm">Email: info@guiderwebsite.com</li>
                <li className="text-sm">Phone: +123 456 7890</li>
                <li className="text-sm">Address: 1234 Street, City, Country</li>
              </ul>
            </div>
          </div>
          <Spacer y={4} />
          <div className="mt-12 border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-sm">&copy; 2024 GuiderWebsite. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .734.591 1.325 1.325 1.325h11.495v-9.284h-3.125v-3.622h3.125v-2.671c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.761v2.315h3.588l-.467 3.622h-3.121v9.284h6.116c.734 0 1.325-.591 1.325-1.325v-21.35c0-.734-.591-1.325-1.325-1.325z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.56-2.005.968-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.718 0-4.924 2.206-4.924 4.924 0 .39.044.765.127 1.125-4.092-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.574-.666 2.476 0 1.709.869 3.215 2.188 4.099-.806-.026-1.566-.247-2.229-.617v.061c0 2.386 1.697 4.374 3.95 4.828-.413.112-.849.171-1.296.171-.316 0-.623-.03-.924-.086.624 1.949 2.438 3.368 4.584 3.407-1.68 1.318-3.808 2.105-6.114 2.105-.398 0-.79-.023-1.177-.069 2.179 1.398 4.768 2.214 7.557 2.214 9.054 0 14.01-7.504 14.01-14.01 0-.213-.004-.426-.013-.637.961-.695 1.794-1.56 2.453-2.548z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.99 3h-15.98c-1.11 0-2.01.9-2.01 2.01v15.98c0 1.11.9 2.01 2.01 2.01h15.98c1.11 0 2.01-.9 2.01-2.01v-15.98c0-1.11-.9-2.01-2.01-2.01zm-11.24 16.25h-3.06v-8.56h3.06v8.56zm-1.53-9.83c-1.04 0-1.88-.84-1.88-1.88 0-1.04.84-1.88 1.88-1.88s1.88.84 1.88 1.88c0 1.04-.84 1.88-1.88 1.88zm12.75 9.83h-3.06v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-3.06v-8.56h2.94v1.17h.04c.41-.77 1.42-1.57 2.92-1.57 3.12 0 3.7 2.05 3.7 4.71v5.25z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
