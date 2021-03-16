export const pools = [
  {
    id: 'auto-snob-avax',
    logo: 'avax-pairs/SNOB-AVAX.svg',
    name: 'SNOB-AVAX LP',
    token: 'SNOB-AVAX LP',
    tokenDescription: 'Uses: Pangolin',
    tokenAddress: '0xc38f41a296a4493ff429f1238e030924a1542e50',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'sPGLSNOB-AVAX',
    earnedTokenAddress: '0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375',
    earnContractAddress: '0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'auto-snob-avax',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Autofarm',
    assets: ['SNOB', 'AVAX'],
    callFee: 0.5,
    lockForSnob: true,
    lockRate: 0.5
  },
    {
    id: 'auto-png-avax',
    logo: 'avax-pairs/PNG-AVAX.svg',
    name: 'PNG-AVAX Snowglobe',
    token: 'PNG-AVAX LP',
    tokenDescription: 'Uses: Pangolin (Auto)',
    tokenAddress: '0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'sPGLPNG-AVAX',
    earnedTokenAddress: '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815',
    earnContractAddress: '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'auto-png-avax',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Autofarm',
    assets: ['PNG', 'AVAX'],
    callFee: 0.5,
      lockForSnob: true,
      lockRate: 0.25

  },
  {
    id: 'auto-eth-avax',
    logo: 'avax-pairs/ETH-AVAX.svg',
    name: 'ETH-AVAX Snowglobe',
    token: 'ETH-AVAX LP',
    tokenDescription: 'Uses: Pangolin (Auto)',
    tokenAddress: '0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'sPGLETH-AVAX',
    earnedTokenAddress: '0x586554828eE99811A8ef75029351179949762c26',
    earnContractAddress: '0x586554828eE99811A8ef75029351179949762c26',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'auto-eth-avax',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Autofarm',
    assets: ['ETH', 'AVAX'],
    callFee: 0.5,
    lockForSnob: true,
    lockRate: 0.125
  },

  {
    id: 'auto-sushi-avax',
    logo: 'avax-pairs/SUSHI-AVAX.svg',
    name: 'SUSHI-AVAX Snowglobe',
    token: 'SUSHI-AVAX LP',
    tokenDescription: 'Uses: Pangolin (Auto)',
    tokenAddress: '0xd8B262C0676E13100B33590F10564b46eeF652AD',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'sPGLSUSHI-AVAX',
    earnedTokenAddress: '0x751089f1bf31b13fa0f0537ae78108088a2253bf',
    earnContractAddress: '0x751089f1bf31b13fa0f0537ae78108088a2253bf',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'auto-sushi-avax',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Autofarm',
    assets: ['SUSHI', 'AVAX'],
    callFee: 0.5,
    lockForSnob: true,
    lockRate: 0.125
  },
  {
    id: 'auto-link-avax',
    logo: 'avax-pairs/LINK-AVAX.svg',
    name: 'LINK-AVAX Snowglobe',
    token: 'LINK-AVAX LP',
    tokenDescription: 'Uses: Pangolin (Auto)',
    tokenAddress: '0xbbc7fff833d27264aac8806389e02f717a5506c9',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'sPGLLINK-AVAX',
    earnedTokenAddress: '0x00933c16e06b1d15958317C2793BC54394Ae356C',
    earnContractAddress: '0x00933c16e06b1d15958317C2793BC54394Ae356C',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'auto-link-avax',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Autofarm',
    assets: ['LINK', 'AVAX'],
    callFee: 0.5,
    lockForSnob: false,
    lockRate: 0
  }
  /* keep a few in comment for the example
  {
    id: 'bifi-maxi',
    logo: 'single-assets/BIFI.link',
    name: 'BIFI Maxi',
    token: 'BIFI',
    tokenDescription: 'Uses: Beefy.Finance',
    tokenAddress: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    tokenDecimals: 18,
    tokenDescriptionUrl: 'https://docs.beefy.finance/beefyfinance/products/bifi-maxi',
    earnedToken: 'mooBIFI',
    earnedTokenAddress: '0xf7069e41C57EcC5F122093811d8c75bdB5f7c14e',
    earnContractAddress: '0xf7069e41C57EcC5F122093811d8c75bdB5f7c14e',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'pancake',
    oracleId: 'BIFI',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Beefy',
    assets: ['BIFI'],
    callFee: 0.5,
  },
  {
    id: 'auto-wbnb-old',
    logo: 'single-assets/WBNB.svg',
    name: 'WBNB',
    token: 'WBNB',
    tokenDescription: 'Uses: Venus (Auto)',
    tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'mooAutoWbnb',
    earnedTokenAddress: '0x8136C5EE816fD80b80C9679e785F37EBdf2199eE',
    earnContractAddress: '0x8136C5EE816fD80b80C9679e785F37EBdf2199eE',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'pancake',
    oracleId: 'WBNB',
    oraclePrice: 0,
    depositsPaused: true,
    status: 'eol',
    platform: 'Autofarm',
    assets: ['BNB'],
    callFee: 0.5,
  },
  */
 ];