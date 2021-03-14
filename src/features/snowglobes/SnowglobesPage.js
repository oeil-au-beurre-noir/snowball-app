import React from 'react';

import Pools from 'features/vault/components/Pools/Pools';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function SnowglobesPage() {
  return (
    <>
      <Disclaimer />
      <div>SNOWGLOBES</div>
      <div>A quick description of what snowglobes are</div>
      <Pools fromPage="snowglobes"/>
    </>
  );
}
