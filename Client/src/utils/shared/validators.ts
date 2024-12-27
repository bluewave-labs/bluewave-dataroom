export interface ValidationRule {
	rule: (value: string) => boolean;
	message: string;
}

/**
 * Reusable rule for "non-empty" fields.
 * By default, message = "This field is required."
 */
export function requiredFieldRule(message = 'This field is required.'): ValidationRule {
	return {
		rule: (val) => val.trim().length > 0,
		message,
	};
}

/** Basic check for email format. */
export const validEmailRule: ValidationRule = {
	rule: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
	message: 'Please enter a valid email address.',
};

/**
 * Example for min length (e.g., passwords).
 */
export function minLengthRule(
	length: number,
	message = `Must be at least ${length} characters long.`,
): ValidationRule {
	return {
		rule: (val) => val.length >= length,
		message,
	};
}

/**
 * Check for at least one special character (e.g., for password).
 */
export const hasSpecialCharRule: ValidationRule = {
	rule: (val) => /[^A-Za-z0-9]/.test(val),
	message: 'Must contain at least one special character.',
};

/**
 * For displaying "strength" feedback in PasswordValidation.tsx.
 * You can adapt these checks to match your actual password policy.
 */
export function getPasswordChecks(password: string) {
	return {
		isLengthValid: password.length >= 8,
		hasSpecialChar: /[^A-Za-z0-9]/.test(password),
	};
}
