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
    if(pool.poolId === 2){
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
    if(pool.poolId === 2){
      result = false;
    } else {
      result = true
    }
    return result;

}