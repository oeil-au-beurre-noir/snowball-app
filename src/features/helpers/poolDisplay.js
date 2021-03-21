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