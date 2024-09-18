function longestMatch(str1, str2) {
  let arr1 = str1.toLowerCase().split("");
  let arr2 = str2.toLowerCase().split("");
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      count += 1;
    } else {
      break;
    }
  }

  return count;
}

export default longestMatch;
