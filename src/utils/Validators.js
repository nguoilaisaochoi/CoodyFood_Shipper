export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const validatePass = (password) => {
    return password.length > 5
}

export const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9,}$/
    return phoneRegex.test(phone)
}

//chuyển số sang dạng tiền
export const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };