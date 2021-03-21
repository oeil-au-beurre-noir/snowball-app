const snobPoolId = 2

export function poolDisplay(fromPage, pool) {

  let result = false;
  if(fromPage === 'icequeen'){
    result = pool.lockForSnob;
  }

  if(fromPage === 'snowglobes'){
    result = pool.isSnowglobe;
  }
  return result;

}

export function lpDisplay(fromPage, pool) {

  let result = false;
  if(fromPage === 'icequeen'){
    if(pool.poolId === snobPoolId){
      result = true;
    } else {
      result = false
    }
  }

  if(fromPage === 'snowglobes'){
    return true
  }
  return result;

}
export function spglDisplay(fromPage, pool) {

    let result = true
    if(pool.poolId === snobPoolId){
      result = false;
    } else {
      result = true
    }
    return result;

}

export function stakeActionDisplay(fromPage, pool, sharesBalance,spglDeposited) {

  let result = false
  if(fromPage ==='icequeen') {
      if(sharesBalance > 0 || spglDeposited > 0 ) {
        result = true;
      }
    if(pool.poolId === snobPoolId){
      result =  false;
    }
    return result
  }


}
