import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

const API_BASE_URL = 'https://api.challenge.hennge.com/password-validation-challenge-api/001';
// IMPORTANT: Replace 'YOUR_AUTH_TOKEN' with the actual token obtained from the /challenge-details page.
// This token is required for the Authorization header.
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN';

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<string[]>([]);

  const validatePassword = (pwd: string) => {
    const errors: string[] = [];
    if (pwd.includes(' ')) {
      errors.push('Password cannot contain spaces');
    }
    if (!/\d/.test(pwd)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    setPasswordValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setPasswordValidationErrors([]);

    if (!username) {
      setApiError('Username cannot be blank.');
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/challenge-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setUserWasCreated(true);
      } else if (response.status === 401 || response.status === 403) {
        setApiError('You are not authorized to perform this action. Please check your authentication token.');
      } else if (response.status === 500) {
        const errorData = await response.json();
        if (errorData.message === 'Sorry, the entered password is not allowed, please try a different one.') {
          setApiError('Sorry, the entered password is not allowed, please try a different one.');
        } else {
          setApiError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setApiError('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('API call failed:', error);
      setApiError('Failed to connect to the API. Please check your network connection.');
    }
  };

  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit}>
        <label htmlFor="username" style={formLabel}>Username</label>
        <input
          id="username"
          style={formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />

        <label htmlFor="password" style={formLabel}>Password</label>
        <input
          id="password"
          type="password"
          style={formInput}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          aria-label="Password"
        />

        {passwordValidationErrors.length > 0 && (
          <div style={errorContainerStyle}>
            {passwordValidationErrors.map((error, index) => (
              <p key={index} style={errorTextStyle}>{error}</p>
            ))}
          </div>
        )}

        {apiError && <p style={apiErrorTextStyle}>{apiError}</p>}

        <button type="submit" style={formButton}>Create User</button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};

const errorContainerStyle: CSSProperties = {
  marginTop: '8px',
  padding: '8px',
  backgroundColor: '#ffe0e0',
  border: '1px solid #ff0000',
  borderRadius: '4px',
};

const errorTextStyle: CSSProperties = {
  color: '#ff0000',
  fontSize: '12px',
  margin: '0',
};

const apiErrorTextStyle: CSSProperties = {
  color: '#ff0000',
  fontSize: '14px',
  marginTop: '8px',
  textAlign: 'center',
};
