export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateRole(role: string): boolean {
  return ['user', 'lawyer', 'admin'].includes(role);
}

export function validateExpertise(expertise: string[]): boolean {
  return Array.isArray(expertise) && expertise.length > 0;
}

export function validateLocation(location: string): boolean {
  return location.trim().length >= 2;
}