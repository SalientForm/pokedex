import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router';
import DefaultLayout from './layout/default-layout';
import { defaultLayoutConfig } from './config/default-layout.config';
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';


export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <DefaultLayout layoutProps={defaultLayoutConfig}>
      <motion.div
        key={'location.pathname'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={'w-100'}
      >
        <Outlet />
      </motion.div>
    </DefaultLayout>
  );
}

export default Root;
