export const patterns = {
  emailPattern: /^[_A-Za-z0-9]+(\.[_A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/,
  phonePattern: /^(5(\d{9}))$/,
  phoneAllPattern: /^(\d{7,10})$/,
  emailOrPhonePattern: /^([_aA-zZ0-9]+(\.[_aA-zZ0-9]+)*@[aA-zZ0-9-]+(\.[aA-zZ0-9-]+)*(\.[a-z]{2,4}))|((5(\d{9})))$/,
  passwordPattern: /^.{6,}$/
}