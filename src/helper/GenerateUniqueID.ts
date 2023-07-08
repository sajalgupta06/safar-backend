function generateUniqueId() {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const timestamp = Date.now().toString();
  let uniqueId = '';

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    uniqueId += alphanumericChars[randomIndex];
  }

  uniqueId += timestamp.substr(-7);

  const randomString = generateRandomString(1, alphanumericChars);
  uniqueId += randomString;

  // Counter variable to ensure uniqueness
  let counter = generateCounter();
  uniqueId += counter().toString().padStart(2, '0');

  return uniqueId;
}

function generateRandomString(length:any, charSet:any) {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    randomString += charSet[randomIndex];
  }

  return randomString;
}

function generateCounter() {
  let counter = Math.floor(Math.random() * 100); // Random initial offset
  return function () {
    return counter++ % 100; // Increment and wrap around to 0 after 99
  };
}


export const generateId = ()=>{

  return generateUniqueId()

}
