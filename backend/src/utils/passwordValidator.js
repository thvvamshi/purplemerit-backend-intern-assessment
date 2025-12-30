module.exports = function isStrongPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&      // uppercase
    /[a-z]/.test(password) &&      // lowercase
    /[0-9]/.test(password) &&      // number
    /[^A-Za-z0-9]/.test(password)  // special char
  );
};
